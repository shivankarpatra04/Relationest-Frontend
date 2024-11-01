import { useRouter } from 'next/router';

const Footer = () => {
    const router = useRouter();

    return (
        <footer className="bg-slate-900 text-slate-200 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">RelatioNest</h3>
                        <p className="text-slate-400">Empowering stronger connections through understanding</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <button onClick={() => router.push('/about')} className="text-slate-400 hover:text-white transition-colors">
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button onClick={() => router.push('/contact')} className="text-slate-400 hover:text-white transition-colors">
                                    Contact
                                </button>
                            </li>
                            <li>
                                <button onClick={() => router.push('/privacy')} className="text-slate-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <p className="text-slate-400">shivankar.patra.official.com</p>
                        <p className="text-slate-400">+91-9818086303</p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
                    <p>© {new Date().getFullYear()} Relationship Advisor. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
