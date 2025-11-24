import React, { useState, useEffect } from 'react';
import { 
  Download, ListChecks, Clock, Zap, 
  Brain, Bell, Calendar, Activity, BarChart3, Play, X,
  Check 
} from 'lucide-react';

// --- Configuration and Constants ---
const PRIMARY_COLOR: string = 'bg-amber-50';
const ACCENT_COLOR_CLASS: string = 'text-orange-600';
const ACCENT_BORDER_CLASS: string = 'border-orange-600';
const DOWNLOAD_BUTTON_CLASS: string = 'bg-black text-white hover:bg-gray-800 transition duration-300';

// --- Feature Card Component (Problem Section) ---
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`w-full p-6 border-2 ${ACCENT_BORDER_CLASS} rounded-xl shadow-lg transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} md:w-1/3 md:mx-4 lg:mx-8 hover:shadow-2xl hover:-translate-y-2 transform bg-white group`}>
      <div className={`p-3 w-fit rounded-full mb-4 border ${ACCENT_BORDER_CLASS} ${ACCENT_COLOR_CLASS} bg-orange-50 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

// --- NavBar Component ---
const NavBar: React.FC = () => (
  <header className="fixed top-0 left-0 right-0 z-50 p-4 lg:px-12 backdrop-blur-md bg-amber-50/80 shadow-sm border-b border-orange-100/50">
    <nav className="flex items-center justify-between max-w-7xl mx-auto">
      <a href="#" className={`text-lg font-bold p-2 rounded-lg border-2 ${ACCENT_BORDER_CLASS} ${ACCENT_COLOR_CLASS} transition duration-300 hover:shadow-md hover:bg-orange-50 flex items-center justify-center`}>
         {/* Placeholder for Logo if image fails, otherwise use img */}
         <span className="md:hidden">M</span>
         <span className="hidden md:inline">MOM OS</span>
      </a>
      <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
        {['Home', 'Features', 'About', 'Pricing'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-orange-600 transition duration-200">{item}</a>
        ))}
      </div>
      <button className={`hidden md:block px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${DOWNLOAD_BUTTON_CLASS}`}>Download</button>
    </nav>
  </header>
);

// --- Hero Section ---
const HeroSection: React.FC = () => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  useEffect(() => setHasLoaded(true), []);
  return (
    <section className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden" id="home">
      {/* Abstract Background Blobs */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-0 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className={`relative z-10 transition-all duration-1000 ease-out transform ${hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 max-w-4xl leading-tight text-gray-900">
          Get things done <br className="lg:hidden"/>
          one <span className={`text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600 italic font-extrabold`}>smart nudge</span> at a time
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-xl mx-auto font-medium">
          A caring digital mom that reminds you to get things done — lovingly, of course
          (most of the time)
        </p>
        <button className={`px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transition-all duration-300 transform ${DOWNLOAD_BUTTON_CLASS} hover:scale-105 hover:shadow-orange-500/20 mb-4 flex items-center justify-center mx-auto ring-4 ring-transparent hover:ring-orange-200`}>
          <Download className="w-5 h-5 mr-2" /> Download Now
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
      <h2 className="text-3xl sm:text-4xl font-bold mb-2">The <span className={ACCENT_COLOR_CLASS}>Focus Problem</span></h2>
      <p className="text-lg text-gray-600 mb-12">Why is it harder than ever to focus?</p>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
        <FeatureCard icon={ListChecks} title="Endless Distractions" description="Your phone is the easiest place to get distracted. Constant notifications pull your attention away." delay={200} />
        <FeatureCard icon={Clock} title="Short Attention Span" description="The digital age has rewired our brains for instant gratification, making deep focus increasingly difficult." delay={400} />
        <FeatureCard icon={Zap} title="Lost Awareness" description="The impossible part? We don't realize we're distracted, while already distracted. MOM OS brings awareness back." delay={600} />
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
    setTimeout(() => setShowToast(true), 100);
    // Auto hide after 4 seconds
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="md:col-span-8 bg-white rounded-2xl p-6 shadow-lg border border-orange-100 relative overflow-hidden group hover:shadow-xl transition-shadow">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
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
            className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 text-xs font-bold rounded-lg hover:bg-orange-100 transition-colors"
          >
            <Play size={12} fill="currentColor" /> Test Distraction
          </button>
        </div>

        {/* The Simulated Notification */}
        <div className={`
          absolute md:relative top-4 right-4 md:top-auto md:right-auto
          bg-white border border-orange-200 shadow-2xl rounded-xl p-4 w-64 
          transform transition-all duration-500 ease-spring
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
            <button className="flex-1 bg-orange-600 text-white text-[10px] py-1 rounded hover:bg-orange-700">Okay</button>
            <button className="flex-1 bg-gray-100 text-gray-600 text-[10px] py-1 rounded hover:bg-gray-200">Go away Mom!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Task Scheduler (Visual)
const TaskSchedulerCard = () => (
  <div className="md:col-span-4 row-span-2 bg-white rounded-2xl p-6 shadow-lg border border-orange-100 flex flex-col overflow-hidden relative group hover:shadow-xl transition-shadow">
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
       <div className="flex gap-3 scale-105 transform origin-left transition-transform">
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
);

// 3. Distraction Counter (Animated)
const DistractionCard = () => {
  const [count, setCount] = useState(0);
  
  // Simple counting animation on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => (prev < 12 ? prev + 1 : 12));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:col-span-4 bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:border-orange-300 transition-colors">
      <div className="flex items-center mb-2 text-orange-600">
        <Activity className="w-5 h-5 mr-2" />
        <h3 className="font-bold">Distraction Tracking</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4">Monitor where your time leaks.</p>
      <div className="flex items-center gap-6">
        <div className="relative w-20 h-20 flex items-center justify-center">
           <svg className="w-full h-full transform -rotate-90">
             <circle cx="40" cy="40" r="36" stroke="#f3f4f6" strokeWidth="8" fill="none" />
             <circle cx="40" cy="40" r="36" stroke="#ea580c" strokeWidth="8" fill="none" strokeDasharray="226" strokeDashoffset={226 - (226 * count) / 100} className="transition-all duration-1000 ease-out" />
           </svg>
           <span className="absolute text-lg font-bold text-gray-800">{count}%</span>
        </div>
        <div className="text-xs text-gray-500 space-y-2">
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div> Distracted time</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-gray-200 rounded-full"></div> Productive</div>
        </div>
      </div>
    </div>
  );
};

// --- Main Dashboard Section ---
const SolutionSection: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-amber-50" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">WHAT <span className={ACCENT_COLOR_CLASS}>MOM OS</span> OFFERS</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We don't just block sites. We manage your cognitive energy.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">
          <TaskSchedulerCard />
          <NudgeCard />
          
          <DistractionCard />

          {/* Feature 5: Productivity Summary */}
          <div className="md:col-span-12 bg-gradient-to-r from-orange-600 to-rose-600 rounded-2xl p-8 shadow-xl text-white flex flex-col md:flex-row items-center justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="absolute -right-10 -bottom-10 text-white opacity-10 transform rotate-12 group-hover:scale-110 transition-transform duration-700">
              <BarChart3 size={200} />
            </div>
            
            <div className="mb-6 md:mb-0 relative z-10">
              <div className="flex items-center mb-2">
                <BarChart3 className="w-6 h-6 mr-3 text-orange-200" />
                <h3 className="font-bold text-xl">Session-Wise Productivity Summary</h3>
              </div>
              <p className="text-orange-100 max-w-md">Get a session based report of how well you managed your focus, tailored to your personal goals.</p>
            </div>
            <button className="relative z-10 bg-white text-orange-600 px-8 py-3 rounded-full text-sm font-bold hover:bg-orange-50 hover:shadow-lg transition-all transform hover:-translate-y-1">
              View Sample Report
            </button>
          </div>

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
        
        @keyframes spring {
          0% { transform: scale(0.9); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .ease-spring { transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      `}</style>
    </section>
  );
};

// --- NEW COMPONENT: Pricing Section ---
const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 px-4 relative overflow-hidden bg-white">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Invest in your <span className="text-orange-600">attention span.</span>
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Cheaper than a cup of coffee. More effective than willpower.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-bold transition-colors ${!isAnnual ? 'text-gray-900' : 'text-gray-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 bg-gray-200 rounded-full p-1 transition-colors hover:bg-gray-300 focus:outline-none"
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isAnnual ? 'translate-x-8' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-sm font-bold transition-colors ${isAnnual ? 'text-gray-900' : 'text-gray-400'}`}>
              Yearly <span className="text-orange-600 text-xs bg-orange-100 px-2 py-0.5 rounded-full ml-1">-20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Card 1: Starter */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-500">The Skeptic</h3>
              <div className="flex items-end gap-1 mt-4">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-400 mb-1">/forever</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Manual focus tools only.</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-sm text-gray-600"><Check size={16} className="text-gray-400"/> Manual Blocking</li>
              <li className="flex items-center gap-3 text-sm text-gray-600"><Check size={16} className="text-gray-400"/> 3 Sessions / Day</li>
              <li className="flex items-center gap-3 text-sm text-gray-600"><Check size={16} className="text-gray-400"/> Basic Stats</li>
              <li className="flex items-center gap-3 text-sm text-gray-400 line-through"><X size={16}/> No Live Nudges</li>
            </ul>
            <button className="w-full py-3 rounded-xl border-2 border-gray-200 font-bold text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-all">
              Download Free
            </button>
          </div>

          {/* Card 2: Pro (Highlighted) */}
          <div className="bg-white rounded-3xl p-8 border-2 border-orange-500 shadow-2xl relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-600 to-rose-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide shadow-lg">
              MOST POPULAR
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-orange-600">Focus Pro</h3>
              <div className="flex items-end gap-1 mt-4">
                <span className="text-5xl font-bold text-gray-900">${isAnnual ? '8' : '12'}</span>
                <span className="text-gray-400 mb-1">/mo</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Full automation & intelligence.</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-sm font-medium text-gray-900"><div className="p-1 bg-orange-100 rounded-full text-orange-600"><Zap size={12}/></div> Unlimited Sessions</li>
              <li className="flex items-center gap-3 text-sm font-medium text-gray-900"><div className="p-1 bg-orange-100 rounded-full text-orange-600"><Zap size={12}/></div> Smart Nudges</li>
              <li className="flex items-center gap-3 text-sm font-medium text-gray-900"><div className="p-1 bg-orange-100 rounded-full text-orange-600"><Zap size={12}/></div> Flow State Guard</li>
              <li className="flex items-center gap-3 text-sm font-medium text-gray-900"><div className="p-1 bg-orange-100 rounded-full text-orange-600"><Zap size={12}/></div> Advanced Analytics</li>
            </ul>
            <button className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold shadow-lg hover:bg-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Start 14-Day Trial
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">No credit card required for trial.</p>
          </div>

          {/* Card 3: Lifetime */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-500">Believer</h3>
              <div className="flex items-end gap-1 mt-4">
                <span className="text-4xl font-bold text-gray-900">$199</span>
                <span className="text-gray-400 mb-1">/once</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Pay once, own it forever.</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-sm text-gray-600"><Check size={16} className="text-gray-400"/> All Pro Features</li>
              <li className="flex items-center gap-3 text-sm text-gray-600"><Check size={16} className="text-gray-400"/> Lifetime Updates</li>
              <li className="flex items-center gap-3 text-sm text-gray-600"><Check size={16} className="text-gray-400"/> Early Beta Access</li>
              <li className="flex items-center gap-3 text-sm text-gray-600"><Check size={16} className="text-gray-400"/> Founder's Discord</li>
            </ul>
            <button className="w-full py-3 rounded-xl border-2 border-gray-200 font-bold text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-all">
              Get Lifetime Access
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  return (
    <div className={`font-sans ${PRIMARY_COLOR} min-h-screen text-gray-900`}>
      <NavBar />
      <main>
        <HeroSection />
        <FocusProblemSection />
        <SolutionSection />
        <PricingSection /> {/* Pricing Section Added Here */}
      </main>
      <footer className="py-8 text-center text-sm text-gray-500 border-t border-amber-100 bg-white">
        <div className="mb-2 font-bold text-gray-900 tracking-widest">MOM OS</div>
        &copy; {new Date().getFullYear()} All rights reserved.
      </footer>
    </div>
  );
};

export default App;