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

    // Pages that don't need authentication
    const publicPaths = ['/login', '/register', '/'];

    // Check if current page is index/home page
    const isHomePage = router.pathname === '/';

    useEffect(() => {
        const handleRouteChange = (url) => {
            const path = url.split('?')[0];
            if (!publicPaths.includes(path)) {
                if (!isAuthenticated()) {
                    router.push('/login');
                }
            }
        };

        router.events.on('routeChangeStart', handleRouteChange);

        if (!publicPaths.includes(router.pathname) && !isAuthenticated()) {
            router.push('/login');
        }

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router, publicPaths]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Show Navbar on all pages except index */}
            {!isHomePage && <Navbar />}

            {/* Main content */}
            <main className="flex-grow">
                <Component {...pageProps} />
            </main>

            {/* Show Footer on all pages except index */}
            {!isHomePage && <Footer />}

            {/* Always show FloatingContactButton */}
            <FloatingContactButton />

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