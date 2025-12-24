
'use client';

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [poem, setPoem] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const initState = () => {
    const temp = topic;
    setTitle(temp);
    setPoem("");
    setIsLoading(true);
  }
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };
  const send = async () => {
    initState();
    const response = await fetch("/api/poem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });
    if (!response.ok) {
      setPoem("Error generating poem");
      setIsLoading(false);
      return;
    }
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    let aiPoem = "";
    while (true) {
      const { value, done} = await reader!.read();
      if (done) {
        setIsLoading(false);
        break;
      }
      if (value) {
        aiPoem += decoder.decode(value, { stream: true });
        setPoem(aiPoem);
      }
    }
    setTopic("");
    setIsLoading(false);
  };

  return (
    <div className='flex flex-col bg-gray-900 h-5/6 py-2 gap-4 px-4'>
      <div className='min-w-4/5 top-2 flex'>
        <input className=' border border-gray-300 px-2 py-1 rounded w-2/3'
          type="text"
          value={topic}
          onChange={handleInputChange}
          placeholder="Type something..."
        />
        <button 
          className='bg-sky-500 disabled:opacity-50 text-white px-4 py-2 ml-2 rounded'
          onClick={send} disabled={isLoading || !topic.trim()}>
          Generate Poem
        </button>
      </div>
      <h1>{title}</h1>
      {isLoading && <p>Generating poem...</p>}
      <div className='p-4 h-full overflow-y-auto text-gray-200 sm:text-sm md:text-md lg:text-lg '>
        <pre>{poem}</pre>
      </div>
    </div>  
  );
}