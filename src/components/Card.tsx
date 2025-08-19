'use client';
type CardProps = { title: string; children: React.ReactNode };

export default function Card({ title, children }: CardProps) {
    return (
        <section className="rounded-2xl border bg-white p-4 shadow-sm">
            <h2 className="text-lg font-medium mb-2">{title}</h2>
            <div className="text-gray-700">{children}</div>
        </section>
    );
}