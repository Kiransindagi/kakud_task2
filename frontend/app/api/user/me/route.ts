import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: Request) {
    const user = verifyAuth(req);

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const dbUser = await prisma.user.findUnique({
            where: { id: user.userId },
            select: { id: true, email: true, name: true, createdAt: true },
        });

        if (!dbUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(dbUser, { status: 200 });
    } catch (error) {
        console.error('Fetch user error:', error);
        return NextResponse.json({ message: 'Error fetching profile', error: String(error) }, { status: 500 });
    }
}
