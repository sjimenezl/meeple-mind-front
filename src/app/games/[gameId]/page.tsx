import Card from '@/components/Card';
import SideBarMeta from '@/components/SideBarMeta';
import Tabs from '@/components/Tabs';
import { client } from '@/graphql/client';
import { GAME_BY_ID } from '@/graphql/queries';
import { notFound } from 'next/navigation';
import type { Game } from '@/types/game';
import SubCard from '@/components/SubCard';

export default async function GameDetails(props: {
    params: Promise<{ gameId: string }>;
}) {
    const { gameId } = await props.params;
    const res = await client.query(GAME_BY_ID, { id: gameId }).toPromise();
    console.log(res)

    if (res.error) {
        return <div className="max-w-3xl mx-auto p-6">Error: {res.error.message}</div>;
    }

    const g = res.data?.findById as Game;
    if (!g) return notFound();

    const tabs = [
        {
            id: 'overview',
            label: 'Overview',
            content: (
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                    <div className="space-y-4">
                        <Card title="Goal">
                            <p>{g.goal}</p>
                        </Card>
                        <Card title='Rules Summary'>
                            <p>{g.rulesSummary}</p>
                        </Card>
                    </div>
                    <div className="space-y-4">
                        <SideBarMeta g={g} />
                    </div>
                </div>          
            ),
        },
        {
            id: 'setup',
            label: 'Setup',
            content: (
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                    <div className="space-y-6">
                        <Card title="Players setup">
                            <div className="space-y-4">
                                {(g.setup ?? []).map((s: any, i: number) => (
                                    <SubCard key={i} title={`${s.playerCount} players`}>
                                        <ul className="space-y-1.5">
                                            {s.components.map((c: any, j: number) => (
                                                <li key={j} className="flex items-center justify-between gap-3 text-sm">
                                                    <span className="text-gray-800 dark:text-gray-200">{c.name}</span>
                                                    <span
                                                        className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium
                                 bg-amber-100 text-amber-700
                                 dark:bg-amber-400/15 dark:text-amber-300"
                                                        aria-label={`quantity ${c.quantity}`}
                                                    >
                                                        ×{c.quantity}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </SubCard>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-6 lg:sticky lg:top-24">
                        <Card title="Setup Instructions">
                            <ol className="space-y-3">
                                {(g.setupInstructions ?? []).map((si: any, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center
                           rounded-full text-[11px] font-semibold
                           bg-amber-100 text-amber-700
                           dark:bg-amber-500/15 dark:text-amber-300"
                                            aria-hidden
                                        >
                                            {i + 1}
                                        </span>

                                        <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
                                            {si.description}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </Card>
                    </div>
                </div>
            )
        },
        {
            id: 'turn-structure',
            label: 'Turn Structure',
            content: (
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                    <div className="space-y-4">
                        <Card title="Turn Structure">
                            <ol className="list-decimal pl-6 space-y-1">
                                {(g.turnStructure ?? []).flatMap((ts: any) => ts.steps).map((step: string, i: number) => (
                                    <li key={i}>{step}</li>
                                ))}
                            </ol>
                        </Card>
                    </div>
                </div>  
            ),
        },
        {
            id: 'scoring',
            label: 'Scoring',
            content: (
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                    <div className="space-y-4">
                        <Card title="Scoring">
                            <ul className="space-y-2">
                                {(g.scoringRules ?? []).map((r: any, i: number) => (
                                    <li key={i}>
                                        <span className="font-medium">{r.description}</span>
                                        {r.points != null && <> — <span className="text-amber-700">{r.points} pts</span></>}
                                        {r.dynamic && <div className="text-sm text-gray-600">{r.dynamic}</div>}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                    <div className="space-y-4">
                        <Card title="Win condition">
                            <ul className="space-y-2">
                                {g.winCondition}
                            </ul>
                        </Card>
                        <Card title="Draw condition">
                            <ul className="space-y-2">
                                {g.drawCondition}
                            </ul>
                        </Card>
                        <Card title="End condition">
                            <ul className="space-y-2">
                                {g.endCondition}
                            </ul>
                        </Card>
                    </div>
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
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
                <a href="/" className="hover:underline">Home</a>
                <span> · </span>
                <a href="/games" className="hover:underline">Games</a>
                <span> · </span>
                <span className="text-gray-700">{g.title}</span>
            </nav>

            {/* Header */}
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
            </header>

            {/* Tabs */}
            <Tabs tabs={tabs} initialId="overview" />
        </main>
    );
}

