
const HEADLINES_API_URL = 'https://03qdlz7wbk.execute-api.us-east-1.amazonaws.com/Beta/headlineDetails';
const { DateTime } = luxon;


$(document).ready(function () {
  console.log("Document loaded");
  fetchAndDisplayTodayNFT();
  startAuctionCountdown();

  // Event listener for the "View NFT" button
  $('#view-nft-btn').on('click', function () {
    const selectedDate = $('#date-picker').val();
    console.log("SELECTED DTAE i.e PRESSED DATE == ", selectedDate);
    if (selectedDate) {
      fetchAndDisplayNFTByDate(selectedDate);
    }
  });
});


// Function to get yesterday's date in the format required by the headlines API
function getYesterdayDateInHeadlinesAPIFormat() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return yesterday.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Los_Angeles'
  }).split('/').join('/');
}

function formatDateForHeadlinesAPI(date) {
  /*const yesterday = new Date(date.getTime() - (24 * 60 * 60 * 1000));

  // Format the new date
  return yesterday.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).split('/').join('/');*/
  const dateF = DateTime.fromISO(date);

  const prevDay = dateF.minus({ days: 1 });
  console.log("DATTT: " + prevDay);
  const formattedPrevDay = prevDay.toFormat("dd/MM/yyyy");
  console.log("DATTTEE: " + formattedPrevDay);
  return formattedPrevDay;
}

async function fetchAndDisplayTodayNFT() {
  $('.newspaper-container').hide();
  $('.auction-container').hide();

  const today = DateTime.now();
  console.log("Today's date:", today.toISODate());

  // Get today's date in PST time zone
  const todayInPST = DateTime.now().setZone('America/Los_Angeles');
  console.log("Today in PST:", todayInPST.toISODate());

  console.log("Displaying dummy NFT details for today's date");
  
  displayDummyNFTDetails();
  
  // Set the date in the newspaper
  const nftDate = document.getElementById("nft-date");
  nftDate.textContent = formatDateForDisplay(today);

  // Show the auction container for today's date
  // Pass the date as a JavaScript Date object
  updateAuctionWindow(today.toJSDate());
}


// Function to fetch and display today's NFT
// async function fetchAndDisplayTodayNFT() {
//   $('.newspaper-container').hide();
//   $('.auction-container').hide();

//   /*
// const today = new Date().toLocaleString("en-US", {
//     timeZone: "America/Los_Angeles"
//   });*/
//   // const today = new Date();
//   const today = DateTime.now();
//   console.log("Today's date:", today.toISODate()); // Output: Today's date: 2023-06-16
  
//   // Get today's date in a specific time zone
//   const todayInPST = DateTime.now().setZone('America/Los_Angeles');
// console.log("today == ", today);

//   const formattedDate = formatDate(todayInPST);
//   const dateForHeadlinesAPIFormat = getYesterdayDateInHeadlinesAPIFormat();

//   console.log("Fetching NFT details for date:", formattedDate);

//   try {
//     console.log("Fetching headlines from API...");
//     const response = await fetch(`${HEADLINES_API_URL}?date=${dateForHeadlinesAPIFormat}`);
//     console.log("Response from fetchHeadlines API:", response);

//     if (response.ok) {
//       console.log("OK response");
//       const data = await response.json();
//       console.log("Data:", data);

//       const parsedBody = JSON.parse(data.body);
//       console.log("Parsed body:", parsedBody);
//       console.log("Headlines:", parsedBody.Headlines);

//       const headlines = parsedBody.Headlines;
//       console.log("Headline links mapping:", headlines);

//       const apiUrl = `https://zjt57rz12l.execute-api.us-east-1.amazonaws.com/Beta/nfts?date=${formattedDate}`;
//       console.log("Fetching NFT details from API:", apiUrl);

//       const nftResponse = await fetch(apiUrl);
//       console.log("Response from NFT API:", nftResponse);

//       if (nftResponse.ok) {
//         console.log("OK response from NFT API");
//         const nftData = await nftResponse.json();
//         console.log("NFT data:", nftData);

//         if (nftData.body && !nftData.body.error) {
//           console.log("NFT details fetched successfully");
//           const parsedNFTData = JSON.parse(nftData.body);
//           console.log("Parsed NFT data:", parsedNFTData);

//           const winningHeadline = parsedNFTData[0].headline;
//           console.log("Winning headline:", winningHeadline);

//           const winningHeadlineData = headlines[winningHeadline];
//           console.log("Winning headline data:", winningHeadlineData);

//           if (winningHeadlineData) {
//             const summary = winningHeadlineData.summary;
//             const links = winningHeadlineData.links;

//             console.log("Summary:", summary);
//             console.log("Links:", links);

//             displayNFTDetails(winningHeadline, summary, links, today);
//             $('.auction-container').show();
//           } else {
//             console.log("No data found for the winning headline");
//             displayNoNFTDetails();
//           }
//         } else {
//           console.log("No NFT data returned from the API or an error occurred");
//           displayNoNFTDetails();
//         }
//       } else {
//         console.log("Error response from NFT API");
//         displayNoNFTDetails();
//       }
//     } else {
//       console.log("Error response from fetchHeadlines API");
//       displayNoNFTDetails();
//     }
//   } catch (error) {
//     console.error("Error fetching NFT details:", error);
//     displayNoNFTDetails();
//   }
// }

// Function to display NFT details
function displayNFTDetails(headline, summary, links, date) {
  const nftHeadline = document.getElementById("nft-headline");
  const nftSummary = document.getElementById("nft-summary");
  const nftLinks = document.getElementById("nft-links");
  const nftDate = document.getElementById("nft-date");


  nftHeadline.textContent = headline;
  nftDate.textContent = formatDateForDisplay(date);


  if (summary) {
    nftSummary.textContent = summary;
  } else {
    nftSummary.textContent = "";
  }

  const formattedLinks = links.map((link) => {
    const siteName = extractSiteName(link);
    return `<a href="${link}" target="_blank">${siteName} Article</a>`;
  });
  nftLinks.innerHTML = formattedLinks.join("<br>");
  $('.newspaper-container').show();
}

function formatDateForDisplay(dateString) {
  //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  //return new Date(dateString).toLocaleDateString('en-US', options);
  // Convert the date to the desired format
  const date = DateTime.fromISO(dateString);

const formattedDate = date.toFormat("cccc, LLLL d, yyyy");
console.log(formattedDate);
return formattedDate;
}

// Function to display dummy NFT details
function displayDummyNFTDetails() {
  console.log("Displaying dummy NFT details");
  const dummyHeadline = "Ethereum ETF approved by SEC";
  const dummySummary = "The U.S. Securities and Exchange Commission (SEC) on Thursday approved applications from Nasdaq, CBOE and NYSE to list exchange-traded funds (ETFs) tied to the price of ether, potentially paving the way for the products to begin trading later this year.";

  const dummyLinks = [
    { name: "Reuters", url: "https://www.reuters.com/technology/us-sec-approves-exchange-applications-list-spot-ether-etfs-2024-05-23/" },
    { name: "CNBC", url: "https://www.cnbc.com/2024/05/23/sec-approves-rule-change-to-allow-creation-of-ether-etfs.html" },
    { name: "CoinDesk", url: "https://www.coindesk.com/markets/2024/05/23/ethereum-etf-approval-could-spur-60-rally-as-eth-buying-increases/" }
  ];

  const nftHeadline = document.getElementById("nft-headline");
  const nftSummary = document.getElementById("nft-summary");
  const nftLinks = document.getElementById("nft-links");

  nftHeadline.textContent = dummyHeadline;
  nftSummary.textContent = dummySummary;
  nftLinks.innerHTML = dummyLinks
    .map((link) => `<a href="${link.url}" target="_blank">${link.name} Article</a>`)
    .join("<br>");

  $('.newspaper-container').show();
}

function formatDate(dateString) {

  //const timestamp = Date.parse(dateString);
  //const date = new Date(timestamp);  
  const date = DateTime.fromISO(dateString);

  const year = date.year;
  const month = String(date.month).padStart(2, '0');
  const day = String(date.day).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to display "NO NFT MINTED" message
function displayNoNFTDetails() {
  $('.newspaper-container').hide();
  $('.auction-container').hide();
  $('.no-nft-message').show();
}

// Function to extract site name from URL
function extractSiteName(url) {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?([^\/]+)/i);
  return match ? match[1].toUpperCase() : "";
}

// Function to start the auction countdown
function startAuctionCountdown() {
  const auctionEndTime = new Date();
  auctionEndTime.setHours(23, 59, 59, 0); // Set auction end time to 11:59:59 PM

  const countdownElement = document.getElementById("auction-countdown");

  function updateCountdown() {
    const currentTime = new Date();
    const timeDifference = auctionEndTime - currentTime;

    if (timeDifference > 0) {
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdownElement.textContent = `Auction ends in ${hours}h ${minutes}m ${seconds}s`;
    } else {
      countdownElement.textContent = "Auction has ended";
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// TODO: Due to issue with the sepolia ETH balance, minting blocked, so falling back to default view for now.
async function fetchAndDisplayNFTByDate(selectedDate) {
  $('.newspaper-container').hide();
  $('.auction-container').hide();

  console.log("Displaying dummy NFT details for date:", selectedDate);
  
  displayDummyNFTDetails();
  updateAuctionWindow(selectedDate);

}


// // Function to fetch and display NFT by selected date
// async function fetchAndDisplayNFTByDate(selectedDate) {
//   $('.newspaper-container').hide();
//   $('.auction-container').hide();

//   const formattedDate = formatDate(selectedDate);
//   const dateForHeadlinesAPIFormat = formatDateForHeadlinesAPI(selectedDate);

//   console.log("Fetching NFT details for date:", formattedDate);
//   console.log("Date for headlines API format:", dateForHeadlinesAPIFormat);

//   try {
//     console.log("Fetching headlines from API...");
//     const response = await fetch(`${HEADLINES_API_URL}?date=${dateForHeadlinesAPIFormat}`);
//     console.log("Response from fetchHeadlines API:", response);

//     if (response.ok) {
//       console.log("OK response");
//       const data = await response.json();
//       console.log("Data:", data);

//       const parsedBody = JSON.parse(data.body);
//       console.log("Parsed body:", parsedBody);
//       console.log("Headlines:", parsedBody.Headlines);

//       const headlines = parsedBody.Headlines;
//       console.log("Headline links mapping:", headlines);

//       const apiUrl = `https://zjt57rz12l.execute-api.us-east-1.amazonaws.com/Beta/nfts?date=${formattedDate}`;
//       console.log("Fetching NFT details from API:", apiUrl);

//       const nftResponse = await fetch(apiUrl);
//       console.log("Response from NFT API:", nftResponse);

//       if (nftResponse.ok) {
//         console.log("OK response from NFT API");
//         const nftData = await nftResponse.json();
//         console.log("NFT data:", nftData);

//         if (nftData.body && !nftData.body.error) {
//           console.log("NFT details fetched successfully");
//           const parsedNFTData = JSON.parse(nftData.body);
//           console.log("Parsed NFT data:", parsedNFTData);

//           const winningHeadline = parsedNFTData[0].headline;
//           console.log("Winning headline:", winningHeadline);

//           const winningHeadlineData = headlines[winningHeadline];
//           console.log("Winning headline data:", winningHeadlineData);

//           if (winningHeadlineData) {
//             const summary = winningHeadlineData.summary;
//             const links = winningHeadlineData.links;

//             console.log("Summary:", summary);
//             console.log("Links:", links);
//             console.log("Dateeeee: " , selectedDate);

//             displayNFTDetails(winningHeadline, summary, links, selectedDate);
//             updateAuctionWindow(selectedDate);
//           } else {
//             console.log("No data found for the winning headline");
//             displayNoNFTDetails();
//           }
//         } else {
//           console.log("No NFT data returned from the API or an error occurred");
//           displayNoNFTDetails();
//         }
//       } else {
//         console.log("Error response from NFT API");
//         displayNoNFTDetails();
//       }
//     } else {
//       console.log("Error response from fetchHeadlines API");
//       displayNoNFTDetails();
//     }
//   } catch (error) {
//     console.error("Error fetching NFT details:", error);
//     displayNoNFTDetails();
//   }
// }

function updateAuctionWindow(selectedDate) {
  console.log("Updating auction window for date:", selectedDate);

  const today = new Date();
  console.log("Current date:", today);

  const selectedDateObj = new Date(selectedDate);
  console.log("Selected date object:", selectedDateObj);

  // Set both dates to midnight for accurate comparison
  today.setHours(0, 0, 0, 0);
  selectedDateObj.setHours(0, 0, 0, 0);

  console.log("Adjusted current date:", today);
  console.log("Adjusted selected date:", selectedDateObj);

  console.log("Is selected date before today?", selectedDateObj < today);

  if (selectedDateObj < today) {
    console.log("Selected date is in the past, showing auction results");
    document.getElementById('auction-title').textContent = 'Auction Results';
    document.getElementById('auction-content').style.display = 'none';
    document.getElementById('auction-result').style.display = 'block';

    const highestBidOptions = ['0.1 APT', '0.2 APT', '0.5 APT', '1 APT'];
    const randomIndex = Math.floor(Math.random() * highestBidOptions.length);
    const highestBid = highestBidOptions[randomIndex];
    document.getElementById('highest-bid').textContent = highestBid;
    console.log("Set highest bid to:", highestBid);
  } else {
    console.log("Selected date is today or in the future, showing live auction");
    document.getElementById('auction-title').textContent = 'Live Auction';
    document.getElementById('auction-content').style.display = 'block';
    document.getElementById('auction-result').style.display = 'none';
  }

  $('.auction-container').show();
  console.log("Auction container displayed");
}