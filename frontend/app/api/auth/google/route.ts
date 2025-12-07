import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
    try {
        const { token } = await req.json();

        // Fetch user info using the access token
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            return NextResponse.json({ message: 'Invalid Google token' }, { status: 400 });
        }

        const payload = await response.json();

        if (!payload || !payload.email) {
            return NextResponse.json({ message: 'Invalid Google token payload' }, { status: 400 });
        }

        const email = payload.email;
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            const hashedPassword = await bcrypt.hash(Math.random().toString(36), 10);
            user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name: payload.name || 'Google User',
                },
            });
        }

        const jwtToken = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        return NextResponse.json({ token: jwtToken, userId: user.id, name: user.name }, { status: 200 });

    } catch (error) {
        console.error('Google signin error:', error);
        return NextResponse.json({ message: 'Google signin failed', error: String(error) }, { status: 500 });
    }
}
