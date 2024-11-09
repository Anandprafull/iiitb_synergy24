News of the Day (NOTD) Website
The News of the Day (NOTD) website is a decentralized platform that represents daily news as non-fungible tokens (NFTs) on the Ethereum blockchain. It provides users with a unique and immutable way to capture and preserve important news events. The website consists of two main pages: the Home Page and the Voting Page.
Home Page
The Home Page (index.html) serves as the landing page of the NOTD website. It provides an introduction to the NOTD project and displays the most recent daily news NFT. Users can view this NFT to get a glimpse of the significant news event captured on the blockchain.
Features
View the most recent daily news NFT
Learn about the NOTD project and its mission
Access the Voting Page to participate in selecting the news of the day
Elegant and visually appealing design with a blue gradient color scheme
Responsive layout that adapts to different screen sizes
Voting Page
The Voting Page (vote/index.html) is where authenticated users can vote for their favorite news headline of the day. It offers a secure and interactive platform for users to engage with the news selection process.
Features
Authentication and authorization using web3 wallets (e.g., MetaMask)
Secure signing of requests using wallet-based authentication
Verification of user's NFT ownership to ensure voting eligibility
Fetching and displaying the headlines for the current day from the API backend
Casting votes for the favorite news headline using the user's web3 wallet
Real-time display of the "Processing your vote" message during transaction confirmation
Recording of votes on the backend and determination of the winning headline
Display of voting results, including the winning headline and vote count
Disabling of vote buttons and displaying tooltips for users who have already voted
Graying out the "See Voting Progress" button until the user has successfully voted or has already voted for the current day
Consistent design with the Home Page, incorporating a blue gradient color scheme
Improved spacing and layout for better readability and visual appeal
Error Handling and User Experience
The Voting Page incorporates robust error handling and provides informative messages to enhance the user experience:
If a web3 wallet is not installed or connected, an emphasized error message is displayed, prompting the user to install and connect a compatible web3 wallet to vote.
If the user attempts to vote without possessing a NOTD NFT, an error message is displayed, prompting them to acquire a NOTD NFT to participate in voting.
If the voting transaction fails due to any reason, an appropriate error message is displayed.
These error handling mechanisms ensure a smooth and informative user experience while interacting with the Voting Page.
Technologies Used
HTML: Structure and content of the Voting Page
CSS: Styling and layout of the Voting Page
JavaScript: Interactivity and dynamic functionality
Web3.js: Interaction with the Ethereum blockchain
Backend Services
The Voting Page interacts with backend services to fetch headlines, record votes, and determine the winning headline. The backend services are implemented using AWS Lambda functions and interact with the Ethereum blockchain.
Future Enhancements
The NOTD website is an ongoing project, and future enhancements may include:
Integration with additional web3 wallets and blockchain networks
Expanded voting options and categories
Integration with decentralized storage solutions for storing NFT metadata
Marketplace functionality for buying, selling, and trading NOTD NFTs
Leaderboard feature to showcase the users with the most winning headlines
Please note that this README provides an overview of the updated NOTD website, reflecting the smart updates and removal of certain functionalities. The actual implementation may vary based on the specific changes made to the codebase.