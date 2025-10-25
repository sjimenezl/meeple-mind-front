// components/SidebarMeta.tsx
'use client';
export default function SidebarMeta({ g }: { g: any }) {
    return (
        <aside className="rounded-2xl border bg-white p-4 shadow-sm space-y-2">
            <div className="text-sm text-gray-600">Players</div>
            <div className="font-medium">{g.minPlayers}–{g.maxPlayers}</div>

            <div className="text-sm text-gray-600 mt-3">Playtime</div>
            <div className="font-medium">{g.playtime} min</div>

            {/* opcional: badges */}
            <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                    Classic
                </span>
            </div>
        </aside>
    );
}
