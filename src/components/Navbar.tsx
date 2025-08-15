"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-white backdrop-blur border-b">
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                <Link href="/" className="font-semibold text-amber-700">Meeple Mind</Link>
                <nav className="flex gap-4 text-sm">
                    <Link href="/games" className="hover:text-amber-700">Games</Link>
                </nav>
            </div>
        </header>
    );
}
