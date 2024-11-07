// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import Footer from '../components/Footer';
import FloatingContactButton from '../components/FloatingContactButton';
import Navbar from '../components/Navbar'; // Import the Navbar component
import { isAuthenticated } from '../utils/auth'; // Import auth utility

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const publicPaths = ['/login', '/register', '/', '/about', '/faq']; // Add all public paths

    useEffect(() => {
        // Handle authentication on route changes
        const handleRouteChange = (url) => {
            const path = url.split('?')[0];
            if (!publicPaths.includes(path)) {
                if (!isAuthenticated()) {
                    router.push('/login');
                }
            }
        };

        router.events.on('routeChangeStart', handleRouteChange);

        // Check authentication on initial load
        if (!publicPaths.includes(router.pathname) && !isAuthenticated()) {
            router.push('/login');
        }

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router, publicPaths]);

    // Determine if we should show the Navbar
    const showNavbar = !publicPaths.includes(router.pathname) ||
        (router.pathname !== '/login' && router.pathname !== '/register');

    return (
        <div className="flex flex-col min-h-screen">
            {/* Show Navbar conditionally */}
            {showNavbar && <Navbar />}

            {/* Main content */}
            <main className="flex-grow">
                <Component {...pageProps} />
            </main>

            {/* Global components */}
            <FloatingContactButton />
            <Footer />

            {/* Toast notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    success: {
                        style: {
                            background: '#10B981',
                            color: 'white',
                        },
                    },
                    error: {
                        style: {
                            background: '#EF4444',
                            color: 'white',
                        },
                    },
                    duration: 5000,
                    style: {
                        borderRadius: '8px',
                        padding: '16px',
                    },
                }}
            />
        </div>
    );
}

export default MyApp;