'use client'

import { useState } from 'react';
import logoSite from '@/public/logo.webp';
import Image from 'next/image';
import { FileText } from 'lucide-react';

export default function Nav() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const menuItems = [
    {
      name: 'Film',
      subItems: ['Populaire', 'Du moment', 'A venir', 'Les mieux evalués']
    },
    {
      name: 'Émissions télévisées',
      subItems: ['Populaire', 'Diffusées aujourd\'hui', 'En cours de diffusion', 'Les mieux evalués']
    },
    {
      name: 'Artistes',
      subItems: ['Populaire']
    }
  ];

  const handleAccordionClick = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="drawer z-50">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
 <div className="navbar bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
  <div className="container mx-auto flex items-center justify-between">
    
    {/* Mobile menu button */}
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

    {/* Logo (aligné à gauche) */}
    <div className="flex-none w-24">
      <Image
        width={48}
        height={48}
        src={logoSite}
        alt="logo lego"
        className="rounded-full hover:scale-105 transition-transform duration-200"
      />
    </div>

    {/* Desktop menu (au centre) */}
    <div className="hidden lg:flex flex-1 justify-center">
      <ul className="menu menu-horizontal px-1">
        {menuItems.map((item, index) => (
          <li key={index} className="dropdown dropdown-hover mx-2">
            <div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost rounded-btn text-white hover:bg-blue-700"
            >
              {item.name}
            </div>
            <ul className="dropdown-content z-[100] menu p-2 shadow-lg bg-white rounded-box w-52">
              {item.subItems.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <a className="py-2 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
                    {subItem}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>

    {/* Documentation button (aligné à droite) */}
    <div className="flex-none">
      <button className="btn btn-sm btn-outline text-white hover:bg-blue-700 flex items-center gap-2">
        Documentation
        <FileText className="w-4 h-4" />
      </button>
    </div>

  </div>
</div>
      </div>

      {/* Drawer sidebar */}
      <div className="drawer-side z-[999]">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content */}
          <div className="mt-4 space-y-2">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="collapse collapse-arrow border border-base-300 bg-base-200"
              >
                <input
                  type="radio"
                  name="sidebar-accordion"
                  checked={activeAccordion === index}
                  onChange={() => handleAccordionClick(index)}
                />
                <div className="collapse-title text-lg font-medium">
                  {item.name}
                </div>
                <div className="collapse-content">
                  <ul className="menu menu-sm">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <a className="py-2 hover:bg-base-300 transition-colors duration-200">
                          {subItem}
                        </a>
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