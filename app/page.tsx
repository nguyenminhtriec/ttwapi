/* import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
 */

'use client';

import { useState } from "react";

export default function Home() {
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [poem, setPoem] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const initState = () => {
    const temp = subject;
    setTitle(temp);
    setPoem("");
    setIsLoading(true);
  }
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };
  const send = async () => {
    initState();
    const response = await fetch("/api/poem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject }),
    });
    if (!response.ok) {
      setPoem("Error generating poem");
      setIsLoading(false);
      return;
    }
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    // let done = false;
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
    setSubject("");
    setIsLoading(false);
  };

  return (
    <div className='flex flex-col bg-gray-900 h-5/6 py-2 gap-4 px-4'>
      <div className='min-w-4/5 top-2 flex'>
        <input className=' border border-gray-300 px-2 py-1 rounded w-2/3'
          type="text"
          value={subject}
          onChange={handleInputChange}
          placeholder="Type something..."
        />
        <button 
          className='bg-sky-500 disabled:opacity-50 text-white px-4 py-2 ml-2 rounded'
          onClick={send} disabled={isLoading || !subject.trim()}>
          Generate Poem
        </button>
      </div>
      <h1>{title}</h1>
      {isLoading && <p>Generating poem...</p>}
      <div className='p-4 h-full overflow-y-auto'>
        <pre>{poem}</pre>
      </div>
    </div>  
  );
}