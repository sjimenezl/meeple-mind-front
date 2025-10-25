import Card from '@/components/Card';
import SidebarMeta from '@/components/SideBarMeta';
import Tabs from '@/components/Tabs';
import { client } from '@/graphql/client';
import { GAME_BY_ID } from '@/graphql/queries';
import { notFound } from 'next/navigation';

export default async function GameDetails(props: {
    params: Promise<{ gameId: string }>;
}) {
    const { gameId } = await props.params;
    const res = await client.query(GAME_BY_ID, { id: gameId }).toPromise();
    console.log(res)

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
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                    <div className="space-y-4">
                        <h1>Overview</h1>
                        <Card title="Goal">
                            <p>{g.goal}</p>
                        </Card>
                        <Card title='Rules Summay'>
                            <p>{g.rulesSummary}</p>
                        </Card>
                    </div>
                    <div className="space-y-4">
                        <section className="rounded-2xl border bg-white p-4 shadow-sm">
                            <h2 className="text-lg font-medium mb-2">Goal</h2>
                            <p className="text-gray-700">{g.goal}</p>
                        </section>
                        <section className="rounded-2xl border bg-white p-4 shadow-sm">
                            <h2 className="text-lg font-medium mb-2">Rules Summary</h2>
                            <p className="text-gray-700">{g.rulesSummary}</p>
                        </section>
                    </div>
                </div>          
            ),
        },
        {
            id: 'setup',
            label: 'Setup',
            content: (
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                    <div className='space-y-4'>
                        <Card title="Setup">
                            <div className="space-y-4">
                                {(g.setup ?? []).map((s: any, i: number) => (
                                    <div key={i}>
                                        <h3 className="font-medium mb-1">{s.playerCount} players</h3>
                                        <ul className="list-disc list-inside text-sm text-gray-700">
                                            {s.components.map((c: any, j: number) => (
                                                <li key={j}>{c.quantity} × {c.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        {/* <Card title='Setup'>
                            {(g.setup ?? []).map((s: any, i: number) => (
                                <div key={i}>
                                    <h3 className="font-medium mb-1">{s.playerCount} players</h3>
                                    <table className='border-separate border border-gray-400'>
                                        <thead className=''>
                                            <tr>
                                                <th className='border border-gray-300 p-4'>
                                                    Component
                                                </th>
                                                <th className='border border-gray-300 p-4'>
                                                    Quantity
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {s.components.map((c: any, j: number) => (
                                                <tr>
                                                    <td key={j} className='border border-gray-300 p-4 text-gray-500 dark:border-gray-400'>{c.quantity}</td>
                                                    <td className='border border-gray-300 p-4 text-gray-500 dark:border-gray-400'>{c.name}</td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>
                            ))}

                        </Card> */}
                    </div>
                    <div className='space-y-4'>
                        <Card title='Setup Instructions'>
                            <ol className="rounded-2xl bg-white p-4 list-decimal pl-6 text-gray-700">
                                {(g.setupInstructions ?? []).map((si: any, i: number) => (
                                    <li key={i} className="">{si.description} {i}</li>
                                ))}
                            </ol>

                        </Card>
                    </div>
                </div>   
            ),
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
            </header>

            {/* Tabs */}
            <Tabs tabs={tabs} initialId="overview" />
        </main>
    );
}

