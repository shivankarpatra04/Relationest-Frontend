import PublicHeader from '../components/PublicHeader';

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <PublicHeader links={[{ label: 'Back to App', path: '/main', primary: true }]} />

            <main className="container mx-auto max-w-3xl flex-grow px-4 py-12">
                <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-slate-900">Privacy <span className="text-gradient">Policy</span></h1>
                <div className="card-glass prose prose-slate max-w-none p-8 prose-headings:font-semibold prose-h2:text-xl">
                    <p className="text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
                    <p className="text-slate-600">Welcome to RelatioNest. We are committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, store, and protect your information when you use our services.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
                    <p className="text-slate-600">We collect information that you voluntarily provide to us when you:</p>
                    <ul className="list-disc ml-6 text-slate-600">
                        <li>Create an account</li>
                        <li>Use our services</li>
                        <li>Contact our support team</li>
                        <li>Participate in surveys or promotions</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
                    <p className="text-slate-600">We use your information to:</p>
                    <ul className="list-disc ml-6 text-slate-600">
                        <li>Provide and maintain our services</li>
                        <li>Improve and personalize your experience</li>
                        <li>Communicate with you about updates and changes</li>
                        <li>Ensure the security of our platform</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
                    <p className="text-slate-600">We implement industry-standard security measures to protect your personal information. This includes encryption, secure servers, and regular security assessments. However, no method of transmission over the internet is 100% secure.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Sharing and Third Parties</h2>
                    <p className="text-slate-600">We do not sell your personal information. We may share your data with:</p>
                    <ul className="list-disc ml-6 text-slate-600">
                        <li>Service providers who assist in operating our platform</li>
                        <li>Law enforcement when required by law</li>
                        <li>Third parties with your explicit consent</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
                    <p className="text-slate-600">You have the right to:</p>
                    <ul className="list-disc ml-6 text-slate-600">
                        <li>Access your personal data</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Withdraw consent at any time</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">7. Cookies and Tracking</h2>
                    <p className="text-slate-600">We use cookies and similar tracking technologies to improve your experience. You can control cookie settings through your browser preferences.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to This Policy</h2>
                    <p className="text-slate-600">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the “Last updated” date.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
                    <p className="text-slate-600">If you have questions about this Privacy Policy, please contact us at:</p>
                    <p className="text-slate-600">Email: privacy@relationest.com</p>
                    <p className="text-slate-600">Address: [Your Company Address]</p>
                </div>
            </main>
        </div>
    );
}