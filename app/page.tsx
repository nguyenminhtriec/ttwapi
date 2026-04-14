import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen max-w-3xl items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32 px-16 gap-8 bg-white dark:bg-black">
        <Image
          className="dark:invert"
          src="/globe.svg"
          alt="Next.js logo"
          width={100}
          height={100}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <pre>{text}</pre>
        </div>
      </main>
    </div>
  );
}

const text = 
`A tiny hum, a golden blur,
Through garden greens, a gentle stir.
On velvet petals, soft it lands,
With fuzzy body, busy hands.
From sunlit bloom to fragrant prize,

It sips the nectar, with keen eyes.
A dusty coat of pollen bright,
Shared with the world, with all its might.
Back to the hive, a golden store,
Sweet honey made, for evermore.

A tireless worker, small and grand,
The little bee, across the land.`;