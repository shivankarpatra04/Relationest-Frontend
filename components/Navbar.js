// components/Navbar.js
import { useRouter } from 'next/router';
import { useState } from 'react';
import { removeToken } from '../utils/auth';

export default function Navbar() {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        removeToken();
        router.push('/login');
    };

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <nav className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <span
                            onClick={() => router.push('/')}
                            className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80"
                        >
                            RelatioNest
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button
                            onClick={() => router.push('/ChatHistory')}
                            className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            History
                        </button>
                        <button
                            onClick={() => router.push('/about')}
                            className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            About
                        </button>
                        <button
                            onClick={() => router.push('/faq')}
                            className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            FAQ
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-white bg-gradient-to-r from-rose-500 to-purple-600 rounded-lg hover:from-rose-600 hover:to-purple-700 transition-colors"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="p-2 text-slate-600 hover:text-slate-900"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isDropdownOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                                <button
                                    onClick={() => {
                                        router.push('/ChatHistory');
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 w-full text-left"
                                >
                                    History
                                </button>
                                <button
                                    onClick={() => {
                                        router.push('/about');
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 w-full text-left"
                                >
                                    About
                                </button>
                                <button
                                    onClick={() => {
                                        router.push('/faq');
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 w-full text-left"
                                >
                                    FAQ
                                </button>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block px-4 py-2 text-sm text-rose-600 hover:bg-slate-100 w-full text-left font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}