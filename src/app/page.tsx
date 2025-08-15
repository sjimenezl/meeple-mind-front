import { client } from "@/graphql/client";
import { GAMES } from "@/graphql/queries";

export default async function Home() {
  const res = await client.query(GAMES, {}).toPromise();
  const games = res.data?.games ?? [];

  if(res.error) {
    // render error
    console.log("error ", res.error)
  }

  if(!res.data) {
    // render a loading?
    console.log("Loading")
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Meeple Mind</h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Your boardgame refreshers</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Browse Games
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <h1 className="text-3xl font-semibold mb-4">Home</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((g: any) => (
          <a
            key={g.id}
            href={`/games/${g.id}`}
            className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-medium">{g.title}</h3>
            <p className="text-sm text-gray-600">
              {g.minPlayers}–{g.maxPlayers} players · {g.playtime} min
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
