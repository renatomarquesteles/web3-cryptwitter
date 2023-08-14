'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import NewTweet from '@/components/NewTweet';
import Tweet from '@/components/Tweet';
import { getLastTweets } from '@/services/Web3Service';

interface Tweet {
  author: string;
  username: string;
  timestamp: number;
  text: string;
}

export default function Timeline() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [page, setPage] = useState(1);

  async function loadTweets(page = 1) {
    try {
      const results = await getLastTweets(page);

      if (page > 1) {
        tweets.push(...results);
        setTweets(tweets.reverse());
      } else {
        setTweets(results.reverse());
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  }

  useEffect(() => {
    loadTweets(page);
  }, [page]);

  function btnLoadMoreClick() {
    setPage(page + 1);
  }

  return (
    <>
      <Head>
        <title>CrypTwitter | Timeline</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <div className="row">
          <div className="layout">
            <NewTweet />

            {tweets && tweets.length ? (
              tweets.map((tweet) => (
                <Tweet key={Number(tweet.timestamp)} data={tweet} />
              ))
            ) : (
              <p>Nothing to see here. Make the first tweet.</p>
            )}

            {tweets.length > 0 && tweets.length % 10 === 0 && (
              <div className="center">
                <input
                  type="button"
                  className="btn btn-primary"
                  value="More Tweets"
                  onClick={btnLoadMoreClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
