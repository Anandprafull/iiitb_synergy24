
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Vote.module.css';

export default function Vote() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vote for Your News Of The Day</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet" />
      </Head>
      <div className="wrapper">
        <header>
          <nav>
            <div className="logo">
              <Image src="/Daily-Logo-NOTD.jpeg" alt="NOTD Logo" className="header-logo" width={225} height={100} />
            </div>
            <div className="past-mints-link">
              <Link href="https://notdhub.org/" target="_blank" className="vote-btn">Home</Link>
            </div>
          </nav>
        </header>
        <main>
          <section className="voting-section">
            <h1>Vote for Your News Of The Day</h1>
            <div id="voting-container" className="unauthorized">
              <ul id="headlines-list">
                {/* Headlines will be dynamically populated here */}
              </ul>
              <div id="vote-confirmation">
                <div id="processing-message" style={{ display: 'none' }}>
                  <div className="loading-animation"></div>
                  <p>Your vote is being recorded securely. This process takes a few seconds. Thank you for your patience and participation!</p>
                </div>
                <div id="success-message" style={{ display: 'none' }}></div>
                <div id="already-voted-message" style={{ display: 'none' }}>
                  You have already voted for today. Voting is disabled.
                </div>
                <div id="error-message" style={{ display: 'none' }}></div>
              </div>
              <div id="no-nft-message" className="message" style={{ display: 'none' }}>
                <p>To be eligible to vote ensure you have a NOTD NFT in your wallet.</p>
              </div>
            </div>
          </section>
          <section className="results-section">
            <button id="view-winning-headline" className="disabled">See Voting Progress</button>
            <div id="winning-headline-container" style={{ display: 'none' }}>
              <div className="winning-headline-box">
                <i className="fas fa-trophy"></i>
                <h3>Top Voted Headline</h3>
                <p id="winning-headline"></p>
                <h2>Vote Count</h2>
                <p id="vote-count"></p>
              </div>
            </div>
          </section>
        </main>
      </div>
      <footer>
        <div className="container">
          <div className="social-links">
            <a href="https://twitter.com/sanchay219" target="_blank" className="twitter"><i className="fab fa-twitter"></i></a>
            <a href="https://www.linkedin.com/in/sanchay-dewan-55490182" target="_blank" className="linkedin"><i className="fab fa-linkedin"></i></a>
            <a href="https://github.com/sanchayd/ethereum_contracts" target="_blank" className="github"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </footer>
      <script src="https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js"></script>
      <script src="/script.js"></script>
    </div>
  );
}