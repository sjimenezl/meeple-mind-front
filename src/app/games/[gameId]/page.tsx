import Tabs from '@/components/Tabs';
import { client } from '@/graphql/client';
import { GAME_BY_ID } from '@/graphql/queries';
import { notFound } from 'next/navigation';

export default async function GameDetails(props: {
    params: Promise<{ gameId: string }>;
}) {
    const { gameId } = await props.params;
    const res = await client.query(GAME_BY_ID, { id: gameId }).toPromise();

    if (res.error) {
        return <div className="max-w-3xl mx-auto p-6">Error: {res.error.message}</div>;
    }

    const g = res.data?.findById;
    if (!g) return notFound();

    const tabs = [
        {
            id: 'overview',
            label: 'Overview',
            content: (
                <div className="space-y-4">
                    <section className="rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-lg font-medium mb-2">Objective</h2>
                        <p className="text-gray-700">{g.goal}</p>
                    </section>
                    <section className="rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-lg font-medium mb-2">Rules Summary</h2>
                        <p className="text-gray-700">{g.rulesSummary}</p>
                    </section>
                </div>
            ),
        },
        {
            id: 'setup',
            label: 'Setup',
            content: (
                <div className="grid gap-4">
                    {(g.setup ?? []).map((s: any, idx: number) => (
                        <div key={idx} className="rounded-2xl border bg-white p-4 shadow-sm">
                            <h3 className="font-medium mb-2">
                                {s.playerCount} player{s.playerCount > 1 ? 's' : ''}
                            </h3>
                            <ul className="list-disc pl-5 text-gray-700">
                                {s.components.map((c: any, i: number) => (
                                    <li key={i}>
                                        {c.quantity} × {c.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            id: 'turn-structure',
            label: 'Turn Structure',
            content: (
                <ol className="rounded-2xl border bg-white p-4 shadow-sm list-decimal pl-6 text-gray-700">
                    {(g.turnStructure ?? []).flatMap((ts: any) => ts.steps).map((step: string, i: number) => (
                        <li key={i} className="mb-1">{step}</li>
                    ))}
                </ol>
            ),
        },
        {
            id: 'scoring',
            label: 'Scoring',
            content: (
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                    <ul className="list-disc pl-5 text-gray-700">
                        {(g.scoringRules ?? []).map((r: any, i: number) => (
                            <li key={i}>
                                <span className="font-medium">{r.description}</span>
                                {r.points != null && <> — <span className="text-amber-700">{r.points} pts</span></>}
                                {r.dynamic && <div className="text-sm text-gray-600">{r.dynamic}</div>}
                            </li>
                        ))}
                    </ul>
                </div>
            ),
        },
        {
            id: 'variants',
            label: 'Variants',
            content: (
                <div className="grid gap-4">
                    {(g.variants ?? []).map((v: any, i: number) => (
                        <div key={i} className="rounded-2xl border bg-white p-4 shadow-sm">
                            <h3 className="font-medium">{v.title}</h3>
                            <p className="text-gray-700">{v.description}</p>
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <main className="max-w-5xl mx-auto p-6 space-y-6">
            {/* Breadcrumbs súper simple */}
            <nav className="text-sm text-gray-500">
                <a href="/" className="hover:underline">Home</a>
                <span> · </span>
                <a href="/games" className="hover:underline">Games</a>
                <span> · </span>
                <span className="text-gray-700">{g.title}</span>
            </nav>

            {/* Header del juego */}
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">{g.title}</h1>
                    <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-xs font-medium mr-2">
                        {g.minPlayers}–{g.maxPlayers} Players
                    </span>
                    <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-xs font-medium ml-2">
                        {g.playtime} mins
                    </span>
                </div>
                {/* <div className="flex gap-2">
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                        {g.minPlayers}–{g.maxPlayers} Players
                    </span>
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                        {g.playtime} mins
                    </span>
                </div> */}
            </header>

            {/* Tabs */}
            <Tabs tabs={tabs} initialId="overview" />
        </main>
    );
}
