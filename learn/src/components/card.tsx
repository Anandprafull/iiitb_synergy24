import Link from 'next/link';
import { Book } from 'lucide-react';

interface FeedCardProps {
    href: string;
    title: string;
    external?: boolean;
  }
const FeedCard = ({ title, href, external }: FeedCardProps) => {
  return (
    <div className="w-full max-w-xs flex flex-col items-center gap-y-2 p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
      {external ? (
        <a href={href} className="w-full flex flex-col items-center gap-y-2">
          <div className="relative flex items-center justify-center mb-2 w-full h-48 rounded-t-lg">
            <Book className="w-16 h-16 text-gray-600" />
          </div>
          <div className="text-lg font-semibold text-gray-800 p-4 text-center">
            {title}
          </div>
        </a>
      ) : (
        <Link href={href}>
          <div className="w-full flex flex-col items-center gap-y-2">
            <div className="relative flex items-center justify-center mb-2 w-full h-48 rounded-t-lg">
              <Book className="w-16 h-16 text-gray-600" />
            </div>
            <div className="text-lg font-semibold text-gray-800 p-4 text-center">
              {title}
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default FeedCard;