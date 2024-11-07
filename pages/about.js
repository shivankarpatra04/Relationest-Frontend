import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
            {/* Use shared Navbar component */}
            <Navbar />

            <main className="container mx-auto px-4 py-16 max-w-4xl flex-grow">
                <div className="space-y-16">
                    <section className="text-center">
                        <h1 className="text-4xl font-bold text-slate-800 mb-6">About RelatioNest</h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            RelatioNest is a cutting-edge AI-powered relationship advisory platform, committed to transforming how couples navigate their relationships in the digital age.
                        </p>
                    </section>

                    <section className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Mission</h2>
                            <p className="text-slate-600">
                                We are dedicated to empowering couples with personalized, AI-driven relationship guidance while maintaining the highest standards of privacy and ethical considerations. Our goal is to make professional relationship advice accessible to everyone, anywhere.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Vision</h2>
                            <p className="text-slate-600">
                                To revolutionize relationship counseling by seamlessly blending artificial intelligence with human psychology, creating a future where every couple has the tools they need to build stronger, healthier relationships.
                            </p>
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Our Core Values</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <h3 className="font-semibold text-slate-800 mb-2">Innovation</h3>
                                <p className="text-slate-600">Continuously evolving our AI technology to provide cutting-edge relationship guidance</p>
                            </div>
                            <div className="text-center">
                                <h3 className="font-semibold text-slate-800 mb-2">Privacy</h3>
                                <p className="text-slate-600">Ensuring the highest level of data protection and confidentiality for our users</p>
                            </div>
                            <div className="text-center">
                                <h3 className="font-semibold text-slate-800 mb-2">Accessibility</h3>
                                <p className="text-slate-600">Making professional relationship advice available to everyone, everywhere</p>
                            </div>
                        </div>
                    </section>

                    <section className="text-center">
                        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Our Approach</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-16">
                            We combine advanced AI technology with established relationship psychology principles to deliver personalized guidance that addresses the unique challenges each couple faces. Our platform adapts and learns to provide increasingly relevant advice over time.
                        </p>
                    </section>
                </div>
            </main>

            {/* Add Footer */}
            <Footer />
        </div>
    );
}