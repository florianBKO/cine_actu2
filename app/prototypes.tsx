export interface Movie {
    id: number;
    original_title: string;
    overview?: string;
    poster_path: string;
    backdrop_path: string;
    popularity: number;
    first_air_date: string;
    release_date: string;
    title: string;
    name : string;
    video: string;
    vote_count: number;
    runtime: number;
    vote_average: number;
    genres: Array<{ id: number; name: string }>;
    type : string
  }
  
export interface Actor {
    id: number;
    name: string;
    credit_id: string;
    character: string;
    profile_path: string;
    known_for_department: string;
  }
  
  export interface Trailer {
    key: string;
    name: string;
  }
  
  export interface CardProps {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    favorite: boolean;
    type:string;
  }
  
  export interface FavorieHeartProps {
    movieId: number;
    id: number | undefined; // Utilisateur connecté
    favorite: boolean;
    type :string ;
    onRefresh?: () => void; // Rendre cette prop optionnelle
  }
  
  export interface MenuItem {
    name: string;
    subItems: string[];
    link: string[];
    requiresAuth?: boolean;
  }
  
  export interface NavLinkProps {
    href: string;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    title?: string;
  }

  export interface ExternalIds {
    imdb_id?: string;
    wikidata_id?: string;
    facebook_id?: string;
    instagram_id?: string;
    twitter_id?: string;
  }