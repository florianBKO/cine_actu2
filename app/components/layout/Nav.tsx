'use client';

import { useState, useRef, useEffect } from 'react';
import logoSite from '@/public/logo.png';
import Image from 'next/image';
import { FilePen, FileText, LogIn, LogOut } from 'lucide-react';
import Darkmode from '@/app/components/ui/Darkmode';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { useAuth } from '@/contexts/AuthContext';

export default function Nav() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<(HTMLLIElement | null)[]>([]);
  const { user, userLoading } = useAuth();

  const menuItems = [
    {
      name: 'Films',
      subItems: ['Populaire', 'Du moment', 'A venir', 'Les mieux evalués'],
      link: [
        `/?type=movie&categorie=les plus populaire`,
        `/?type=movie&categorie=du moment`,
        `/?type=movie&categorie=a venir`,
        `/?type=movie&categorie=Les mieux evalués`,
      ],
    },
    {
      name: 'Émissions télévisées',
      subItems: ['Populaire', 'Diffusées aujourd\'hui', 'En cours de diffusion', 'Les mieux evalués'],
      link: [
        `/?type=serie&categorie=les%20plus%20populaire`,
        `/?type=serie&categorie=Diffusées%20aujourdhui`,
        `/?type=serie&categorie=En%20cours%20de%20diffusion`,
        `/?type=serie&categorie=Les%20mieux%20évalués`,
      ],
    },
    {
      name: 'Artistes',
      subItems: ['Populaire'],
      link: [`/acteur`],
    },
    {
      name: 'Favoris',
      subItems: ['Liste des favoris'],
      link: [`/favoris`],
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (activeDropdown !== null) {
        const isClickInside = dropdownRefs.current[activeDropdown]?.contains(event.target as Node);
        if (!isClickInside) {
          setActiveDropdown(null);
        }
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  const handleAccordionClick = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleDropdownClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleMobileLinkClick = () => {
    const drawerCheckbox = document.getElementById('my-drawer-3') as HTMLInputElement;
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
    setActiveAccordion(null);
  };

  return (
    <div className="drawer z-50 info-content" id="topPage">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <div className="navbar bg-primary shadow-lg">
          <div className="container mx-auto flex items-center justify-between text-base-dark">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
            </div>

            <div className="flex-none w-24">
              <Link className="py-2" href={`/`}>
                <Image
                  width={58}
                  height={58}
                  src={logoSite}
                  alt="logo lego"
                  className="hover:scale-105 transition-transform duration-200 rounded-full"
                />
              </Link>
            </div>

            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="menu menu-horizontal px-1">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    ref={(el) => {
                      // On affecte simplement la référence sans la retourner
                      dropdownRefs.current[index] = el;
                    }}
                    className={`dropdown mx-2 ${activeDropdown === index ? 'dropdown-open' : ''}`}
                  >
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost rounded-btn hover:bg-gray-400"
                      onClick={(e) => handleDropdownClick(index, e)}
                    >
                      <span className="text-base-dark">{item.name}</span>
                    </div>
                    {activeDropdown === index && (
                      <ul className="dropdown-content z-[100] menu p-2 shadow-lg bg-white rounded-box w-52">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              className="py-2 hover:bg-gray-400"
                              href={item.link[subIndex]}
                              onClick={() => setActiveDropdown(null)}
                            >
                              {subItem}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-none">
              <button className="btn btn-sm hover:bg-base-dark flex items-center gap-2">
                <Link className="text-base-dark" href={`/documentation`}>
                  Documentation
                </Link>
                <FileText className="w-4 h-4" />
              </button>
            </div>
            <span className='sm:mx-3'><Darkmode /></span>
            {userLoading ? (
              <div>Chargement...</div>
            ) : user ? (
              <>
           < LogoutButton/>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  title='Connexion'
                  className="text-base-dark px-4 py-2 rounded-full border-2 border-solid border-black ml-3"
                >
                  <LogIn />
                </Link>
                <Link
                  href="/signup"
                  title='Inscription'
                  className="text-base-dark px-4 py-2  px-4 py-2 rounded-full border-2 border-solid border-black ml-3"
                >
                  <FilePen />        
                          </Link>
              </>
            )}

          </div>
        </div>
      </div>

      {/* Mobile drawer avec accordéon */}
      <div className="drawer-side z-[999] text-base-content">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200">
          <div className="mt-4 space-y-2">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`collapse collapse-arrow border border-base-300 bg-base-200 ${activeAccordion === index ? 'collapse-open' : ''}`}
                onClick={() => handleAccordionClick(index)}
              >
                <div className="collapse-title text-lg font-medium">{item.name}</div>
                <div className="collapse-content">
                  <ul className="menu menu-sm">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          className="py-2 hover:bg-gray-400"
                          href={item.link[subIndex]}
                          onClick={handleMobileLinkClick}
                        >
                          {subItem}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
