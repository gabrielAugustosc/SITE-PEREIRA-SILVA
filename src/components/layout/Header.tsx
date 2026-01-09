import { Scale, Menu, X } from 'lucide-react';
import { useState } from 'react';
import LetrasLogo from '/assets/LetrasLogo.png';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Início' },
    { id: 'about', label: 'Sobre' },
    { id: 'areas', label: 'Áreas de Atuação' },
    { id: 'team', label: 'Equipe' },
    { id: 'contact', label: 'Contato' }
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    
    // Scroll to section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-[#5E0D13] text-white sticky top-0 z-50 shadow-lg border-b-2 border-[#AC8B57]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleNavClick('home')}>
            <img 
              src={LetrasLogo} 
              alt="Pereira & Silva Advocacia"  
              className="h-16 xs:h-20 sm:h-24 md:h-28 lg:h-32 -my-2"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors hover:text-[#DCC48F] ${
                  activeSection === item.id ? 'text-[#DCC48F] border-b-2 border-[#AC8B57]' : 'text-white'
                } pb-1`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#DCC48F]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-[#70522B] mt-2 pt-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left py-2 px-4 transition-colors hover:bg-[#2E0506] hover:text-[#DCC48F] rounded ${
                  activeSection === item.id ? 'text-[#DCC48F] bg-[#2E0506]' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
