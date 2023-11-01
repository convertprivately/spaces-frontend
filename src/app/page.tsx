"use client";
import LiveFeed from "@/LiveFeed";
import React, { useEffect, useRef } from "react";
import { API_URL, IData } from "@/common";

export default function Home() {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [isInputValid, setIsInputValid] = React.useState<boolean>(false);
  const detailId = useRef<string | null>(null);
  const [detail, setDetail] = React.useState<IData | null>(null);

  const handleNewData = (data: IData) => {
    if (data.id && detailId.current && data.id === detailId.current) {
      console.log("setting detail")
      setDetail(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await fetch(`${API_URL}/spaces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: inputValue, notify_email: null }),
    })
    const detailData = await resp.json();
    if (detailData !== null) {
      detailId.current = detailData.id;
      setDetail(detailData);
    } else {
      const url = new URL(inputValue);
      detailId.current = url.pathname.split("/").pop()!;
      setDetail(null);
    }
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setIsInputValid(() => {
      try {
        const url = new URL(inputValue);
        return (url.hostname === "twitter.com" && url.pathname.startsWith("/i/spaces/"))
      } catch (e) {
        return false;
      }
    });
  }, [inputValue]);

  return (
    <div className="container" style={{ padding: "2em" }}>
      <header>
        <h2>Twitter Spaces Downloader</h2>
      </header>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Paste twiter space link here"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={!isInputValid}>Submit</button>
      </form>

      <div style={{display: "flex", flexDirection: "row", gap: "2em"}}>
        <div style={{width: "25vw"}}>
          <LiveFeed gotNew={handleNewData} setDetail={(item) => {setDetail(item); detailId.current = item.id;}}/>
        </div>
        <div style={{display: "flex", flexDirection: "column", width: "40vw"}}>
          <h4 style={{margin:0}}>Detail</h4>
          <p>Detail for {detailId.current}</p>
          {detail && <pre>{JSON.stringify(detail, null, 2)}</pre>}
        </div>
      </div>

    </div>
  );
}
