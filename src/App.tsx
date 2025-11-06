import React, { useState, useEffect } from 'react';
import { Download, ListChecks, Clock, Zap } from 'lucide-react';
// Note: LucideIcon was removed from the imports and replaced with React.ElementType for better compatibility.

// --- Configuration and Constants ---
const PRIMARY_COLOR: string = 'bg-amber-50'; // Light, creamy background
const ACCENT_COLOR_CLASS: string = 'text-orange-600'; // Warm coral/rose accent
const ACCENT_BORDER_CLASS: string = 'border-orange-600';
const DOWNLOAD_BUTTON_CLASS: string = 'bg-black text-white hover:bg-gray-800 transition duration-300';
// Note: DOWNLOAD_CARD_BUTTON_CLASS is unused in this version, but kept for consistency
const DOWNLOAD_CARD_BUTTON_CLASS: string = 'text-rose-600 border-rose-600 hover:bg-rose-50 transition duration-300';

// --- Feature Card Component Types ---
interface FeatureCardProps {
  icon: React.ElementType; // FIXED: Using React.ElementType for the icon component type
  title: string;
  description: string;
  delay: number;
}

// --- Feature Card Component ---
const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay }) => {
  // Explicitly typing isVisible state as boolean
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Staggered fade-in effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`
        w-full p-6 border-2 ${ACCENT_BORDER_CLASS} rounded-xl shadow-lg transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        md:w-1/3 md:mx-4 lg:mx-8
        hover:shadow-2xl hover:scale-[1.02]
        transform
      `}
    >
      <div className={`p-3 w-fit rounded-full mb-4 border ${ACCENT_BORDER_CLASS} ${ACCENT_COLOR_CLASS}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

// --- Navbar Component ---
const NavBar: React.FC = () => (
  <header className="fixed top-0 left-0 right-0 z-50 p-4 lg:px-12 backdrop-blur-sm bg-amber-50/95 shadow-md">
    <nav className="flex items-center justify-between max-w-7xl mx-auto">
      {/* Logo */}
      <a href="#" className={`text-lg font-bold p-2 rounded-lg border-2 ${ACCENT_BORDER_CLASS} ${ACCENT_COLOR_CLASS} transition duration-300 hover:shadow-md`}>
        MOM OS
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
        {['Home', 'Features', 'About', 'Pricing'].map((item: string) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-black transition duration-200"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Download Button */}
      <button className={`hidden md:block px-6 py-2 rounded-lg font-semibold ${DOWNLOAD_BUTTON_CLASS}`}>
        Download
      </button>

      {/* Mobile Menu Icon (Placeholder) */}
      <button className="md:hidden p-2 rounded-lg border border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
    </nav>
  </header>
);

// --- Hero Section Component ---
const HeroSection: React.FC = () => {
  // Explicitly typing hasLoaded state as boolean
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  useEffect(() => {
    setHasLoaded(true); // Trigger initial animation
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center text-center px-4" id="home">
      <div
        className={`transition-all duration-1000 ease-out transform ${
          hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 max-w-4xl leading-tight">
          Get things done <br className="lg:hidden"/>
          one <span className={`${ACCENT_COLOR_CLASS} italic font-extrabold`}>smart nudge</span> at a time
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-xl mx-auto font-medium">
          Your intelligent focus companion that helps you stay productive <br className="hidden sm:block"/>
          <strong className="text-black">without the distraction</strong>
        </p>

        {/* Primary Download Button */}
        <button className={`px-8 py-3 text-lg font-semibold rounded-xl shadow-xl transition-all duration-300 transform ${DOWNLOAD_BUTTON_CLASS} hover:scale-105 mb-4 flex items-center justify-center mx-auto`}>
          <Download className="w-5 h-5 mr-2" />
          Download Now
        </button>

        {/* Availability Info */}
        <p className="text-sm text-gray-500 mb-16">
          Available for Windows | Mac as coming soon
        </p>
      </div>

      {/* Subtle Down Arrow (Animation) */}
      <a href="#features" className={`text-gray-500 animate-bounce transition-opacity duration-1000 ${
          hasLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
      </a>
    </section>
  );
};

// --- Focus Problem Section Component ---
const FocusProblemSection: React.FC = () => (
  <section className="py-20 px-4" id="features">
    <div className="max-w-7xl mx-auto text-center">
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-2">
        The <span className={ACCENT_COLOR_CLASS}>Focus Problem</span>
      </h2>
      <p className="text-lg text-gray-600 mb-12">
        Why it's harder than ever to focus?
      </p>

      {/* Feature Cards Grid */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
        <FeatureCard
          icon={ListChecks}
          title="Endless Distractions"
          description="How are we supposed to be productive when your phone is the easiest place to get distracted. The constant notifications pull your attention away."
          delay={200}
        />
        <FeatureCard
          icon={Clock}
          title="Short Attention Span"
          description="The modern digital age has rewired our brains for instant gratification, making deep focus increasingly difficult. We're training ourselves to seek novelty."
          delay={400}
        />
        <FeatureCard
          icon={Zap}
          title="Lost Awareness"
          description="The impossible part? We don't realize we're distracted, while already distracted. MOM OS helps bring awareness back to your digital habits."
          delay={600}
        />
      </div>
    </div>
  </section>
);

// --- Main App Component ---
const App: React.FC = () => {
  return (
    <div className={`font-sans ${PRIMARY_COLOR} min-h-screen text-gray-900`}>
      <NavBar />
      <main>
        <HeroSection />
        <FocusProblemSection />
      </main>
      {/* Simple Footer Placeholder */}
      <footer className="py-6 text-center text-sm text-gray-500 border-t border-amber-100">
        &copy; {new Date().getFullYear()} MOM OS. All rights reserved.
      </footer>
    </div>
  );
};

export default App;