"use client";
import { useEffect, useState } from "react";
import { HOST, IData } from "./common";

function FeedItem({data}: {data: IData}) {
  return (
    <article>
      <strong>{data.title}</strong>
      <br />
      {data.creator}
      <br />
      <span style={{fontSize: 14}}>id: {data.id}</span>
    </article>
  )
}

export default function LiveFeed({
  gotNew,
  setDetail,
}: {
  gotNew: (data: IData) => void;
  setDetail: (data: IData) => void;
}) {
  const [feed, setFeed] = useState<IData[] | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://${HOST}/ws/spaces`);

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      // Handle initial array
      if (Array.isArray(data)) {
        setFeed(data);
      }
      // Handle single objects
      else {
        setFeed((prevFeed) => {
          if (prevFeed === null) {
            return [data];
          } else {
            return [data, ...prevFeed];
          }
        });
        if (gotNew) {
          gotNew(data);
        }
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h4 style={{ margin: 0 }}>Live Feed</h4>
      <span>Newest first</span>
      {feed ? (
        <ul>
          {feed.map((item, i) => (
            <li key={i} onClick={(e) => setDetail(item)}><FeedItem data={item} /></li>
          ))}
        </ul>
      ) : (
        <progress />
      )}
    </div>
  );
}
/*
{"id":"321asdasd",
"url":"https://myaudiostorage/spaces/321asdasd",
"title":"Space Title",
"creator":"Space Creator"}
*/