import { useRouter } from 'next/router';
import { MessageCircle } from 'lucide-react';

const FloatingContactButton = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push('/contact')}
            className="group fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 p-4 text-white shadow-glow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            aria-label="Contact support"
        >
            <MessageCircle className="h-6 w-6" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[140px] group-hover:pr-1">
                Contact Support
            </span>
        </button>
    );
};

export default FloatingContactButton;
