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
        pagesWithoutNavbar: ['/', '/login', '/register', '/about', '/faq', '/privacy', '/ChatHistory'],

        // Pages that shouldn't show the footer
        pagesWithoutFooter: ['/']
    };

    useEffect(() => {
        const handleRouteChange = (url) => {
            const path = url.split('?')[0];
            if (!config.publicPaths.includes(path)) {
                handleProtectedRoute(path);
            }
        };

        // Check authentication on route change
        router.events.on('routeChangeStart', handleRouteChange);

        // Check authentication on initial load
        if (!config.publicPaths.includes(router.pathname)) {
            handleProtectedRoute(router.pathname);
        }

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router, config.publicPaths]);

    // Layout visibility checks
    const showNavbar = !config.pagesWithoutNavbar.includes(router.pathname);
    const showFooter = !config.pagesWithoutFooter.includes(router.pathname);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            {showNavbar && <Navbar />}

            <main className="flex-grow">
                <Component {...pageProps} />
            </main>

            {showFooter && <Footer />}

            <FloatingContactButton />

            <Toaster
                position="top-right"
                toastOptions={{
                    success: {
                        style: {
                            background: '#10B981',
                            color: 'white',
                        },
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
                        iconTheme: {
                            primary: 'white',
                            secondary: '#EF4444',
                        },
                    },
                    duration: 3000,
                    style: {
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    },
                }}
            />
        </div>
    );
}

export default MyApp;