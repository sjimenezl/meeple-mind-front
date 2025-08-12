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
      <h1 className="text-3xl font-semibold mb-4">Meeple Mind</h1>
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
