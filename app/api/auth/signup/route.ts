// /app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { pseudo, email, password } = await request.json();

    // Validation
    if (!email || !password || !pseudo) {
      return NextResponse.json(
        { message: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findFirst({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Cet email est déjà utilisé' },
        { status: 400 }
      );
    }

    // Hachage du mot de passe
    const hashedPassword = await hashPassword(password);

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        pseudo,
        email,
        password: hashedPassword
      }
    });

    return NextResponse.json({
      message: 'Inscription réussie',
      user: {
        id: user.id,
        email: user.email,
        pseudo: user.pseudo
      }
    });

  } catch (error) {
    console.error('Erreur lors de linscription:', error);
    return NextResponse.json(
      { message: 'Erreur lors de linscription' },
      { status: 500 }
    );
  }
}