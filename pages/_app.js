// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
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

    // Authentication check
    useEffect(() => {
        const handleRouteChange = (url) => {
            const path = url.split('?')[0];
            if (!config.publicPaths.includes(path) && !isAuthenticated()) {
                // Display the message using react-hot-toast
                toast.error(`You have to login to see ${path.slice(1)}`, {
                    duration: 3000,
                    position: 'top-center',
                    onClose: () => {
                        router.push('/login');
                    },
                });
            }
        };
        // Check authentication on route change
        router.events.on('routeChangeStart', handleRouteChange);

        // Check authentication on initial load
        if (!config.publicPaths.includes(router.pathname) && !isAuthenticated()) {
            // Display the message using react-hot-toast
            toast.error(`You have to login to see ${router.pathname.slice(1)}`, {
                duration: 3000,
                position: 'top-center',
                onClose: () => {
                    router.push('/login');
                },
            });
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
        </div>
    );
}

export default MyApp;