import { client } from '@/graphql/client';
import { GAME_BY_ID } from '@/graphql/queries';
import { notFound } from 'next/navigation';

export default async function GameDetails(props: {
    params: Promise<{ gameId: string }>;
}) {
    const { gameId } = await props.params;

    const res = await client.query(GAME_BY_ID, { id: gameId }).toPromise();

    if (res.error) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                Error loading game: {res.error.message}
            </div>
        );
    }

    const g = res.data?.findById;
    if (!g) return notFound();

    return (
        <main className="max-w-3xl mx-auto p-6 space-y-6">
            <header>
                <h1 className="text-3xl font-semibold">{g.title}</h1>
                <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-xs font-medium mr-2">
                    {g.minPlayers}–{g.maxPlayers} players
                </span>
                <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-xs font-medium ml-2">
                    {g.playtime} min
                </span>
                {/* <p className="text-sm text-gray-600">
                    {g.minPlayers}–{g.maxPlayers} players · {g.playtime} min
                </p> */}
            </header>

            <section className="rounded-2xl border bg-white p-4 shadow-sm">
                <h2 className="text-lg font-medium mb-2">Objective</h2>
                <p className="text-gray-700">{g.goal}</p>
            </section>

            <section className="rounded-2xl border bg-white p-4 shadow-sm">
                <h2 className="text-lg font-medium mb-2">Rules Summary</h2>
                <p className="text-gray-700">{g.rulesSummary}</p>
            </section>
        </main>
    );
}
