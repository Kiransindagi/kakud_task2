"use client";
import { useState } from 'react';
import api from '../../utils/api';
import { useGoogleLogin } from '@react-oauth/google';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await api.post('/auth/signin', { email, password });
            localStorage.setItem('token', res.data.token);
            // Redirect to external URL
            window.location.href = 'https://nbro-landing-page.vercel.app/';
        } catch (error) {
            alert('Signin failed');
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
                alert('Google Login Failed');
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

            {/* Right Section - Login Form */}
            <div className="w-full lg:w-1/2 h-full overflow-y-scroll bg-white">
                <div className="min-h-full flex flex-col justify-start pt-24 lg:pt-32 p-12 lg:px-24 pb-12 relative">
                    <div className="absolute top-12 right-12 flex items-center space-x-2 text-gray-600 font-semibold">
                        {/* Placeholder Logo */}
                        <div className="w-6 h-6 bg-green-800 rounded-full flex items-center justify-center text-white text-xs">N</div>
                        <span>NBRO</span>
                    </div>

                    <div className="max-w-md w-full mx-auto">
                        <h2 className="text-4xl font-serif font-medium text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-gray-500 mb-10 text-sm">Enter your email and password to access your account</p>

                        <form onSubmit={handleSignin} className="space-y-6">
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
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button type="button" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                    <input id="remember-me" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                                    <label htmlFor="remember-me" className="ml-2 block text-gray-500">Remember me</label>
                                </div>
                                <a href="#" className="font-medium text-gray-900 hover:text-green-700">Forgot Password</a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => googleLogin()}
                                className="w-full flex justify-center items-center py-3 px-4 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
                            >
                                <svg className="h-5 w-5 mr-2" aria-hidden="true" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Sign in with Google
                            </button>
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Don't have an account? <a href="/signup" className="font-medium text-gray-900 hover:text-green-700">Sign Up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
