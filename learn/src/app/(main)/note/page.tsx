import React from 'react';
import FeedCard from '@/components/card';

const FeedPage = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
      <FeedCard href="https://conversations-iota.vercel.app/" title="Feed 1" external />
      <FeedCard href="https://questionskannadamitra.vercel.app/" title="Feed 2" external />
      <FeedCard href="https://venkatalokeshvemuri.github.io/Learn-it-op/" title="Game" external />
    </div>
  );
};

export default FeedPage;