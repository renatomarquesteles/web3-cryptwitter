import { generateAvatarURL } from '@cfx-kit/wallet-avatar';

interface TweetProps {
  data: {
    author: string;
    username: string;
    timestamp: number;
    text: string;
  };
}

export default function Tweet({ data }: TweetProps) {
  return (
    <>
      <div className="tweet">
        <img
          className="tweet_author_logo"
          src={generateAvatarURL(data.author)}
        />
        <div>
          <div className="tweet_header">
            <div className="tweet_author_name">{data.username}</div>
            <div className="tweet_author_slug">@{data.author}</div>
          </div>
          <div className="tweet_publish_time">
            at {new Date(Number(data.timestamp) * 1000).toLocaleString()}
          </div>
          <div>{data.text}</div>
        </div>
      </div>
    </>
  );
}
