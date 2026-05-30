import { useRouter } from 'next/router';
import { Heart, Mail, Phone } from 'lucide-react';

const Footer = () => {
    const router = useRouter();

    const links = [
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' },
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'FAQ', path: '/faq' },
    ];

    return (
        <footer className="relative z-10 mt-16 border-t border-slate-800 bg-slate-900 text-slate-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 text-white">
                                <Heart className="h-5 w-5 fill-white" />
                            </span>
                            <span className="text-xl font-bold text-white">RelatioNest</span>
                        </div>
                        <p className="max-w-xs text-sm text-slate-400">
                            Empowering stronger connections through understanding and personalized guidance.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">Quick Links</h3>
                        <ul className="grid grid-cols-2 gap-2">
                            {links.map(({ label, path }) => (
                                <li key={path}>
                                    <button onClick={() => router.push(path)} className="text-sm text-slate-400 transition-colors hover:text-white">
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">Contact Us</h3>
                        <a href="mailto:shivankar.patra.official@gmail.com" className="mb-2 flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white">
                            <Mail className="h-4 w-4" /> shivankar.patra.official@gmail.com
                        </a>
                        <a href="tel:+919818086303" className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white">
                            <Phone className="h-4 w-4" /> +91-9818086303
                        </a>
                    </div>
                </div>

                <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} RelatioNest. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
