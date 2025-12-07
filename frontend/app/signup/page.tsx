"use client";
import { useState } from 'react';
import api from '../../utils/api';
import { useRouter } from 'next/navigation';
import { useGoogleLogin } from '@react-oauth/google';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post('/auth/signup', { email, password, name });
            router.push('/signin');
        } catch (error) {
            alert('Signup failed');
            console.error(error);
            setIsLoading(false);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await api.post('/auth/google', { token: tokenResponse.access_token });
                localStorage.setItem('token', userInfo.data.token);
                window.location.href = 'https://nbro-landing-page.vercel.app/';
            } catch (err) {
                console.error(err);
                alert('Google Sign Up Failed');
            }
        },
        onError: () => console.log('Login Failed'),
    });

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            {/* Left Section - Branding */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 h-full bg-gradient-to-br from-green-900 via-green-800 to-black p-12 text-white relative overflow-hidden">
                {/* Abstract Background Design Elements */}
                <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center space-x-2 text-green-200 mb-8">
                        <span className="text-xs font-semibold tracking-widest uppercase">A Wise Quote</span>
                        <div className="h-px w-16 bg-green-200 opacity-50"></div>
                    </div>
                </div>

                <div className="relative z-10 mb-20">
                    <h1 className="text-6xl font-serif font-medium leading-tight mb-6">
                        National Bio <br /> Research Organization
                    </h1>
                    <p className="text-xl text-green-100 font-light mb-8">
                        Innovating for a Greener Future
                    </p>
                    <div className="text-sm font-medium tracking-wide text-green-300">
                        Advancing Science, Protecting Nature
                    </div>
                    <p className="mt-8 text-green-200/60 text-sm max-w-md leading-relaxed">
                        You can achieve everything you want if you work hard, trust the process, and stick to the plan.
                    </p>
                </div>
            </div>

            {/* Right Section - Sign Up Form */}
            <div className="w-full lg:w-1/2 h-full overflow-y-scroll bg-white">
                <div className="min-h-full flex flex-col justify-start pt-24 lg:pt-32 p-12 lg:px-24 pb-12 relative">
                    <div className="absolute top-12 right-12 flex items-center space-x-2 text-gray-600 font-semibold">
                        {/* Placeholder Logo */}
                        <div className="w-6 h-6 bg-green-800 rounded-full flex items-center justify-center text-white text-xs">N</div>
                        <span>NBRO</span>
                    </div>

                    <div className="max-w-md w-full mx-auto">
                        <h2 className="text-4xl font-serif font-medium text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-500 mb-10 text-sm">Join us to access exclusive features content</p>

                        <form onSubmit={handleSignup} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        placeholder="Create a password"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                            >
                                {isLoading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => googleLogin()}
                                className="mt-6 w-full flex justify-center items-center py-3 px-4 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
                            >
                                <svg className="h-5 w-5 mr-2" aria-hidden="true" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Sign up with Google
                            </button>
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Already have an account? <a href="/signin" className="font-medium text-gray-900 hover:text-green-700">Sign In</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
