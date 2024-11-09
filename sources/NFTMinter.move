module kannada_mitra::nft {
    use std::signer;
    use aptos_framework::event;

    struct LessonNFT has key {
        lesson_number: u64,
        lesson_type: vector<u8>, // e.g., "Word", "Phrase", "Sentence"
        completion_date: vector<u8>, // Store date as a string
        owner: address,
    }

    public fun mint_nft(account: &signer, lesson_number: u64, lesson_type: vector<u8>, completion_date: vector<u8>) {
        let owner_address = signer::address_of(account);
        let new_nft = LessonNFT {
            lesson_number,
            lesson_type,
            completion_date,
            owner: owner_address,
        };
        move_to(account, new_nft);
        event::emit(NFTMinted { lesson_number, owner: owner_address });
    }

    #[event]
    struct NFTMinted has store, drop {
        lesson_number: u64,
        owner: address,
    }
}