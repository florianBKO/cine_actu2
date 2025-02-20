'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Card from './components/ui/Card';
import Carousel from './components/ui/Carousel';
import { ArrowBigDown, Loader2 } from 'lucide-react';
import { Movie } from '@/app/prototypes';
import InputSearchMovies from './components/ui/InputSearch';
import FetchError from './components/ui/FetchError';
import { useAuth } from '@/contexts/AuthContext';

interface CarouselItem {
  poster_path: string;
}

interface MovieData {
  results: Movie[];
}

function HomeContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [categorie, setCategorie] = useState(searchParams.get('categorie') || 'les plus populaire');
  const [type, setType] = useState(searchParams.get('type') || 'movie');

  // Fonction pour charger les favoris
  const fetchFavorites = async () => {
    if (!user?.id) {
      setFavorites([]);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PATH_URL}/api/favorie/getListFavUser?idUser=${user.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error('Erreur lors de la récupération des favoris');
      const data = await response.json();
      setFavorites(data.map((fav: any) => fav.id_movie));
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris:', error);
      setFavorites([]);
    }
  };

  // Fonction pour charger les films
  const fetchMovies = async (currentPage: number, isLoadingMore = false) => {
    if (!isLoadingMore) {
     // setIsInitialLoading(true);
    } else {
      setIsLoadingMore(true);
    }
 

    
    try {
      const url = search
        ? `api/${type}?categorie=search&query=${search}&page=${currentPage}`
        : `${process.env.NEXT_PUBLIC_PATH_URL}/api/${type}?categorie=${categorie}&page=${currentPage}`;

      const response = await fetch(url, {
        headers: {
          'Cache-Control': 'max-age=3600',
        },
      });

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const data: MovieData = await response.json();

      if (currentPage === 1) {
        setMovies(data.results);
        setCarouselItems(
          data.results.map(movie => ({
            poster_path: movie.poster_path,
          }))
        );
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
      console.error('Erreur lors de la récupération des films:', error);
    } finally {
     // setIsInitialLoading(false);
      setIsLoadingMore(false);
    }
  };

  // Effet pour les changements de searchParams
  useEffect(() => {
    const newCategorie = searchParams.get('categorie') || 'les plus populaire';
    const newType = searchParams.get('type') || 'movie';

    if (newCategorie !== categorie || newType !== type) {
      setCategorie(newCategorie);
      setType(newType);
      setMovies([]);
      setPage(1);
      setSearch(null);
    }
  }, [searchParams, categorie, type]);

  // Effet initial pour charger les données
  useEffect(() => {
    const initialLoad = async () => {
      setIsInitialLoading(true);
      await Promise.all([
        fetchFavorites(),
        fetchMovies(1)
      ]);
      setIsInitialLoading(false);
    };

    initialLoad();
  }, [user?.id, categorie, type, search]);

  // Effet pour charger plus de films
  useEffect(() => {
    if (page > 1) {
      fetchMovies(page, true);
    }
  }, [page]);

  const addPage = () => {
    setPage(prev => prev + 1);
  };

  const handleSearch = (newSearch: string | null) => {
    setSearch(newSearch);
    setPage(1);
    setMovies([]);
  };

  if (error) {
    return <FetchError error={error} />;
  }

  return (
    <div>
      <header className="mb-8">
        <InputSearchMovies search={search} setSearch={handleSearch} setMovie={setMovies} />
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text bg-gradient-to-r text-base-content">
          Découvrez les Films {categorie}
        </h1>
      </header>

      {isInitialLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        </div>
      ) : (
        <>
          <section className="mb-12">
            <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-solid border-primary">
              <Carousel DataCarousel={carouselItems} />
            </div>
          </section>

          <section>
            <div className="mx-auto p-4 flex flex-wrap justify-center gap-5">
              {movies.map(movie => (
                <Card
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  poster_path={movie.poster_path}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                  favorite={favorites.includes(movie.id)                 
                  }  type={type}
                />
              ))}
            </div>
          </section>

          <div className="flex justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={addPage}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <ArrowBigDown />
                  Suivant
                  <ArrowBigDown />
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[50vh]">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            </div>
          }
        >
          <HomeContent />
        </Suspense>
      </main>
    </div>
  );
}