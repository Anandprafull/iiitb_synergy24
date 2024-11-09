
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>News of the Day (NOTD) Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Respira+Black&display=swap" />
      </Head>
      <header>
        <nav>
          <div className="logo">
            <Image src="/Daily-Logo-NOTD.jpeg" alt="NOTD Logo" className="header-logo" width={225} height={100} />
          </div>
          <ul className="nav-links">
            <li><Link href="#overview">Overview</Link></li>
            <li><Link href="#features">Features</Link></li>
            <li><Link href="#contact">Contact</Link></li>
            <li><Link href="https://notdhub.org/vote/" target="_blank" className="vote-btn">Vote</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="newspaper-container">
              <div className="newspaper">
                <div className="newspaper-header">
                  <h1 className="newspaper-title">NEWS OF THE DAY</h1>
                  <div className="newspaper-meta">
                    <div id="nft-date" className="newspaper-date"></div>
                    <div id="current-bidder" className="newspaper-bidder">No. Of Votes: 29</div>
                  </div>
                </div>
                <div className="newspaper-content">
                  <h2 id="nft-headline" className="newspaper-headline"></h2>
                  <div id="nft-summary" className="newspaper-summary"></div>
                  <div className="newspaper-footer">
                    <div className="newspaper-references">
                      <h3>References:</h3>
                      <div id="nft-links" className="newspaper-links"></div>
                    </div>
                    <a id="nft-id" href="https://sepolia.etherscan.io/token/0x7931edef2a2481f94a4fe847c61fccca8412d18f" target="_blank" className="etherscan-link">Etherscan</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-lhs">
              <div className="date-picker-container">
                <input type="date" id="date-picker" name="date-picker" min="2024-07-14" />
                <button id="view-nft-btn">Explore Past NFTs</button>
              </div>
              <div className="auction-container">
                <h3 id="auction-title">Live Auction</h3>
                <div id="auction-content">
                  <div className="bid-list" id="bid-list">
                    <div className="bid-item">
                      <div className="bid-info">
                        <Image src="/nft-dummy-user.jpeg" alt="User Avatar" className="bid-user-avatar" width={40} height={40} />
                        <span className="bid-user">prafull.apt</span>
                      </div>
                      <span className="bid-amount">1 ETH</span>
                    </div>
                    <div className="bid-item">
                      <div className="bid-info">
                        <Image src="/nft-dummy-user-2.jpeg" alt="User Avatar" className="bid-user-avatar" width={40} height={40} />
                        <span className="bid-user">anand.apt</span>
                      </div>
                      <span className="bid-amount">0.42 ETH</span>
                    </div>
                  </div>
                  <div className="auction-timer">
                    <span id="auction-countdown"></span>
                  </div>
                  <button className="place-bid-btn" disabled>Place Bid</button>
                </div>
                <div id="auction-result" style={{ display: 'none' }}>
                  <div className="result-item">
                    <div className="result-info">
                      <Image src="/nft-dummy-user.jpeg" alt="Owner Profile" className="result-owner-avatar" width={40} height={40} />
                      <span className="result-owner">Owner: prafull.apt</span>
                    </div>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Winning Bid:</span>
                    <span id="highest-bid" className="result-value"></span>
                  </div>
                </div>
                <p className="min-bid-text">Please note that this page is currently using dummy data for demonstration purposes.</p>
              </div>
            </div>
          </div>
          <div className="no-nft-message">
            <h2>NO NFT MINTED</h2>
          </div>
        </section>
        <section id="overview" className="overview">
          <div className="container">
            <h2>What We Do</h2>
            <p>NOTD is a revolutionary project that preserves the most significant news events on the blockchain as unique NFTs. We create a decentralized archive of history, allowing you to own and cherish moments that shape our world. By leveraging the power of blockchain technology, we ensure the authenticity and immutability of these historical artifacts. Our mission is to build a collective memory of the world's most important events and provide a platform for individuals to engage with and own a piece of history.</p>
          </div>
        </section>
        <section id="features" className="features">
          <div className="container">
            <div className="feature-boxes">
              <div className="feature-box">
                <i className="fas fa-vote-yea"></i>
                <h3>Decentralized Voting</h3>
                <p>Our decentralized voting system empowers the community to determine which news events are minted as NFTs, ensuring a fair and transparent process.</p>
              </div>
              <div className="feature-box">
                <i className="fas fa-certificate"></i>
                <h3>Own a Piece of History</h3>
                <p>Become a custodian of iconic moments that shaped our world by owning NFTs that encapsulate these history-making news events.</p>
              </div>
              <div className="feature-box">
                <i className="fas fa-history"></i>
                <h3>Explore the Tapestry of Time</h3>
                <p>Embark on a captivating journey through the annals of history as you scroll through NOTD's curated collection of NFTs representing pivotal news events.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="contact">
          <div className="container">
            <h2>Want to get Involved?</h2>
            <p>To participate in voting, you need to be whitelisted by buying an NFT on the Sepolia testnet. Visit our OpenSea collection to get started:</p>
            <a href="https://testnets.opensea.io/collection/dailynewsnft-2" target="_blank" className="opensea-link">View NFTs on OpenSea</a>
            <div className="contact-info">
              <h3>Contact Us</h3>
              <p><i className="fas fa-envelope"></i> notdcollectibles@gmail.com</p>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
          <div className="social-links">
            <a href="https://x.com/NOTDCollectible" target="_blank" className="twitter"><i className="fab fa-twitter"></i></a>
            <a href="https://www.linkedin.com/in/sanchay-dewan-55490182" target="_blank" className="linkedin"><i className="fab fa-linkedin"></i></a>
            <a href="https://github.com/sanchayd/ethereum_contracts" target="_blank" className="github"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}