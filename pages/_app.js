// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import Footer from '../components/Footer';
import FloatingContactButton from '../components/FloatingContactButton';
import Navbar from '../components/Navbar';
import { isAuthenticated } from '../utils/auth';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    // Configuration for page layouts and authentication
    const config = {
        // Pages that don't need authentication
        publicPaths: ['/login', '/register', '/'],

        // Pages that shouldn't show the navbar
        pagesWithoutNavbar: ['/', '/login', '/register'],

        // Pages that shouldn't show the footer
        pagesWithoutFooter: ['/']
    };

    // Authentication check
    useEffect(() => {
        const handleRouteChange = (url) => {
            const path = url.split('?')[0];
            if (!config.publicPaths.includes(path) && !isAuthenticated()) {
                router.push('/login');
            }
        };

        // Check authentication on route change
        router.events.on('routeChangeStart', handleRouteChange);

        // Check authentication on initial load
        if (!config.publicPaths.includes(router.pathname) && !isAuthenticated()) {
            router.push('/login');
        }

        // Cleanup event listener
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router]);

    // Layout visibility checks
    const showNavbar = !config.pagesWithoutNavbar.includes(router.pathname);
    const showFooter = !config.pagesWithoutFooter.includes(router.pathname);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            {/* Conditional Navbar */}
            {showNavbar && <Navbar />}

            {/* Main content with consistent padding */}
            <main className="flex-grow">
                <Component {...pageProps} />
            </main>

            {/* Conditional Footer */}
            {showFooter && <Footer />}

            {/* Global Components */}
            <FloatingContactButton />

            {/* Toast Notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    success: {
                        style: {
                            background: '#10B981',
                            color: 'white',
                        },
                        duration: 5000,
                        iconTheme: {
                            primary: 'white',
                            secondary: '#10B981',
                        },
                    },
                    error: {
                        style: {
                            background: '#EF4444',
                            color: 'white',
                        },
                        duration: 5000,
                        iconTheme: {
                            primary: 'white',
                            secondary: '#EF4444',
                        },
                    },
                    loading: {
                        style: {
                            background: '#3B82F6',
                            color: 'white',
                        },
                    },
                    default: {
                        style: {
                            background: '#1F2937',
                            color: 'white',
                        },
                    },
                    style: {
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    },
                }}
            />
        </div>
    );
}

export default MyApp;