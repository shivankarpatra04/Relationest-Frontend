import { useRouter } from 'next/router';

const FloatingContactButton = () => {
    const router = useRouter();

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <button
                onClick={() => router.push('/contact')}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Contact Support</span>
            </button>
        </div>
    );
};

export default FloatingContactButton;