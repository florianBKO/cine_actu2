'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAlert } from '@/contexts/Alert';
import Link from 'next/link';

export default function LoginPage() {
  const { setUser } = useAuth();
  const { addAlert } = useAlert(); // Ajouter le hook useAlert
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
 // Valeurs par défaut si les champs sont vides
 const defaultEmail = 'test@hotmail.fr';
 const defaultPassword = 'test@hotmail.fr';
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PATH_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email || defaultEmail,
          password: password || defaultPassword,
         }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Une erreur est survenue');
      }
      
      const data = await res.json();
      setUser(data.user);
      addAlert('Connexion réussie!', 'success'); // Ajouter une alerte de succès
      router.push('/');
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
      addAlert(err.message, 'error'); // Ajouter une alerte d'erreur
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
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Connectez-vous maintenant !</h1>

           
            <p className="py-6 hidden sm:block">
              Découvrez des fonctionnalités exclusives en vous connectant. Récupérez vos informations
              et gérez vos préférences en toute sécurité.
            </p>
            <div className='flex justify-center'>
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
                  placeholder='test@hotmail.fr'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 placeholder"
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mot de passe</span>
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder='test@hotmail.fr'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 placeholder "
                />
                <label className="label flex justify-between">
                  <a href="#" className="label-text-alt link link-hover text-primary">
                    Mot de passe oublié ?
                  </a>
                </label>
              </div>
              
              <div className="form-control mt-6 space-y-4">
                <button className="btn btn-primary w-full">Se connecter</button>
                <button className="btn btn-primary w-full">Compte Test</button>
                <div className="text-center">
                  <span className="text-sm">Pas encore de compte ?</span>
                  <Link 
                    href="/signup" 
                    className="text-sm text-primary hover:text-primary-focus ml-2 link link-hover"
                  >
                    S'inscrire
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
