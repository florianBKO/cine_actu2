import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('movieId');
  const type = searchParams.get('type');
  const userId = parseInt(searchParams.get('idUser') || '', 10);

  if (!id || isNaN(parseInt(id)) || !userId) {
    return NextResponse.json({ error: 'Paramètres invalides' }, { status: 400 });
  }

  if (!type) {
    return NextResponse.json({ error: 'Le paramètre type est requis' }, { status: 400 });
  }

  try {
    const existingFavorie = await prisma.favorie.findUnique({
      where: {
        userId_id_movie: {
          userId,
          id_movie: parseInt(id),
        },
      },
    });

    if (existingFavorie) {
      const newState = existingFavorie.state === 'active' ? 'inactive' : 'active';
      await prisma.favorie.update({
        where: {
          userId_id_movie: {
            userId,
            id_movie: parseInt(id),
          },
        },
        data: {
          state: newState,
          type,
        },
      });

      return NextResponse.json({ message: `Favori ${newState === 'active' ? 'ajouté' : 'supprimé'}` });
    }

    await prisma.favorie.create({
      data: {
        id_movie: parseInt(id),
        state: 'active',
        userId,
        type,
      },
    });

    return NextResponse.json({ message: 'Favori ajouté' });

  } catch (error: any) {
    console.error('Erreur serveur:', error);
    return NextResponse.json({ error: 'Erreur du serveur', details: error.message }, { status: 500 });
  }
}
