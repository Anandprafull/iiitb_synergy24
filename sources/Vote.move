module 0x6bb456c08eed50086f44e94256604993b24ba9ed5f80927c8867870a3f04941c::voting {
    use aptos_std::signer;
    use aptos_std::string::String;
    use std::vector;

    /// ============================ Errors ============================ ///
    const ERR_PROPOSAL_EXISTS: u64 = 1;
    const ERR_INVALID_PROPOSAL: u64 = 2;
    const ERR_ALREADY_VOTED: u64 = 3;
    const ERR_PROPOSAL_ENDED: u64 = 4;

    /// Struct to represent a proposal headline
    struct Headline has key, store {
        text: String,
        vote_count: u64,
    }

    struct Proposal has key, store {
        id: u64,
        headlines: vector<Headline>,
        has_voted: vector<address>,
        winning_headline: u64,
    }

    struct VotingRegistry has key, store {
        proposals: vector<Proposal>
    }

    fun init_module(account: &signer) {
        if (!exists<VotingRegistry>(@0x6bb456c08eed50086f44e94256604993b24ba9ed5f80927c8867870a3f04941c)) {
            move_to(account, VotingRegistry { proposals: vector::empty<Proposal>() });
        }
    }

    /// Function to add a new proposal
    public entry fun add_proposal(_account: &signer, text: String) acquires VotingRegistry {
        let registry = borrow_global_mut<VotingRegistry>(@0x6bb456c08eed50086f44e94256604993b24ba9ed5f80927c8867870a3f04941c);
        let new_id = vector::length(&registry.proposals) + 1;
        let headline = Headline { text, vote_count: 0 };
        let new_proposal = Proposal {
            id: new_id,
            headlines: vector::singleton(headline),
            has_voted: vector::empty<address>(),
            winning_headline: 0,
        };
        vector::push_back(&mut registry.proposals, new_proposal);
    }

    /// Function to vote for a specific headline in a proposal
    public entry fun vote(account: &signer, proposal_id: u64, headline_index: u64) acquires VotingRegistry {
        let registry = borrow_global_mut<VotingRegistry>(@0x6bb456c08eed50086f44e94256604993b24ba9ed5f80927c8867870a3f04941c);
        let proposal = vector::borrow_mut(&mut registry.proposals, proposal_id - 1);
        let sender_address = signer::address_of(account);

        // Check if user has already voted on this proposal
        let already_voted = vector::contains(&proposal.has_voted, &sender_address);
        assert!(!already_voted, ERR_ALREADY_VOTED);

        let headline = vector::borrow_mut(&mut proposal.headlines, headline_index);
        headline.vote_count = headline.vote_count + 1;
        vector::push_back(&mut proposal.has_voted, sender_address);
    }

    /// Function to determine the winning headline for a proposal
    public entry fun determine_winning_headline(_account: &signer, proposal_id: u64) acquires VotingRegistry {
        let registry = borrow_global_mut<VotingRegistry>(@0x6bb456c08eed50086f44e94256604993b24ba9ed5f80927c8867870a3f04941c);
        let proposal = vector::borrow_mut(&mut registry.proposals, proposal_id - 1);
        
        let max_votes = 0;
        let winning_index = 0;

        let headline_len = vector::length(&proposal.headlines);
        let i = 0;
        while (i < headline_len) {
            let headline = vector::borrow(&proposal.headlines, i);
            if (headline.vote_count > max_votes) {
                max_votes = headline.vote_count;
                winning_index = i;
            }
            else{
            i = i + 1;
        }
        };
        proposal.winning_headline = winning_index;
    }

    /// Read function to get the count of headlines in a proposal
    public fun get_headline_count(proposal_id: u64): u64 acquires VotingRegistry {
        let registry = borrow_global<VotingRegistry>(@0x1);
        let proposal = vector::borrow(&registry.proposals, proposal_id - 1);
        vector::length(&proposal.headlines)
    }

    /// Read function to get the winning headline's text for a proposal
    public fun get_winning_headline(proposal_id: u64): String acquires VotingRegistry {
        let registry = borrow_global<VotingRegistry>(@0x6bb456c08eed50086f44e94256604993b24ba9ed5f80927c8867870a3f04941c);
        let proposal = vector::borrow(&registry.proposals, proposal_id - 1);
        let winning_index = proposal.winning_headline;
        vector::borrow(&proposal.headlines, winning_index).text
    }
}
