// client/pages/_app.js
import '../styles/globals.css';
import Footer from '../components/Footer';
import FloatingContactButton from '../components/FloatingContactButton'; // Only import global CSS here

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <FloatingContactButton />
            <Footer />
        </>
    );
}
export default MyApp;
