'use client';
import React, { createContext, useContext, useState } from "react";

// Types d'alertes possibles
type AlertType = "success" | "error" | "warning" | "info";

// Structure d'une alerte
interface Alert {
  id: number;
  message: string;
  type: AlertType;
}

// Contexte des alertes
interface AlertContextProps {
  alerts: Alert[];
  addAlert: (message: string, type?: AlertType) => void;
  removeAlert: (id: number) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Ajouter une alerte
  const addAlert = (message: string, type: AlertType = "info") => {
    const newAlert: Alert = {
      id: Date.now(), // ID unique basé sur le timestamp
      message,
      type,
    };

    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

    // Supprimer automatiquement après 5 secondes
    setTimeout(() => removeAlert(newAlert.id),1500);
  };

  // Supprimer une alerte
  const removeAlert = (id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
      <AlertContainer alerts={alerts} removeAlert={removeAlert} />
    </AlertContext.Provider>
  );
};

// Hook pour utiliser les alertes facilement
export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

// Composant d'affichage des alertes
const AlertContainer: React.FC<{ alerts: Alert[]; removeAlert: (id: number) => void }> = ({ alerts, removeAlert }) => {
  // Icônes en fonction du type d'alerte
  const alertIcons: Record<string, string> = {
    success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", // Check
    error: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z", // Croix
    warning: "M12 8v4m0 4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z", // Attention
    info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // Info
  };

  return (
                
<div className="fixed transform -translate-x-1/2 space-y-2 z-50" style={{ bottom: "1%", right: "0%"}}>
  {alerts.map((alert) => (
    <div
  role="alert"
  key={alert.id}
  className={`flex items-center shadow-lg alert ${
    alert.type === "error"
      ? "bg-red-500 text-white"
      : alert.type === "success"
      ? "bg-green-500 text-white"
      : alert.type === "warning"
      ? "bg-yellow-500 text-base-content"
      : "bg-blue-500 text-white"
  }`}
  style={{
    backgroundColor:
      alert.type === 'success'
        ? "rgba(0, 175, 53, 0.5)"  // couleur pour 'success'
        : alert.type === 'warning'
        ? "rgba(238, 86, 16, 0.5)"  // couleur pour 'warning'
        : "",  // autre cas (vide si aucune condition n'est remplie)
  }} // Appliquer la couleur rgba seulement pour 'success'
>
   {/* Icône dynamique */}
   <svg
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     viewBox="0 0 24 24"
     className="h-6 w-6 shrink-0 stroke-current"
   >
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={alertIcons[alert.type] || alertIcons.info}></path>
   </svg>
 
   {/* Message de l'alerte */}
   <span>{alert.message}</span>
 
   {/* Bouton de fermeture */}
   <button onClick={() => removeAlert(alert.id)} className="ml-4 btn btn-sm btn-ghost">
     ✖
   </button>
 </div>
  ))}
</div>

  );
};
