import { redirect } from "next/navigation";

import { AptosClient, AptosAccount, TxnBuilderTypes } from 'aptos';

// Initialize the Aptos client
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com');

// Function to mint an NFT
async function mintNFT(account: AptosAccount, lessonNumber: number, lessonType: string, completionDate: string) {
    const transaction = {
        // Define your transaction details here
    };

    const response = await client.submitTransaction(account, transaction);
    console.log('Transaction Response:', response);
}

import {
  getLesson,
  getUserProgress,
  getUserSubscription,
} from "@/server/db/queries";

import Quiz from "./quiz";

const LessonPage = async () => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

      // Check if the lesson is completed
  if (initialPercentage === 100) {
    const lessonNumber = 1;
    const lessonType = "Word"; // or "Phrase", "Sentence"
    const completionDate = new Date().toISOString().split('T')[0]; // Current date

    const mintTransaction = await aptos.mintNFT({
      account: userAccount, // The user's wallet
      lessonNumber: lessonNumber,
      lessonType: lessonType,
      completionDate: completionDate,
    });

    console.log('Minting transaction:', mintTransaction);
  }

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
    />
  );
};

export default LessonPage;
