import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { PracticeAreas } from '../components/sections/PracticeAreas';
import { Team } from '../components/sections/Team';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/layout/Footer';

export function PublicSite() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <Hero />
        <About />
        <PracticeAreas />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

