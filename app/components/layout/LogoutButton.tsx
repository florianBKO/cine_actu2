'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Power } from 'lucide-react';
import { useAlert } from '@/contexts/Alert';

export default function LogoutButton() {
  const { setUser } = useAuth(); // Récupérer setUser pour mettre à jour l'état global
  const router = useRouter();
  const { addAlert } = useAlert(); // Ajouter le hook useAlert

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_PATH_URL}/api/auth/logout`, { method: 'POST' });

      setUser(null); // Mettre à jour le contexte pour que l'UI réagisse immédiatement
      addAlert('deconnexion réussie!', 'warning'); // Ajouter une alerte de succès

      await router.push('/login'); // Rediriger
      router.refresh(); // Actualiser la page pour recharger les données
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 rounded-full" title="Déconnexion">
       <Power />  
    </button>
  );
}
