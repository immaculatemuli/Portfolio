import React, { useState, useEffect } from 'react';
import { Layers, Code, Zap, ArrowRight, Github, Linkedin, Mail, ExternalLink, ChevronDown, Menu, X,  ArrowUp } from 'lucide-react';
export default function ProfessionalPortfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const projects = [
  {
    id: 1,
    title: 'STUDENT PRODUCTIVITY MOBILE APP',
    category: 'figma',
    image: require('./assets/CanvaProjects/Screenshot (163).png'),
    description: 'A student-focused mobile app designed to help manage tasks, schedules, and daily productivity through a clean and intuitive interface.',
    tech: ['Figma', 'UI Design', 'Prototyping'],
    color: 'from-cyan-500 to-blue-600',
    link: 'https://www.figma.com/design/9AN12VWa8q48xnQNiP6e1a/Student-Productivity-Mobile-App?node-id=0-1&t=GP7vZeqr7U7ziFdI-1'
  },
  {
    id: 2,
    title: 'CARTOON CHARACTER',
    category: 'canva',
    image: require('./assets/CanvaProjects/1.png'),
    description: 'A playful cartoon character illustration created for creative exploration and visual storytelling.',
    tech: ['Canva', 'Character Design', 'Digital Illustration'],
    color: 'from-violet-500 to-purple-600',
    link: 'https://www.canva.com/design/DAG9XZtJLgg/upPTjafogWXwf-PhuMt7Aw/edit?utm_content=DAG9XZtJLgg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebuttonhttps://www.canva.com/design/DAG9XZtJLgg/upPTjafogWXwf-PhuMt7Aw/edit?utm_content=DAG9XZtJLgg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 3,
    title: '2026 VISION BOARD',
    category: 'canva',
    image: require('./assets/CanvaProjects/Vision Board.png'),
    description: 'A visually curated vision board capturing personal goals, inspiration, and creative direction for the year 2026.',
    tech: ['Canva', 'Visual Composition', 'Typography', 'Creative Direction'],
    color: 'from-emerald-500 to-teal-600',
    link: 'https://www.canva.com/design/DAG9VpRGnqA/5qvrABLnirI6eBLKYyNgPg/edit?utm_content=DAG9VpRGnqA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 4,
    title: 'RENTAL MOBILE APP',
    category: 'figma',
    image: require('./assets/CanvaProjects/Lapollo Figma.png'),
    description: 'A mobile app design for property rentals, focusing on smooth navigation, listings display, and user-friendly booking flow.',
    tech: ['Figma', 'Mobile UI Design', 'Prototyping'],
    color: 'from-orange-500 to-red-600',
    link: 'https://www.figma.com/proto/bavypqiMfRtNmkDjfuJazk/Lapollo?node-id=22-263&p=f&t=VKD1ns8N8TNrAnOh-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=22%3A263'
  },
  {
    id: 5,
    title: 'F1 DRIVERS POSTER',
    category: 'canva',
    image: require('./assets/CanvaProjects/LEWIS.png'),
    description: 'A bold, high-energy poster design inspired by Formula 1 racing and driver branding.',
    tech: ['Canva', 'Poster Design',],
    color: 'from-indigo-500 to-blue-600',
    link: 'https://www.canva.com/design/DAG-ZeyheM8/Pu1HD066H0IVCdNk0qQHUw/edit?utm_content=DAG-ZeyheM8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 6,
    title: 'ANIME CHARACTERS',
    category: 'canva',
    image: require('./assets/CanvaProjects/Untitled design (2).png'),
    description: 'An anime-inspired characters design recreating different anime characters with a personal artistic style and creative interpretation.',
    tech: ['Canva', 'Digital Art', 'Character Illustration'],
    color: 'from-rose-500 to-pink-600',
    link: 'https://www.canva.com/design/DAG9cRoTw2c/Acn8M3tcb6MZ5qyDgr2QOw/edit?utm_content=DAG9cRoTw2c&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  }
];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

    const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
  return (
    <div className="min-h-screen bg-black text-white">
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slide-in {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .gradient-text {
          background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s ease infinite;
        }
        .glow-effect {
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.5);
        }
      `}</style>

      {/* Custom Cursor Effect */}
      <div 
        className="fixed w-8 h-8 border-2 border-cyan-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{ 
          top: mousePos.y - 16,
          transform: hoveredCard ? 'scale(2)' : 'scale(1)'
        }}
      />

     {/* Navigation */}
<nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    
    {/* Left Links */}
    <div className="hidden md:flex items-center gap-8">
      <a href="#work" className="hover:text-cyan-400 transition">Work</a>
      <a href="#about" className="hover:text-cyan-400 transition">About</a>
      <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
    </div>

    {/* Right Button */}
 <a
  href="mailto:immaculatemuli25@gmail.com?subject=Inquiry%20About%20Your%20Design%20Services"
  className="hidden md:flex bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition"
>
  Hire Me
</a>

    {/* Mobile Menu Button */}
    <button 
      onClick={() => setMenuOpen(!menuOpen)} 
      className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
    >
      {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>

  </div>


        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10">
            <div className="px-6 py-6 space-y-4">
              <a 
                href="#work" 
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 hover:bg-white/5 rounded-lg transition"
              >
                Work
              </a>
              <a 
                href="#about" 
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 hover:bg-white/5 rounded-lg transition"
              >
                About
              </a>
              <a 
                href="#contact" 
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 hover:bg-white/5 rounded-lg transition"
              >
                Contact
              </a>
              <a 
                href="mailto:immaculatemuli25@gmail.com?subject=Inquiry%20About%20Your%20Design%20Services"
                className="block text-center bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition"
              >
                Hire Me
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transform: `translateY(${scrollY * 0.5}px)`
          }} />
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              Design That
              <br />
              <span className="gradient-text">Converts</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
              Crafting clean, intuitive interfaces that users actually enjoy.
              I design UI/UX and visuals that feel as good as they look.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <a 
                href="#work"
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full font-bold hover:shadow-xl hover:shadow-cyan-500/50 transition flex items-center gap-2"
              >
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </a>
             <a 
  href="/Immaculate Muli.pdf"  // Make sure your PDF is in the public folder
  download="Immaculate Muli.pdf"
  className="bg-white/5 border border-white/10 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition backdrop-blur-sm"
>
  Download CV
</a>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </section>

  {/* Stats Section */}
<section className="py-32 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/10 to-black" />
  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { num: '5', label: 'Projects in Progress', icon: Layers },        
        { num: '4', label: 'Tools & Software', icon: Zap },              
        { num: '10+', label: 'Case Studies Completed', icon: Code },       
        { num: '20+', label: 'Design Projects', icon: ExternalLink }       
      ].map((stat, i) => (
        <div key={i} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-sm group-hover:border-cyan-500/50 transition-all duration-300">
            <stat.icon className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
            <div className="text-5xl font-black gradient-text mb-2">{stat.num}</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

   {/* About Section */}
<section id="about" className="py-32 relative overflow-hidden">
  <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/5 to-transparent" />
  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="grid md:grid-cols-2 gap-20 items-center">
      
      <div>
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full mb-6">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-sm text-cyan-400 font-bold">ABOUT ME</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
          Crafting Digital
          <br />
          <span className="gradient-text">Experiences</span>
        </h2>
        <div className="space-y-6 text-lg text-gray-400">
          <p className="leading-relaxed">
            I'm a multidisciplinary designer with expertise in UI/UX design, visual design, 
            and prototyping. My approach combines user research, data analysis, and creative 
            thinking to deliver solutions that are both beautiful and functional.
          </p>
          <p className="leading-relaxed">
            From wireframes to high-fidelity prototypes in Figma, to marketing materials 
            in Canva, I bring ideas to life with precision and creativity. Every pixel matters.
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-3 gap-4">
          {[
            { icon: Github, label: 'GitHub', url: 'https://github.com/muliimmaculate' },
            { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/immaculate-muli' },
            { icon: Mail, label: 'Email', url: 'mailto:immaculatemuli25@gmail.com' }
          ].map((social, i) => (
            <a 
              key={i}
              href={social.url}
              target={social.label !== 'Email' ? '_blank' : undefined}
              rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
              className="group relative bg-white/5 border border-white/10 p-6 rounded-xl hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-600/0 group-hover:from-cyan-500/10 group-hover:to-blue-600/10 rounded-xl transition-all duration-300" />
              <social.icon className="w-6 h-6 mb-2 text-gray-400 group-hover:text-cyan-400 transition-colors relative z-10" />
              <div className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors relative z-10">{social.label}</div>
            </a>
          ))}
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
        <div className="relative bg-black/60 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Zap className="w-6 h-6 text-cyan-400" />
            Core Expertise
          </h3>
       <div className="space-y-8">
  {[
    { skill: 'UI/UX Design', level: 85, color: 'from-cyan-500 to-blue-500' },
    { skill: 'Figma Prototyping', level: 70, color: 'from-blue-500 to-indigo-500' },
    { skill: 'Wireframing', level: 55, color: 'from-indigo-500 to-purple-500' },
    { skill: 'Digital Art', level: 70, color: 'from-pink-500 to-red-500' }
  ].map((item, i) => (
    <div key={i} className="group">
      <div className="flex justify-between mb-3">
        <span className="font-bold text-white">{item.skill}</span>
        <span className="text-cyan-400 font-mono font-bold">{item.level}%</span>
      </div>
      <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
        <div 
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg`}
          style={{ 
            width: `${item.level}%`,
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)'
          }}
        />
      </div>
    </div>
  ))}
</div>
        </div>
      </div>

    </div>
  </div>
</section>

{/* Projects Section */}
<section id="work" className="py-32 relative overflow-hidden">
  {/* Background Blobs */}
  <div className="absolute inset-0">
    <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
  </div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    {/* Header */}
    <div className="text-center mb-20">
      <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full mb-6">
        <Layers className="w-4 h-4 text-cyan-400" />
        <span className="text-sm text-cyan-400 font-bold">PORTFOLIO</span>
      </div>
      <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
        Featured <span className="gradient-text">Projects</span>
      </h2>X
      <p className="text-xl text-gray-400 max-w-3xl mx-auto">
        A curated selection of work that showcases my expertise in creating 
        user-centered designs and impactful visual experiences
      </p>
    </div>

    {/* Filter Buttons */}
    <div className="flex gap-4 mb-16 justify-center flex-wrap">
      {[
        { id: 'all', label: 'All Work', count: projects.length },
        { id: 'figma', label: 'Figma Design', count: projects.filter(p => p.category === 'figma').length },
        { id: 'canva', label: 'Canva Design', count: projects.filter(p => p.category === 'canva').length }
      ].map(filter => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`relative px-8 py-4 rounded-full font-bold transition-all duration-300 ${
            activeFilter === filter.id
              ? 'text-white'
              : 'bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white'
          }`}
        >
          {activeFilter === filter.id && (
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
          )}
          <span className="relative flex items-center gap-2">
            {filter.label}
            <span className={`text-xs px-2 py-1 rounded-full ${
              activeFilter === filter.id ? 'bg-white/20' : 'bg-white/10'
            }`}>
              {filter.count}
            </span>
          </span>
        </button>
      ))}
    </div>

    {/* Projects Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProjects.map((project, index) => (
        <div
          key={project.id}
          onMouseEnter={() => setHoveredCard(project.id)}
          onMouseLeave={() => setHoveredCard(null)}
          className="group relative"
          style={{
            animation: `slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s both`
          }}
        >
          {/* Gradient Border on Hover */}
          <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/50 to-purple-500/50 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />

          {/* Card Container */}
          <div className="relative bg-black/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl group-hover:border-white/20 flex flex-col h-full">
            {/* Image Section */}
            <div className="relative h-72 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-90 transition-all duration-500 flex items-center justify-center`}>
                <div className="transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-black hover:text-white transition-all duration-300 shadow-2xl"
                  >
                    <span className="flex items-center gap-3">
                      View Project
                      <ExternalLink className="w-5 h-5" />
                    </span>
                  </a>
                </div>
              </div>
              
              <div className="absolute top-4 right-4">
                <div className="px-4 py-2 rounded-full font-bold text-sm backdrop-blur-xl bg-white/10 border border-white/20">
                  {project.category === 'figma' ? 'Figma' : 'Canva'}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-black mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed flex-1">
                {project.description}
              </p>
              <div className="flex gap-2 flex-wrap mt-auto">
                {project.tech.map((tech, i) => (
                  <span 
                    key={i}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold text-gray-300 hover:bg-white/10 hover:border-cyan-500/30 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* View All Projects Button */}
    <div className="text-center mt-16">
      <a 
        href="#contact"
        className="inline-block group bg-white/5 border border-white/10 px-8 py-4 rounded-full font-bold hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:border-transparent transition-all duration-300"
      >
        <span className="flex items-center gap-2">
          View All Projects
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </a>
    </div>
  </div>
</section>


        {/* CTA Section */}
        <section id="contact" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-75" />
              
              <div className="relative bg-black/60 border border-white/20 rounded-3xl p-16 backdrop-blur-2xl">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full mb-8">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-sm text-cyan-400 font-bold">AVAILABLE FOR WORK</span>
                  </div>
                  
                  <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                    Let's Build Something
                    <br />
                    <span className="gradient-text">Amazing Together</span>
                  </h2>
                  
                  <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    I'm currently available for freelance projects, full-time opportunities, 
                    and consulting work. Let's discuss how I can help bring your vision to life.
                  </p>
                  
                  <div className="flex gap-6 justify-center flex-wrap mb-12">
                    <a 
                      href="mailto:immaculatemuli25@gmail.com?subject=Inquiry%20About%20Your%20Design%20Services"
                      className="group relative px-10 py-5 rounded-full font-bold text-lg overflow-hidden inline-block"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 transition-transform group-hover:scale-105" />
                      <span className="relative flex items-center gap-3 text-white">
                        <Mail className="w-6 h-6" />
                        Get In Touch
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </a>
                    
                   <a 
  href="/Immaculate Muli.pdf"  // <-- public folder path
  target="_blank"             // opens in a new tab
  rel="noopener noreferrer"   // security best practice
  className="group px-10 py-5 rounded-full font-bold text-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 inline-block"
>
  <span className="flex items-center gap-3">
    <Code className="w-6 h-6" />
    View Resume
  </span>
</a>

                  </div>
                  
                  <div className="pt-12 border-t border-white/10">
                    <p className="text-sm text-gray-500 mb-6">Or connect with me on</p>
                    <div className="flex gap-6 justify-center">
                      {[
                        { icon: Github, label: 'GitHub', href: 'https://github.com/muliimmaculate' },
                        { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/immaculate-muli' },
                        { icon: Mail, label: 'Email', href: 'mailto:immaculatemuli25@gmail.com?subject=Inquiry%20About%20Your%20Design%20Services' }
                      ].map((social, i) => (
                        <a 
                          key={i}
                          href={social.href}
                          target={social.label !== 'Email' ? '_blank' : undefined}
                          rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                          className="group flex flex-col items-center gap-2 hover:scale-110 transition-transform"
                        >
                          <div className="bg-white/5 border border-white/10 p-4 rounded-xl group-hover:bg-gradient-to-br group-hover:from-cyan-500/20 group-hover:to-blue-600/20 group-hover:border-cyan-500/50 transition-all duration-300">
                            <social.icon className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                          </div>
                          <span className="text-sm text-gray-500 group-hover:text-cyan-400 transition-colors">{social.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="text-3xl font-black gradient-text mb-4">PORTFOLIO</div>
              <p className="text-gray-400 mb-6 max-w-md">
                Creating exceptional digital experiences through thoughtful design and meticulous attention to detail.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Github, href: 'https://github.com/muliimmaculate' },
                  { Icon: Linkedin, href: 'https://linkedin.com/in/yourusername' },
                  { Icon: Mail, href: 'mailto:immaculatemuli25@gmail.com?subject=Inquiry%20About%20Your%20Design%20Services' }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href}
                    target={social.Icon !== Mail ? '_blank' : undefined}
                    rel={social.Icon !== Mail ? 'noopener noreferrer' : undefined}
                    className="bg-white/5 border border-white/10 p-3 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:border-transparent transition-all duration-300"
                  >
                    <social.Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['Work', 'About', 'Contact', 'Resume'].map((link, i) => (
                  <li key={i}>
                    <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-cyan-400 transition flex items-center gap-2 group">
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <ul className="space-y-3">
                {['UI/UX Design', 'Prototyping', 'Visual Design', 'Consulting'].map((service, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2026 Portfolio. Crafted with precision and passion.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

    {scrollY > 500 && (
  <button
    onClick={scrollToTop}
    className="
      fixed bottom-8 right-8 z-50
      w-14 h-14 rounded-2xl
      bg-black/60 backdrop-blur-xl
      border border-white/10
      flex items-center justify-center
      shadow-xl shadow-cyan-500/20
      transition-all duration-500
      hover:border-cyan-400/50
      hover:shadow-cyan-500/40
      hover:-translate-y-1
    "
  >
    <ArrowUp className="w-6 h-6 text-cyan-400" />
  </button>
)}


    </div>
  );
}