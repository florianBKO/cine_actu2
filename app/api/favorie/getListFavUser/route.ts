import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assure-toi que prisma est bien configuré dans lib/prisma.ts

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = parseInt(searchParams.get('idUser') || '', 10);

  // Vérifie si le userId est valide
  if (isNaN(userId)) {
    return NextResponse.json({ error: 'idUser invalide' }, { status: 400 });
  }

  try {
    // Récupérer tous les favoris de l'utilisateur
    const favoris = await prisma.favorie.findMany({
      where: {
        userId: userId, // Filtrer par userId
        state: 'active',   // Filtrer par l'état "active"
      },
    });
    if (favoris.length === 0) {
      return NextResponse.json({ message: 'Aucun favori trouvé pour cet utilisateur' }, { status: 404 });
    }

    return NextResponse.json(favoris); // Retourner tous les favoris
  } catch (error) {
    return NextResponse.json({ error: 'Erreur du serveur' }, { status: 500 });
  }
}
