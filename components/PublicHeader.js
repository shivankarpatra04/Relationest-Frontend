// components/PublicHeader.js — shared header for public (logged-out) pages
import { useRouter } from 'next/router';
import { Heart } from 'lucide-react';

export default function PublicHeader({ links = [] }) {
    const router = useRouter();

    return (
        <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
            <div className="container mx-auto px-4">
                <nav className="flex h-16 items-center justify-between">
                    <button onClick={() => router.push('/')} className="group flex items-center gap-2" aria-label="Home">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-glow transition-transform group-hover:scale-110">
                            <Heart className="h-5 w-5 fill-white" />
                        </span>
                        <span className="text-xl font-bold text-gradient">RelatioNest</span>
                    </button>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {links.map(({ label, path, primary }) =>
                            primary ? (
                                <button key={label} onClick={() => router.push(path)} className="btn-primary px-5 py-2 text-sm">
                                    {label}
                                </button>
                            ) : (
                                <button
                                    key={label}
                                    onClick={() => router.push(path)}
                                    className="px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-purple-700"
                                >
                                    {label}
                                </button>
                            )
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
