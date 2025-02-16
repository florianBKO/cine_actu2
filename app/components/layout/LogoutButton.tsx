'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LogoutButton() {
  const { setUser } = useAuth(); // Récupérer setUser pour mettre à jour l'état global
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_PATH_URL}/api/auth/logout`, { method: 'POST' });

      setUser(null); // Mettre à jour le contexte pour que l'UI réagisse immédiatement

      await router.push('/login'); // Rediriger
      router.refresh(); // Actualiser la page pour recharger les données
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
    >
      Déconnexion
    </button>
  );
}
