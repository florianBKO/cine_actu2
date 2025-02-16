export interface Movie {
    id: number;
    original_title: string;
    overview?: string;
    poster_path: string;
    backdrop_path: string;
    popularity: number;
    release_date: string;
    title: string;
    video: string;
    vote_count: number;
    runtime: number;
    vote_average: number;
    genres: Array<{ id: number; name: string }>;
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
  }
  
 
  