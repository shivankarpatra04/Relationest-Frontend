// components/Layout.js
import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
}