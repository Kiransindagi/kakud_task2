"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [user, setUser] = useState<{ name?: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/signin');
        } else {
            // Decode token or fetch user info if needed
            setUser({ name: 'User' }); // Placeholder
        }
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p>Welcome, {user?.name}</p>
            <button
                onClick={() => {
                    localStorage.removeItem('token');
                    router.push('/signin');
                }}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
                Sign Out
            </button>
        </div>
    );
}
