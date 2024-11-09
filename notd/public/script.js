// Constants
const VOTING_CONTRACT_ADDRESS = '0x76a8b007053434D093C0cA7c8838388A04263DC1';
const CHECK_OWNERSHIP_API_URL = 'https://aivt58pxg2.execute-api.us-east-1.amazonaws.com/Beta/check-ownership';
const HEADLINES_API_URL = 'https://03qdlz7wbk.execute-api.us-east-1.amazonaws.com/Beta/headlineDetails';
const VOTE_API_URL = 'https://46p9tfyiyg.execute-api.us-east-1.amazonaws.com/Beta/vote';

// DOM Elements
const votingContainer = document.getElementById('voting-container');
const noNftMessage = document.getElementById('no-nft-message');
const voteConfirmation = document.getElementById('vote-confirmation');
const viewWinningHeadlineBtn = document.getElementById('view-winning-headline');
const winningHeadlineContainer = document.getElementById('winning-headline-container');
const winningHeadlineElement = document.getElementById('winning-headline');
const voteCountElement = document.getElementById('vote-count');

// Global Variables
let votingContract;
let headlineLinksMapping = {};

// Function to initialize the application
async function init() {
  console.log("Initializing the application...");

  console.log("Fetching headlines...");
  const headlines = await fetchHeadlines();
  if (headlines) {
    console.log("Headlines fetched successfully");
    populateHeadlinesList(headlines);
  } else {
    console.error('Failed to fetch headlines');
  }

  if (typeof window.ethereum !== 'undefined') {
    console.log("Web3 wallet detected");
    try {
      await checkNFTOwnership();
    } catch (error) {
      console.error('Error during NFT ownership check:', error);
      displayError('An error occurred. Please ensure your web3 wallet is enabled and connected to the Sepolia network.');
      disableViewWinningHeadlineBtn("An error occurred. Please ensure your web3 wallet is enabled and connected to the Sepolia network.");
    }
  } else {
    console.log("Web3 wallet not detected");
    updateUI(false);
    displayError('Please install and connect a compatible web3 wallet to vote.');
    disableViewWinningHeadlineBtn("Please install and connect a compatible web3 wallet to vote.");
  }
}

// Function to check user's NFT ownership
async function checkNFTOwnership() {
  console.log("Checking NFT ownership...");
  try {
    console.log("Requesting account access...");
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const web3 = new Web3(window.ethereum);
    const userAddress = await getUserAddress();

    console.log("User address:", userAddress);

    const message = `Welcome! This request will not trigger a blockchain transaction or cost any gas fees. Please sign the following message ::
                     I confirm that I am the owner of the wallet address: ${userAddress}`;

    console.log("Requesting user signature...");
    const signature = await web3.eth.personal.sign(message, userAddress);

    console.log("Signature obtained:", signature);

    console.log("Making API call to check NFT ownership...");
    const response = await fetch(CHECK_OWNERSHIP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ walletAddress: userAddress, message: message, signature: signature })
    });

    const data = await response.json();
    const hasDNFT = JSON.parse(data.body).hasDNFT;

    console.log("User has NOTD NFT:", hasDNFT);

    if (hasDNFT) {
      console.log("User has a NOTD NFT, enabling voting");
      updateUI(true);
      await setupVotingContract();
      await handleVotingScenarios(web3, userAddress);
    } else {
      console.log("User does not have a NOTD NFT, disabling voting");
      updateUI(false);
      disableViewWinningHeadlineBtn("You need to own a NOTD NFT to view the winning headline");
    }
  } catch (error) {
    console.error('Error during NFT ownership check:', error);
    displayError('An error occurred. Please ensure your web3 wallet is enabled and connected to the Sepolia network.');
    disableViewWinningHeadlineBtn("An error occurred. Please ensure your web3 wallet is enabled and connected to the Sepolia network.");
  }
}

// Function to setup the voting contract
async function setupVotingContract() {
  console.log("Setting up the voting contract...");
  const votingContractABI = await fetchVotingContractABI();
  console.log("Loaded voting contract ABI");

  const web3 = new Web3(window.ethereum);
  votingContract = new web3.eth.Contract(votingContractABI, VOTING_CONTRACT_ADDRESS);
  console.log("Voting contract instance created");
}

// Function to handle different voting scenarios
async function handleVotingScenarios(web3, userAddress) {
  console.log("Handling voting scenarios...");
  const currentDate = getCurrentDate();
  const dateUint = convertDateToUint(currentDate);

  console.log("Checking if user has already voted...");
  const hasVoted = await votingContract.methods.hasVoted(dateUint, userAddress).call();
  console.log("User has voted:", hasVoted);

  if (hasVoted) {
    console.log("User has already voted for today");
    disableVoting();
    enableViewWinningHeadlineBtn("You have already voted for today");
    showAlreadyVotedMessage();
  } else {
    console.log("User has not voted for today");
    attachVoteClickListeners();
    disableViewWinningHeadlineBtn("You need to vote first to view the winning headline");
  }
}

// Function to fetch headlines from the API backend
async function fetchHeadlines() {
  const currentDate = getCurrentDate();
  console.log("Current date:", currentDate);

  try {
    console.log("Fetching headlines from API...");
    const response = await fetch(`${HEADLINES_API_URL}?date=${currentDate}`);
    console.log("Response from fetchHeadlines API:", response);

    if (response.ok) {
      console.log("OK response");
      const data = await response.json();
      console.log("Data:", data);

      const parsedBody = JSON.parse(data.body);
      console.log("Parsed body:", parsedBody);
      console.log("Headlines:", parsedBody.Headlines);

      headlineLinksMapping = parsedBody.Headlines;
      console.log("Headline links mapping:", headlineLinksMapping);

      return parsedBody.Headlines;
    } else {
      throw new Error('Server error');
    }
  } catch (error) {
    console.error('Error fetching headlines:', error);
    displayError('Server error. The development team is working on it. Please try again later.');
    return null;
  }
}

// Function to populate the headlines list
function populateHeadlinesList(headlines, isAuthorized = false) {
  console.log("Populating headlines list...");
  const headlinesList = document.getElementById('headlines-list');
  headlinesList.innerHTML = '';

  if (headlines) {
    for (const headline in headlines) {
      const headlineItem = document.createElement('li');
      headlineItem.className = 'headline-item';
      if (!isAuthorized) {
        headlineItem.classList.add('disabled');
        headlineItem.setAttribute('title', 'Voting is disabled');
      } else {
        headlineItem.setAttribute('data-headline', headline);
        headlineItem.setAttribute('data-index', headlines[headline].index);
        headlineItem.addEventListener('click', handleVoteClick);
      }
      headlineItem.textContent = headline;
      headlinesList.appendChild(headlineItem);
    }
  } else {
    const noHeadlinesMessage = document.createElement('li');
    noHeadlinesMessage.textContent = 'No headlines available for today.';
    headlinesList.appendChild(noHeadlinesMessage);
  }
}

// Function to handle vote click event
async function handleVoteClick() {
  console.log("Vote button clicked");
  console.log("showing processing message");
  showProcessingMessage();
  console.log("this :: ", this);
  if (!votingContainer.classList.contains('unauthorized')) {
    const selectedHeadline = this.getAttribute('data-headline');
    console.log("Voting for headline:", selectedHeadline);

    const headlineIndex = parseInt(this.getAttribute('data-index'));
    console.log("Headline index:", headlineIndex);

    const currentDate = getCurrentDate();
    const dateUint = convertDateToUint(currentDate);

    const userAddress = await getUserAddress();

    const txObject = {
      from: userAddress,
      to: VOTING_CONTRACT_ADDRESS,
      data: votingContract.methods.vote(dateUint, headlineIndex).encodeABI(),
    };

    console.log("Sending voting transaction...");
    const tx = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txObject],
    });

    console.log('Vote casted successfully');
    console.log('Transaction Hash:', tx);

    disableVoting();
    showProcessingMessage();

    setTimeout(async function() {
      await processVote(tx, currentDate, selectedHeadline);
    }, 30000); // 30 second wait.
  }
}

// Function to process the vote
async function processVote(tx, currentDate, selectedHeadline) {
  console.log("Processing vote...");
  try {
    console.log("Calling API to cast vote");
    const response = await fetch(VOTE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transactionHash: tx,
        date: currentDate,
      }),
    });

    const data = await response.json();
    console.log("API response data:", data);

    const statusCode = data.statusCode;
    console.log("Status code:", statusCode);
    const responseBody = JSON.parse(data.body);
    console.log("Response body:", responseBody);

    switch (statusCode) {
      case 200:
        console.log("No error present");
        hideProcessingMessage();
        showSuccessMessage(selectedHeadline);
        enableViewWinningHeadlineBtn("User has successfully voted");
        break;
      case 400:
      case 500:
      default:
        hideProcessingMessage();
        console.log("Error received from the API:", responseBody.error);
        displayError(responseBody.error + ' ' + responseBody.etherscanUrl);
        break;
    }
  } catch (error) {
    hideProcessingMessage();
    console.error('Error calling backend API:', error);
    displayError('Voting failed. Please try again.');
  }
}

// Function to fetch the voting contract ABI
async function fetchVotingContractABI() {
  console.log("Fetching voting contract ABI...");
  const response = await fetch('votingContractABI.json');
  return await response.json();
}

// Function to get the user's wallet address
async function getUserAddress() {
  console.log("Getting user's wallet address...");
  const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  return accounts[0];
}

// Function to get the current date
function getCurrentDate() {
  return new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Los_Angeles'
  }).split('/').join('/');
}

// Function to convert date to uint256
function convertDateToUint(dateString) {
  const [day, month, year] = dateString.split('/');
  const dateUint = (parseInt(year) * 10000) + (parseInt(month) * 100) + parseInt(day);
  return dateUint;
}

// Function to update the UI based on authorization status
function updateUI(isAuthorized) {
  console.log("Updating UI, authorized:", isAuthorized);
  if (isAuthorized) {
    votingContainer.classList.remove('unauthorized');
    noNftMessage.style.display = 'none';
    populateHeadlinesList(headlineLinksMapping, true);
  } else {
    votingContainer.classList.add('unauthorized');
    noNftMessage.style.display = 'block';
    populateHeadlinesList(headlineLinksMapping, false); // Pass false to disable voting
  }
}

// Function to display an error message
function displayError(message) {
  console.log("Displaying error message:", message);
  const errorElement = document.getElementById('error-message');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
   // Remove the "no-nft-message" element
   const noNftMessage = document.getElementById('no-nft-message');
   noNftMessage.style.display = 'none';
}

// Function to disable voting
function disableVoting() {
  console.log("Disabling voting");
  const headlineItems = document.querySelectorAll('.headline-item');
  headlineItems.forEach(function(item) {
    item.removeEventListener('click', handleVoteClick);
    item.classList.add('disabled');
    item.setAttribute('title', 'You have already voted for today');
  });
}

// Function to show the processing message
function showProcessingMessage() {
  console.log("Showing processing message");
  const processingMessage = document.getElementById('processing-message');
  processingMessage.style.display = 'block';
}

// Function to hide the processing message
function hideProcessingMessage() {
  const processingMessage = document.getElementById('processing-message');
  processingMessage.style.display = 'none';
}

// Function to show the success message
function showSuccessMessage(selectedHeadline) {
  console.log("Showing success message");
  const successMessage = document.getElementById('success-message');
  successMessage.textContent = 'Voting successful, NFT mint will happen tomorrow at 6AM';
  successMessage.style.display = 'block';
  
  // Hide the "already-voted-message"
  document.getElementById('already-voted-message').style.display = 'none';
}

// Function to disable the "View Winning Headline" button and set the hover message
function disableViewWinningHeadlineBtn(message) {
  console.log("Disabling 'View Winning Headline' button with message:", message);
  viewWinningHeadlineBtn.disabled = true;
  viewWinningHeadlineBtn.classList.add('disabled');
  viewWinningHeadlineBtn.setAttribute('title', message);
}

// Function to enable the "View Winning Headline" button based on voting scenarios
function enableViewWinningHeadlineBtn(votingScenario) {
  console.log("Enabling 'View Winning Headline' button for scenario:", votingScenario);
  viewWinningHeadlineBtn.disabled = false;
  viewWinningHeadlineBtn.classList.remove('disabled');
  viewWinningHeadlineBtn.setAttribute('title', votingScenario);

  // Attach click event listener to the "View Winning Headline" button
  viewWinningHeadlineBtn.addEventListener('click', handleViewWinningHeadlineClick);
}

// Function to show the "already voted" message
function showAlreadyVotedMessage() {
  console.log("Showing 'already voted' message");
  document.getElementById('already-voted-message').style.display = 'block';
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to attach vote click listeners
async function attachVoteClickListeners() {
  console.log("Attaching vote click listeners");

  await delay(1000);

  const headlineItems = document.querySelectorAll('.headline-item');
  console.log("Headline items found:", headlineItems.length);
  headlineItems.forEach(function(item) {
    // console.log("Attaching click listener to headline item", index);
    item.addEventListener('click', handleVoteClick);
  });
}

// Function to handle the "View Winning Headline" button click
async function handleViewWinningHeadlineClick() {
  console.log("'View Winning Headline' button clicked");

  try {
    console.log("Fetching winning headline...");
    const currentDate = getCurrentDate();
    const dateUint = convertDateToUint(currentDate);

    const winningHeadline = await votingContract.methods.getWinningHeadline(dateUint).call();
    console.log("Winning headline:", winningHeadline);

    const winningHeadlineIndex = await votingContract.methods.winningHeadlines(dateUint).call();
    console.log("Winning headline index:", winningHeadlineIndex);

    const voteCount = await votingContract.methods.getVoteCount(dateUint, winningHeadlineIndex).call();
    console.log("Vote count:", voteCount);

    displayWinningHeadline(winningHeadline, voteCount);
  } catch (error) {
    console.error("Error fetching winning headline:", error);
    displayError("Failed to retrieve the winning headline. Please try again.");
  }
}

// Function to display the winning headline
function displayWinningHeadline(headline, voteCount) {
  console.log("Displaying winning headline");
  winningHeadlineElement.textContent = headline;
  voteCountElement.textContent = voteCount;
  winningHeadlineContainer.style.display = 'block';

  const winningHeadlineLinks = headlineLinksMapping[headline].links;
  console.log("Winning headline links:", winningHeadlineLinks);

  //const winningHeadlinesList = document.getElementById('headline-links-list');
  //winningHeadlinesList.innerHTML = '';

//   winningHeadlineLinks.forEach(link => {
//     const listItem = document.createElement('li');
//     const anchor = document.createElement('a');
//     anchor.href = link;
//     anchor.target = '_blank';
//     anchor.textContent = link;
//     listItem.appendChild(anchor);
//   winningHeadlinesList.appendChild(listItem);
// });
}

    // Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);