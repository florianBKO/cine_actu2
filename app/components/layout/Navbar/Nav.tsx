'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FilePen, FileText, LogIn } from 'lucide-react';
import Darkmode from '@/app/components/ui/Darkmode';
import LogoutButton from '../LogoutButton';
import { useAuth } from '@/contexts/AuthContext';
import logoSite from '@/public/logo.png';

// Types
interface MenuItem {
  name: string;
  subItems: string[];
  link: string[];
  requiresAuth?: boolean;
}

interface NavLinkProps {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

// Constantes
const MENU_ITEMS: MenuItem[] = [
  {
    name: 'Films',
    subItems: ['Populaire', 'Du moment', 'A venir', 'Les mieux evalués'],
    link: [
      '/?type=movie&categorie=les%20plus%20populaire',
      '/?type=movie&categorie=du%20moment',
      '/?type=movie&categorie=a%20venir',
      '/?type=movie&categorie=Les%20mieux%20evalues',
    ],
  },
  {
    name: 'Émissions télévisées',
    subItems: ['Populaire', 'Diffusées aujourd\'hui', 'En cours de diffusion', 'Les mieux evalués'],
    link: [
      '/?type=serie&categorie=les%20plus%20populaire',
      '/?type=serie&categorie=Diffusées%20aujourdhui',
      '/?type=serie&categorie=En%20cours%20de%20diffusion',
      '/?type=serie&categorie=Les%20mieux%20évalués',
    ],
  },
  {
    name: 'Artistes',
    subItems: ['Populaire'],
    link: ['/acteur'],
  },
  {
    name: 'Favoris',
    subItems: ['Liste des favoris'],
    link: ['/favoris'],
    requiresAuth: true,
  },
];

// Composants réutilisables
const NavLink = ({ href, onClick, children, className = '', title }: NavLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`text-base-dark hover:bg-gray-400 transition-colors duration-200 ${className}`}
    title={title}
  >
    {children}
  </Link>
);

const DocumentationButton = () => (
<Link 
  href="/documentation" 
  className="btn sm:btn-sm btn inline-flex items-center justify-start  px-5 py-3 sm:px-2 sm:py-2 text-base-content bg-base-200"
>
  <FileText className="w-4 h-4" />
  <span className="font-medium">Documentation</span>
</Link>

);

export default function Nav() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<Array<HTMLLIElement | null>>([]);
  const { user, userLoading } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown !== null && !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  const handleMobileLinkClick = () => {
    const drawerCheckbox = document.getElementById('my-drawer-3') as HTMLInputElement;
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
    setActiveAccordion(null);
  };

  const filteredMenuItems = MENU_ITEMS.filter(item => 
    !item.requiresAuth || (item.requiresAuth && user)
  );

  const renderAuthButtons = () => {
    if (userLoading) return <div>Chargement...</div>;

    if (user) {
      return (
        <div className="flex items-center">
          <span className="sm:mx-3"><Darkmode /></span>
          <LogoutButton />
        </div>
      );
    }

    return (
      <div className="flex items-center">
        <span className="sm:mx-3"><Darkmode /></span>
        <NavLink
          href="/login"
          title="Connexion"
          className="px-4 py-2 rounded-full border-2 border-black ml-3"
        >
          <LogIn />
        </NavLink>
        <NavLink
          href="/signup"
          title="Inscription"
          className="px-4 py-2 rounded-full border-2 border-black ml-3"
        >
          <FilePen />
        </NavLink>
      </div>
    );
  };

  const renderDesktopMenu = () => (
    <ul className="menu menu-horizontal px-1">
      {filteredMenuItems.map((item, index) => (
        <li
          key={index}
          ref={el => (dropdownRefs.current[index] = el)}
          className={`dropdown mx-2 ${activeDropdown === index ? 'dropdown-open' : ''}`}
        >
          <div
            role="button"
            className="btn btn-ghost rounded-btn hover:bg-gray-400"
            onClick={(e) => {
              e.stopPropagation();
              setActiveDropdown(activeDropdown === index ? null : index);
            }}
          >
            <span className="text-base-dark">{item.name}</span>
          </div>
          {activeDropdown === index && (
            <ul className="dropdown-content z-[100] menu p-2 shadow-lg bg-white rounded-box w-52">
              {item.subItems.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <NavLink
                    href={item.link[subIndex]}
                    onClick={() => setActiveDropdown(null)}
                    className="py-2"
                  >
                    {subItem}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );

  const renderMobileMenu = () => (
    <div className="menu p-4 w-80 min-h-full bg-base-200">
      <div className="mt-4 space-y-2">
        {filteredMenuItems.map((item, index) => (
          <div
            key={index}
            className={`collapse collapse-arrow border border-base-300 bg-base-200 ${
              activeAccordion === index ? 'collapse-open' : ''
            }`}
            onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
          >
            <div className="collapse-title text-lg font-medium">{item.name}</div>
            <div className="collapse-content">
              <ul className="menu menu-sm">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <NavLink
                      href={item.link[subIndex]}
                      onClick={handleMobileLinkClick}
                      className="py-2"
                    >
                      {subItem}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="flex-none collapse collapse-arrow border border-base-300 bg-base-200">
          <DocumentationButton />
        </div>
      </div>
    </div>
  );

  return (
    <div className="drawer z-50 info-content" id="topPage">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <nav className="navbar bg-primary shadow-lg">
          <div className="container mx-auto flex items-center justify-between text-base-dark">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>

            <div className="flex-none w-24">
              <NavLink href="/" className="py-2">
                <Image
                  width={58}
                  height={58}
                  src={logoSite}
                  alt="logo lego"
                  className="hover:scale-105 transition-transform duration-200 rounded-full"
                  priority
                />
              </NavLink>
            </div>

            <div className="hidden lg:flex flex-1 justify-center">
              {renderDesktopMenu()}
            </div>

            <div className="flex hidden sm:block">
              <DocumentationButton />
            </div>

            {renderAuthButtons()}
          </div>
        </nav>
      </div>

      <div className="drawer-side z-[999] text-base-content">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        {renderMobileMenu()}
      </div>
    </div>
  );
}