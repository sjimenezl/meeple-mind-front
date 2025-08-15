"use client";

export default function Footer() {
    return (
        <footer className="border-t bg-white">
            <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-gray-600">
                © {new Date().getFullYear()} Meeple Mind
            </div>
        </footer>
    );
}
