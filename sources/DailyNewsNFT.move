module 0x6bb456c08eed50086f44e94256604993b24ba9ed5f80927c8867870a3f04941c::DailyNewsNFT {
    use aptos_framework::timestamp;
    use aptos_std::signer;

    // Define the NFT resource with attributes like headline, IPFS link, etc.
    struct NewsNFT has key {
        id: u64,                  // Unique identifier for each NFT
        owner: address,           // Owner of the NFT
        headline: vector<u8>,     // Headline as bytes
        ipfs_link: vector<u8>,    // Link to IPFS metadata
        created_at: u64           // Timestamp
    }

    // Counter to track token IDs
    struct NFTCounter has key {
        count: u64
    }

    // Initialize counter
    public fun init(account: &signer) {
        move_to(account, NFTCounter { count: 0 });
    }

    // Mint a new News NFT
    public fun mint_news_nft(account: &signer, headline: vector<u8>, ipfs_link: vector<u8>) acquires NFTCounter {
        let counter = borrow_global_mut<NFTCounter>(signer::address_of(account));
        let id = counter.count;
        counter.count = counter.count + 1;

        let timestamp = timestamp::now_microseconds();
        let news_nft = NewsNFT {
            id,
            owner: signer::address_of(account),
            headline,
            ipfs_link,
            created_at: timestamp
        };

        // Store the NFT in the account
        move_to(account, news_nft);
    }
}
