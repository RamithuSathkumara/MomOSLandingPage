import React, { useState, useEffect, useRef } from 'react';
import { 
  ListChecks, Clock, Zap, 
  Brain, Bell, Calendar, Activity, BarChart3, Play, X, Shield
} from 'lucide-react';

// --- Configuration and Constants ---
const PRIMARY_COLOR: string = 'bg-amber-50';
const ACCENT_COLOR_CLASS: string = 'text-orange-600';
const ACCENT_BORDER_CLASS: string = 'border-orange-600';
const DOWNLOAD_BUTTON_CLASS: string = 'bg-black text-white hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all duration-300';
const SMOOTH_EASE = 'transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]';

// --- Utility Component: Reveal on Scroll ---
const RevealOnScroll: React.FC<{ children: React.ReactNode; className?: string; delay?: number; threshold?: number }> = ({ children, className = "", delay = 0, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a tiny delay to allow for layout stabilization if needed
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div 
      ref={ref} 
      className={`${SMOOTH_EASE} transform ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'} ${className}`}
    >
      {children}
    </div>
  );
};

// --- Feature Card Component (Problem Section) ---
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay }) => {
  return (
    <RevealOnScroll delay={delay} className="w-full md:w-1/3 md:mx-4 lg:mx-8 h-full">
      <div className={`h-full p-6 border-2 ${ACCENT_BORDER_CLASS} rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform ${SMOOTH_EASE} bg-white group flex flex-col`}>
        <div className={`p-3 w-fit rounded-full mb-4 border ${ACCENT_BORDER_CLASS} ${ACCENT_COLOR_CLASS} bg-orange-50 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </RevealOnScroll>
  );
};

// --- NavBar Component ---
const NavBar: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 lg:px-12 backdrop-blur-xl bg-amber-50/70 shadow-sm border-b border-orange-100/50 supports-[backdrop-filter]:bg-amber-50/50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <a 
          href="#home" 
          onClick={(e) => handleScroll(e, 'home')}
          className={`text-lg font-bold p-2 rounded-lg border-2 ${ACCENT_BORDER_CLASS} ${ACCENT_COLOR_CLASS} ${SMOOTH_EASE} hover:shadow-md hover:bg-orange-50 flex items-center justify-center`}
        >
           <span className="md:hidden">M</span>
           <span className="hidden md:inline">MOM OS</span>
        </a>
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          {['Home', 'Features', 'About'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => handleScroll(e, item.toLowerCase() === 'features' ? 'features' : item.toLowerCase() === 'about' ? 'about' : 'home')}
              className="hover:text-orange-600 transition duration-200 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        {/* Download button commented out as requested */}
      </nav>
    </header>
  );
};

// --- Hero Section ---
const HeroSection: React.FC = () => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  useEffect(() => setHasLoaded(true), []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('problem');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden" id="home">
      {/* Abstract Background Blobs */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-0 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className={`relative z-10 transform ${hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${SMOOTH_EASE}`}>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 max-w-4xl leading-tight text-gray-900">
          Get things done <br className="lg:hidden"/>
          one <span className={`text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600 italic font-extrabold`}>smart nudge</span> at a time
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-xl mx-auto font-medium">
          A caring digital mom that reminds you to get things done — lovingly, of course
          (most of the time)
        </p>
        
        <button 
          onClick={scrollToNextSection}
          className={`px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl ${DOWNLOAD_BUTTON_CLASS} mb-4 flex items-center justify-center mx-auto ring-4 ring-transparent hover:ring-orange-200`}
        >
           Checkout
        </button>
        
        <p className="text-sm text-gray-500 mb-16">Available for Windows | Mac coming soon</p>
      </div>
    </section>
  );
};

// --- Focus Problem Section ---
const FocusProblemSection: React.FC = () => (
  <section className="py-20 px-4 bg-white relative" id="problem">
    <div className="max-w-7xl mx-auto text-center">
      <RevealOnScroll>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">The <span className={ACCENT_COLOR_CLASS}>Focus Problem</span></h2>
        <p className="text-lg text-gray-600 mb-12">Why is it harder than ever to focus?</p>
      </RevealOnScroll>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
        <FeatureCard icon={ListChecks} title="Endless Distractions" description="When using your pc, you are highly likely to get distracted. Constant notifications pull your attention away." delay={100} />
        <FeatureCard icon={Clock} title="Short Attention Span" description="The digital age has rewired our brains for instant gratification, making deep focus increasingly difficult." delay={200} />
        <FeatureCard icon={Zap} title="Lost Awareness" description="The impossible part? We don't realize we're distracted, while already distracted. MOM OS brings awareness back." delay={300} />
      </div>
    </div>
  </section>
);

// --- INTERACTIVE DASHBOARD COMPONENTS ---

// 1. Nudge Card (Interactive)
const NudgeCard = () => {
  const [showToast, setShowToast] = useState(false);

  const triggerNudge = () => {
    setShowToast(false);
    setTimeout(() => setShowToast(true), 50);
    setTimeout(() => setShowToast(false), 4500);
  };

  return (
    <RevealOnScroll className="md:col-span-8 h-full" delay={100}>
      <div className={`bg-white rounded-2xl p-6 shadow-lg border border-orange-100 relative overflow-hidden group hover:shadow-xl ${SMOOTH_EASE} h-full`}>
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <Bell size={100} className="text-orange-500 transform rotate-12" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start h-full">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-2 text-orange-600">
              <Bell className="w-5 h-5 mr-2" />
              <h3 className="font-bold">Gentle Live Nudges</h3>
            </div>
            <p className="text-sm text-gray-500 max-w-sm mb-4">Real-time interventions that politely steer you back to work when you drift off.</p>
            
            <button 
              onClick={triggerNudge}
              className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 text-xs font-bold rounded-lg hover:bg-orange-100 transition-colors active:scale-95"
            >
              <Play size={12} fill="currentColor" /> Test Distraction
            </button>
          </div>

          <div className={`
            absolute md:relative top-4 right-4 md:top-auto md:right-auto
            bg-white border border-orange-200 shadow-2xl rounded-xl p-4 w-64 
            transform ${SMOOTH_EASE}
            ${showToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}
          `}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <Brain size={12} />
                </div>
                <span className="text-xs font-bold text-gray-800">MOM OS</span>
              </div>
              <button onClick={() => setShowToast(false)} className="text-gray-400 hover:text-gray-600"><X size={12}/></button>
            </div>
            <p className="text-xs text-gray-600 mb-3">"You've been scrolling Twitter for 5 mins. Let's get back to that report?"</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-orange-600 text-white text-[10px] py-1 rounded hover:bg-orange-700 transition-colors">Okay</button>
              <button className="flex-1 bg-gray-100 text-gray-600 text-[10px] py-1 rounded hover:bg-gray-200 transition-colors">Go away Mom!</button>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};

// 2. Task Scheduler (Visual)
const TaskSchedulerCard = () => (
  <RevealOnScroll className="md:col-span-4 row-span-2 h-full" delay={0}>
    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-orange-100 flex flex-col overflow-hidden relative group hover:shadow-xl ${SMOOTH_EASE} h-full`}>
      <div className="flex items-center mb-4 text-orange-600">
        <Calendar className="w-5 h-5 mr-2" />
        <h3 className="font-bold">Easy to use Scheduler</h3>
      </div>
      <p className="text-sm text-gray-500 mb-6">Type it down. Mom OS will make sure it happens, by choice or by force.</p>
      
      <div className="flex-1 relative space-y-3">
        <div className="flex gap-3 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
          <div className="text-xs text-gray-400 w-8 pt-1">09:00</div>
          <div className="flex-1 bg-orange-50 border-l-4 border-orange-400 p-2 rounded text-xs shadow-sm">
            <span className="font-bold text-gray-800 block">Deep Work</span>
            <span className="text-[9px] text-orange-600">High Cognitive Load</span>
          </div>
        </div>
        <div className="flex gap-3 scale-105 transform origin-left transition-transform duration-500">
          <div className="text-xs text-gray-800 font-bold w-8 pt-1">11:00</div>
          <div className="flex-1 bg-white border border-orange-200 border-l-4 border-l-orange-600 p-2 rounded text-xs shadow-md ring-2 ring-orange-100">
            <span className="font-bold text-gray-900 block">Install Mom OS</span>
            <span className="text-[9px] text-gray-500">Current Task</span>
          </div>
        </div>
        <div className="flex gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
          <div className="text-xs text-gray-400 w-8 pt-1">12:30</div>
          <div className="flex-1 bg-gray-50 border-l-4 border-gray-300 p-2 rounded text-xs">
            <span className="font-medium text-gray-600 block">Lunch</span>
          </div>
        </div>
      </div>
    </div>
  </RevealOnScroll>
);

// 3. Distraction Counter (Animated)
const DistractionCard = () => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  
  // Only start counting when visible
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setCount(prev => (prev < 12 ? prev + 1 : 12));
    }, 100);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <RevealOnScroll className="md:col-span-4 h-full" delay={200}>
      {/* We use a callback ref approach or just simple simulation here since RevealOnScroll controls visibility */}
      <div 
        className={`bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:border-orange-300 ${SMOOTH_EASE} h-full`}
        onMouseEnter={() => setIsInView(true)} // Interactive trigger or simpler: auto-trigger when mounted
        onAnimationStart={() => setIsInView(true)}
      >
        <div className="flex items-center mb-2 text-orange-600">
          <Activity className="w-5 h-5 mr-2" />
          <h3 className="font-bold">Distraction Tracking</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">Monitor where your time leaks.</p>
        <div className="flex items-center gap-6">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="36" stroke="#f3f4f6" strokeWidth="8" fill="none" />
              <circle cx="40" cy="40" r="36" stroke="#ea580c" strokeWidth="8" fill="none" strokeDasharray="226" strokeDashoffset={226 - (226 * count) / 100} className={`transition-all duration-1000 ease-out`} />
            </svg>
            <span className="absolute text-lg font-bold text-gray-800">{count}%</span>
          </div>
          <div className="text-xs text-gray-500 space-y-2">
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div> Distracted time</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-gray-200 rounded-full"></div> Productive</div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};

// --- Main Dashboard Section ---
const SolutionSection: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-amber-50" id="features">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">WHAT <span className={ACCENT_COLOR_CLASS}>MOM OS</span> OFFERS</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We don't just block sites. We manage your cognitive energy.
          </p>
        </RevealOnScroll>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">
          <TaskSchedulerCard />
          <NudgeCard />
          
          <DistractionCard />

          {/* Feature 5: Productivity Summary */}
          <RevealOnScroll className="md:col-span-12" delay={300}>
            <div className={`bg-gradient-to-r from-orange-600 to-rose-600 rounded-2xl p-8 shadow-xl text-white flex flex-col md:flex-row items-center justify-between relative overflow-hidden group ${SMOOTH_EASE} hover:shadow-2xl`}>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="absolute -right-10 -bottom-10 text-white opacity-10 transform rotate-12 group-hover:scale-110 transition-transform duration-700 ease-out">
                <BarChart3 size={200} />
              </div>
              
              <div className="mb-6 md:mb-0 relative z-10">
                <div className="flex items-center mb-2">
                  <BarChart3 className="w-6 h-6 mr-3 text-orange-200" />
                  <h3 className="font-bold text-xl">Session-Wise Productivity Summary</h3>
                </div>
                <p className="text-orange-100 max-w-md">Get a session based report of how well you managed your focus, tailored to your personal goals.</p>
              </div>
              {/* Button Removed */}
            </div>
          </RevealOnScroll>

        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
};

// --- About Section ---
const AboutSection: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden" id="about">
       {/* Background accent */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
       <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-rose-50 rounded-full blur-[80px] opacity-60 translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

       <div className="max-w-4xl mx-auto relative z-10">
         <RevealOnScroll className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">Why We Built <span className={ACCENT_COLOR_CLASS}>MOM OS</span></h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-orange-400 to-rose-400 mx-auto rounded-full"></div>
         </RevealOnScroll>

         <div className="space-y-12">
            <RevealOnScroll delay={100} className="text-center">
              <p className="text-xl sm:text-2xl leading-relaxed text-gray-600 font-medium">
                "In an attention economy, your focus is the product. <br className="hidden md:inline"/>
                We built Mom OS to help you <span className="text-orange-600 font-bold bg-orange-50 px-2 rounded-lg">take it back.</span>"
              </p>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
               <RevealOnScroll delay={200} className="bg-white p-8 rounded-3xl shadow-xl border border-orange-100 hover:border-orange-300 transition-colors h-full">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                    <Brain className="w-6 h-6"/>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Cognitive Compassion</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Willpower is a finite resource. Most tools try to force you into submission. Mom OS acts as an external cortex, offloading the burden of self-regulation so you can save your energy for the work that matters.
                  </p>
               </RevealOnScroll>

               <RevealOnScroll delay={300} className="bg-white p-8 rounded-3xl shadow-xl border border-orange-100 hover:border-orange-300 transition-colors h-full">
                  <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 mb-6">
                    <Shield className="w-6 h-6"/>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy First</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We believe productivity shouldn't cost you your privacy. Mom OS analyzes your activity locally on your device. Your data never leaves your computer, ensuring your habits remain your business alone.
                  </p>
               </RevealOnScroll>
            </div>

            <RevealOnScroll delay={400} className="max-w-2xl mx-auto mt-16 text-center bg-amber-50/50 p-8 rounded-2xl border border-orange-100/50 backdrop-blur-sm">
               <p className="text-lg text-gray-600 italic mb-4">
                 "We are a team of students and builders who were tired of getting distracted. We didn't want another strict blocker; we wanted a tool that understood context. That's why we made Mom OS."
               </p>
               <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-rose-400"></div>
                  <span className="font-bold text-gray-900 text-sm">The Mom OS Team</span>
               </div>
            </RevealOnScroll>
         </div>
       </div>
    </section>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  return (
    <div className={`font-sans ${PRIMARY_COLOR} min-h-screen text-gray-900 scroll-smooth`}>
      <NavBar />
      <main>
        <HeroSection />
        <FocusProblemSection />
        <SolutionSection />
        <AboutSection />
      </main>
      <footer className="py-8 text-center text-sm text-gray-500 border-t border-amber-100 bg-white">
        <div className="mb-2 font-bold text-gray-900 tracking-widest">MOM OS</div>
        &copy; {new Date().getFullYear()} All rights reserved.
      </footer>
    </div>
  );
};

export default App;