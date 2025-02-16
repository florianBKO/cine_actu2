import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assure-toi que prisma est bien configuré dans lib/prisma.ts

export async function GET(request: Request) {
  console.log('test fav');


  const { searchParams } = new URL(request.url);
  const id = searchParams.get('movieId');
  const userId = parseInt(searchParams.get('idUser') || '', 10);
  try {
    // Vérifier si ce film est déjà dans les favoris
    const existingFavorie = await prisma.favorie.findUnique({
      where: {
        userId_id_movie: {
          userId,
          id_movie: parseInt(id as string),
        },
      },
    });

    if (existingFavorie) {
      // Si le film est déjà dans les favoris, on peut soit le supprimer, soit mettre à jour son état
      const newState = existingFavorie.state === 'active' ? 'inactive' : 'active';

      await prisma.favorie.update({
        where: {
          userId_id_movie: {
            userId,
            id_movie: parseInt(id as string),
          },
        },
        data: {
          state: newState,
        },
      });

      return NextResponse.json({ message: `Favori ${newState === 'active' ? 'ajouté' : 'supprimé'}` });
    }

    // Sinon, on l'ajoute aux favoris
    await prisma.favorie.create({
      data: {
        id_movie: parseInt(id as string),
        state: 'active', // ou 'inactive' en fonction de ton modèle
        userId,
      },
    });

    return NextResponse.json({ message: 'Favori ajouté' });

  } catch (error) {
    return NextResponse.json({ error: 'Erreur du serveur' }, { status: 500 });
  }
}
