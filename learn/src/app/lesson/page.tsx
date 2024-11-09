import { redirect } from "next/navigation";
import { AptosClient, AptosAccount } from 'aptos';
import {
    getLesson,
    getUserProgress,
    getUserSubscription,
} from "@/server/db/queries";
import Quiz from "./quiz";

// Initialize the Aptos client
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com');

// Function to mint an NFT
async function mintNFT(account: AptosAccount, lessonNumber: number, lessonType: string, completionDate: string) {
    try {
        console.log('Minting NFT with details:', { lessonNumber, lessonType, completionDate });

        const payload = {
            type: "entry_function_payload",
            function: `0x6bb456c08eed50086f44e94256604993b24ba9ed5f80927c8867870a3f04941c::nft::mint_nft`, // Corrected function call
            arguments: [lessonNumber, lessonType, completionDate],
            type_arguments: [],
        };

        console.log('Generated payload:', payload);

        const rawTransaction = await client.generateTransaction(account.address(), payload);
        console.log('Generated raw transaction:', rawTransaction);

        const signedTxn = await client.signTransaction(account, rawTransaction);
        console.log('Signed transaction:', signedTxn);

        const response = await client.submitTransaction(signedTxn);
        console.log('Submitted transaction, response:', response);

        await client.waitForTransaction(response.hash);
        console.log('Transaction confirmed with hash:', response.hash);

        return response;
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw error;
    }
}

const LessonPage = async () => {
    console.log('Fetching lesson data...');
    
    // Await the promises to fetch data
    const lessonData = await getLesson();
    const userProgressData = await getUserProgress();
    const userSubscriptionData = await getUserSubscription();

    const [lesson, userProgress, userSubscription] = await Promise.all([
        lessonData,
        userProgressData,
        userSubscriptionData,
    ]);

    console.log('Fetched data:', { lesson, userProgress, userSubscription });

    if (!lesson || !userProgress) {
        console.log('Lesson or user progress not found, redirecting...');
        redirect("/learn");
        return;
    }

    const completedChallenges = lesson.challenges.filter(challenge => challenge.completed);
    const initialPercentage = (completedChallenges.length / lesson.challenges.length) * 100;

    console.log('Challenges:', lesson.challenges);
    console.log('Completed Challenges:', completedChallenges);
    console.log('Initial Percentage:', initialPercentage);

    // Check if all challenges are completed
    const allChallengesCompleted = lesson.challenges.every(challenge => challenge.completed);
    if (allChallengesCompleted) {
        console.log('Lesson completed, minting NFT...');
        const lessonNumber = lesson.id; // Use the actual lesson ID
        const lessonType = "Word"; // or "Phrase", "Sentence"
        const completionDate = new Date().toISOString().split('T')[0]; // Current date

        // Ensure userAccount is defined correctly with a valid private key
        const userAccount = new AptosAccount(); 

        try {
            console.log('Attempting to mint NFT...');
            const mintTransaction = await mintNFT(userAccount, lessonNumber, lessonType, completionDate);
            console.log('Minting transaction successful:', mintTransaction);
        } catch (error) {
            console.error('Failed to mint NFT:', error);
        }
    } else {
        console.log('Lesson not completed, NFT minting not triggered.');
    }

    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialHearts={userProgress.hearts} // Fixed typo here
            initialPercentage={initialPercentage}
            userSubscription={userSubscription}
        />
    );
};

export default LessonPage;