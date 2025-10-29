'use client';

type SubCardProps = {title?: string; children: React.ReactNode}

export default function SubCard({
    title,
    children,
}: SubCardProps) {
    return(
        <div
            className="rounded-xl border border-gray-200/60 bg-white p-4 shadow-sm
                         dark:border-white/10 dark:bg-white/5"
        >
            {title && (
                <h3
                    className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2
                             dark:text-gray-400"
                >
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}