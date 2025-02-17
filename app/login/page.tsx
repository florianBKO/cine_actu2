// /app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { setUser } = useAuth(); // Récupérer setUser pour mettre à jour l'état global

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PATH_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Une erreur est survenue');
      }
      const data = await res.json(); // Récupérer les données utilisateur
      setUser(data.user); // Mettre à jour le contexte avec l'utilisateur connecté
      router.push('/');
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
<>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
<div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse card border-2 border-solid border-primary m-2 text-base-content">
    <div className="text-center lg:text-left ">
      <h1 className="text-5xl font-bold ">Connectez-vous maintenant !</h1>
      <p className="py-6 hidden sm:block ">
        Découvrez des fonctionnalités exclusives en vous connectant. Récupérez vos informations
        et gérez vos préférences en toute sécurité.
      </p>
    <div className='flex justify-center '>
            <video className="w-[360px] sm:w-[450px] aspect-video rounded-lg shadow-lg my-2" autoPlay muted loop>
  <source src={`${process.env.NEXT_PUBLIC_PATH_URL}/intro.mp4`} type="video/mp4" />
  Votre navigateur ne supporte pas la vidéo.
</video>
    </div>

    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border-2 border-solid border-primary">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Mot de passe</span>
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Mot de passe oublié ?</a>
           </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Se connecter</button>
        </div>
      </form>
    </div>
  </div>
</div>


</>









  );
}