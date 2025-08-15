'use client';

import { useEffect, useState } from 'react';

type TabDef = {
    id: string;         // ex. 'overview'
    label: string;      // ex. 'Overview'
    content: React.ReactNode;
};

export default function Tabs({
    tabs,
    initialId,
    syncWithHash = true, // true, use #overview/#setup at the url
}: {
    tabs: TabDef[];
    initialId?: string;
    syncWithHash?: boolean;
}) {
    const initial =
        (typeof window !== 'undefined' && window.location.hash?.replace('#', '')) ||
        initialId ||
        tabs[0]?.id;

    const [active, setActive] = useState<string>(initial);

    useEffect(() => {
        if (!syncWithHash) return;
        const onHash = () => {
            const h = window.location.hash.replace('#', '');
            if (tabs.some(t => t.id === h)) setActive(h);
        };
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, [syncWithHash, tabs]);

    const onSelect = (id: string) => {
        setActive(id);
        if (syncWithHash) history.replaceState(null, '', `#${id}`);
    };

    return (
        <div className="w-full">
            {/* Tablist */}
            <div
                role="tablist"
                aria-label="Game sections"
                className="flex gap-6 border-b"
            >
                {tabs.map(t => {
                    const isActive = t.id === active;
                    return (
                        <button
                            key={t.id}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`panel-${t.id}`}
                            id={`tab-${t.id}`}
                            onClick={() => onSelect(t.id)}
                            className={[
                                'pb-3 -mb-px text-sm font-medium transition',
                                isActive
                                    ? 'text-amber-700 border-b-2 border-amber-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            ].join(' ')}
                        >
                            {t.label}
                        </button>
                    );
                })}
            </div>

            {/* Panels */}
            {/* <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                
            </section> */}
            <div className="pt-6">
                {tabs.map(t => (
                    <div
                        key={t.id}
                        role="tabpanel"
                        id={`panel-${t.id}`}
                        aria-labelledby={`tab-${t.id}`}
                        hidden={t.id !== active}
                    >
                        {t.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
