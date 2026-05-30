// components/Navbar.js
import { useRouter } from 'next/router';
import { useState } from 'react';
import { removeToken } from '../utils/auth';
import { Heart, History, Info, HelpCircle, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        removeToken();
        router.push('/login');
    };

    const links = [
        { label: 'History', path: '/ChatHistory', icon: History },
        { label: 'About', path: '/about', icon: Info },
        { label: 'FAQ', path: '/faq', icon: HelpCircle },
    ];

    const isActive = (path) => router.pathname === path;

    return (
        <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
            <div className="container mx-auto px-4">
                <nav className="flex h-16 items-center justify-between">
                    <button
                        onClick={() => router.push('/main')}
                        className="group flex items-center gap-2"
                        aria-label="Home"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-glow transition-transform group-hover:scale-110">
                            <Heart className="h-5 w-5 fill-white" />
                        </span>
                        <span className="text-xl font-bold text-gradient">RelatioNest</span>
                    </button>

                    {/* Desktop */}
                    <div className="hidden items-center gap-1 md:flex">
                        {links.map(({ label, path }) => (
                            <button
                                key={path}
                                onClick={() => router.push(path)}
                                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                                    isActive(path) ? 'text-purple-700' : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                {label}
                                <span
                                    className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 transition-transform duration-300 ${
                                        isActive(path) ? 'scale-x-100' : 'scale-x-0'
                                    }`}
                                />
                            </button>
                        ))}
                        <button onClick={handleLogout} className="btn-primary ml-2 px-4 py-2 text-sm">
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
                        aria-label="Menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </nav>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="border-t border-slate-100 bg-white/95 backdrop-blur-xl md:hidden">
                    <div className="container mx-auto space-y-1 px-4 py-3">
                        {links.map(({ label, path, icon: Icon }) => (
                            <button
                                key={path}
                                onClick={() => { router.push(path); setIsOpen(false); }}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-700"
                            >
                                <Icon className="h-4 w-4" />
                                {label}
                            </button>
                        ))}
                        <button
                            onClick={() => { handleLogout(); setIsOpen(false); }}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
