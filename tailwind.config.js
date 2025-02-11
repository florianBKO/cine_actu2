/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutre: {
          dark: "#1f2937",  // Couleur pour le mode sombre
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
 themes: [
  {
    light: {
      // Main colors
      "primary": "#fecc00",     // Indigo 500 - Vibrant but not too aggressive
      "primary-focus": "#4f46e5", // Indigo 600 - Darker shade for hover/focus
      "secondary": "#ec4899",   // Pink 500 - Playful accent
      "accent": "#14b8a6",      // Teal 500 - Fresh and modern
      
      // Base colors
      "base-100": "#ffffff",    // Pure white
      "base-200": "#f9fafb",    // Gray 50
      "base-300": "#f3f4f6",    // Gray 100
      "base-content": "#1f2937", // Gray 800 - Main text
      "base-dark": "#0f172a",    // Slate 900 - Deep background

      // Neutral shades
      "neutral": "#374151",     // Gray 700
      "neutral-focus": "#1f2937", // Gray 800
      
      // Semantic colors
      "info": "#0ea5e9",        // Sky 500 - Clear blue for information
      "success": "#10b981",     // Emerald 500 - Vibrant green
      "warning": "#f59e0b",     // Amber 500 - Warm yellow
      "error": "#ef4444",       // Red 500 - Clear red
      
      // Additional colors
      "muted": "#6b7280",       // Gray 500 - For less important text
      "surface": "#f8fafc"      // Slate 50 - Alternative background
    },
    
    dark: {
      // Main colors
      "primary": "#fecc00",     // Indigo 500 - Vibrant but not too aggressive
      "primary-focus": "#6366f1", // Indigo 500 - For hover/focus
      "secondary": "#f472b6",   // Pink 400 - Softer pink for dark mode
      "accent": "#2dd4bf",      // Teal 400 - Brighter teal
      
      // Base colors
      "base-100": "#0f172a",    // Slate 900 - Deep background
      "base-200": "#1e293b",    // Slate 800
      "base-300": "#334155",    // Slate 700
      "base-content": "#f8fafc", // Slate 50 - Main text
      "base-dark": "#0f172a",    // Slate 900 - Deep background

      // Neutral shades
      "neutral": "#cbd5e1",     // Slate 300
      "neutral-focus": "#e2e8f0", // Slate 200
      
      // Semantic colors
      "info": "#38bdf8",        // Sky 400 - Brighter blue
      "success": "#34d399",     // Emerald 400 - Brighter green
      "warning": "#fbbf24",     // Amber 400 - Brighter yellow
      "error": "#f87171",       // Red 400 - Softer red
      
      // Additional colors
      "muted": "#94a3b8",       // Slate 400 - For less important text
      "surface": "#1e293b"      // Slate 800 - Alternative background
    }
  }
    ]  },
};