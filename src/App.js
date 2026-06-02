import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, ArrowUp, Menu, X, Palette, BarChart2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const CYAN = '#625fff';   // berkin primary purple
const PINK = '#ea4884';   // berkin secondary pink
const BG   = '#030412';   // berkin bg
const CARD = '#161a31';   // berkin card
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

/* ── text scramble hook ── */
function useScramble(text, delay = 400) {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let frame = 0;
    let raf;
    const timeout = setTimeout(() => {
      const run = () => {
        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ') return ' ';
            if (i < frame / 2.5) return text[i];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }).join('')
        );
        frame++;
        if (frame < text.length * 2.5 + 10) raf = requestAnimationFrame(run);
        else setDisplay(text);
      };
      raf = requestAnimationFrame(run);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [text, delay]);
  return display;
}

/* ── count-up hook ── */
function useCountUp(target, isVisible, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  return count;
}

/* ── stat number component ── */
function StatNum({ value, suffix = '', isVisible }) {
  const num = parseInt(value);
  const counted = useCountUp(isNaN(num) ? 0 : num, isVisible);
  if (isNaN(num)) return <span>{value}</span>;
  return <span>{counted}{suffix}</span>;
}

export default function Portfolio() {
  const [activeFilter,  setActiveFilter]  = useState('all');
  const [scrollY,       setScrollY]       = useState(0);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [roleIndex,     setRoleIndex]     = useState(0);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [statsVisible,  setStatsVisible]  = useState(false);
  const cursorRef  = useRef(null);
  const cursorDot  = useRef(null);
  const skillsRef  = useRef(null);
  const statsRef   = useRef(null);

  const heroName = useScramble('Immaculate Muli', 600);
  const roles    = React.useMemo(() => ['UI/UX Designer', 'Data Analyst', 'Visual Creator'], []);

  /* scroll */
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* role cycling */
  useEffect(() => {
    const id = setInterval(() => setRoleIndex(p => (p + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, [roles.length]);

  /* skill bars observer */
  useEffect(() => {
    const el = skillsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVisible(true); }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* stats observer */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* custom cursor */
  useEffect(() => {
    let mx = -100, my = -100, cx = -100, cy = -100;
    let raf;
    const move = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', move);
    const tick = () => {
      cx += (mx - cx) * 0.14;
      cy += (my - cy) * 0.14;
      if (cursorRef.current)  { cursorRef.current.style.left  = cx + 'px'; cursorRef.current.style.top  = cy + 'px'; }
      if (cursorDot.current)  { cursorDot.current.style.left  = mx + 'px'; cursorDot.current.style.top  = my + 'px'; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  /* scroll reveal — attach class when element enters viewport */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  /* cursor scale on links/buttons */
  const onLinkEnter = useCallback(() => { if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%,-50%) scale(2.2)'; }, []);
  const onLinkLeave = useCallback(() => { if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%,-50%) scale(1)'; }, []);

  /* ── data ── */
  const seasonData   = [{ label:'Spring',value:63},{label:'Summer',value:78},{label:'Fall',value:95},{label:'Winter',value:70}];
  const categoryData = [{ label:'Clothing',value:95},{label:'Accessories',value:54},{label:'Footwear',value:38},{label:'Outerwear',value:26}];
  const seasonMax    = Math.max(...seasonData.map(d=>d.value));
  const catMax       = Math.max(...categoryData.map(d=>d.value));

  const designProjects = [
    { id:1, title:'Student Productivity App', type:'Figma', image:require('./assets/CanvaProjects/Screenshot (163).png'), link:'https://www.figma.com/design/9AN12VWa8q48xnQNiP6e1a/Student-Productivity-Mobile-App?node-id=0-1&t=GP7vZeqr7U7ziFdI-1' },
    { id:2, title:'Lapollo — Rental App',     type:'Figma', image:require('./assets/CanvaProjects/Lapollo Figma.png'),       link:'https://www.figma.com/proto/bavypqiMfRtNmkDjfuJazk/Lapollo?node-id=22-263&p=f&t=VKD1ns8N8TNrAnOh-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=22%3A263' },
    { id:3, title:'F1 Driver Posters',        type:'Canva', image:require('./assets/CanvaProjects/LEWIS.png'),               link:'https://www.canva.com/design/DAG-ZeyheM8/Pu1HD066H0IVCdNk0qQHUw/edit?utm_content=DAG-ZeyheM8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton' },
    { id:4, title:'Anime Character Series',   type:'Canva', image:require('./assets/CanvaProjects/Untitled design (2).png'), link:'https://www.canva.com/design/DAG9cRoTw2c/Acn8M3tcb6MZ5qyDgr2QOw/edit?utm_content=DAG9cRoTw2c&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton' },
    { id:5, title:'Vision Board 2026',        type:'Canva', image:require('./assets/CanvaProjects/Vision Board.png'),        link:'#' },
    { id:6, title:'Marvel Poster',            type:'Canva', image:require('./assets/CanvaProjects/MARVEL.png'),              link:'#' },
  ];

  const showData   = activeFilter !== 'design';
  const showDesign = activeFilter !== 'data';

  const tools = ['Figma','Python','Power BI','Canva','SQL','Excel','Pandas','Seaborn','Matplotlib','UI Design','Data Viz','Prototyping','Jupyter','NumPy'];

  const designSkills = [{ skill:'UI/UX Design',level:85},{ skill:'Figma & Prototyping',level:80},{ skill:'Visual Design (Canva)',level:75},{ skill:'Wireframing',level:70}];
  const dataSkills   = [{ skill:'Excel',level:80},{ skill:'Python (Pandas/Matplotlib)',level:65},{ skill:'Power BI',level:60},{ skill:'SQL',level:55}];

  return (
    <div style={{ backgroundColor:BG, color:'#fff', minHeight:'100vh', cursor:'none' }}>

      {/* ── CUSTOM CURSOR ── */}
      <div ref={cursorRef} style={{ position:'fixed', width:36, height:36, borderRadius:'50%', border:`1.5px solid ${CYAN}`, pointerEvents:'none', zIndex:9999, transform:'translate(-50%,-50%)', transition:'transform 0.2s ease', left:-100, top:-100, mixBlendMode:'screen' }} />
      <div ref={cursorDot}  style={{ position:'fixed', width:5,  height:5,  borderRadius:'50%', background:`linear-gradient(135deg,${CYAN},${PINK})`, pointerEvents:'none', zIndex:9999, transform:'translate(-50%,-50%)', left:-100, top:-100, boxShadow:`0 0 8px ${CYAN}` }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family:'Poppins',sans-serif; box-sizing:border-box; }
        a, button { cursor:none !important; }

        /* ── scrollbar ── */
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:${BG}; }
        ::-webkit-scrollbar-thumb { background:${CYAN}; border-radius:3px; }

        /* ── scroll reveal ── */
        .reveal { opacity:0; transform:translateY(32px); transition:opacity 0.7s ease, transform 0.7s ease; }
        .reveal.revealed { opacity:1; transform:translateY(0); }
        .reveal-delay-1 { transition-delay:0.1s; }
        .reveal-delay-2 { transition-delay:0.2s; }
        .reveal-delay-3 { transition-delay:0.32s; }

        /* ── ticker ── */
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker-track { display:flex; width:max-content; animation:ticker 30s linear infinite; }
        .ticker-track:hover { animation-play-state:paused; }

        /* ── rotating ring ── */
        @keyframes spin-ring { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .spin-ring { position:absolute; inset:-5px; border-radius:50%; background:conic-gradient(transparent 0deg,${CYAN} 60deg,${PINK} 120deg,transparent 180deg); animation:spin-ring 8s linear infinite; }

        /* ── role fade ── */
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .role-anim { animation:fadeUp 0.4s ease forwards; }

        /* ── glow pulse on profile ring ── */
        @keyframes glow-pulse { 0%,100%{box-shadow:0 0 20px rgba(98,95,255,0.3)} 50%{box-shadow:0 0 45px rgba(234,72,132,0.4)} }
        .profile-glow { animation:glow-pulse 3s ease infinite; border-radius:50%; }

        /* ── social icon ── */
        .soc-icon { width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:transparent;border:1px solid rgba(0,238,255,0.25);color:#aaa;transition:all 0.2s ease; }
        .soc-icon:hover { background:${CYAN};border-color:${CYAN};color:${BG};box-shadow:0 0 14px rgba(0,238,255,0.5); }

        /* ── service card ── */
        .svc-card { border-radius:16px;padding:2.5rem;background:${CARD};border:1px solid transparent;transition:all 0.25s ease; }
        .svc-card:hover { border-color:${CYAN};transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,238,255,0.08); }

        /* ── skill bar ── */
        .skill-bg { height:10px;border-radius:999px;background:rgba(255,255,255,0.06);overflow:hidden; }
        .skill-fill { height:100%;border-radius:999px;background:${CYAN};width:0%;transition:width 1.1s cubic-bezier(0.4,0,0.2,1); }
        .skill-fill.show { width:var(--lv); }

        /* ── filter btn ── */
        .filter-btn { padding:8px 22px;border-radius:999px;font-size:13px;font-weight:600;cursor:none;transition:all 0.2s ease; }
        .filter-btn.active { background:${CYAN};color:${BG};border:none; }
        .filter-btn.inactive { background:transparent;color:#aaa;border:1px solid rgba(255,255,255,0.15); }
        .filter-btn.inactive:hover { border-color:${CYAN};color:${CYAN}; }

        /* ── cta btns ── */
        .btn-cyan { display:inline-flex;align-items:center;gap:8px;padding:12px 28px;border-radius:999px;background:${CYAN};color:${BG};font-size:14px;font-weight:700;transition:all 0.2s;border:none; }
        .btn-cyan:hover { opacity:0.85;box-shadow:0 0 24px rgba(0,238,255,0.35);transform:translateY(-2px); }
        .btn-outline { display:inline-flex;align-items:center;gap:8px;padding:12px 28px;border-radius:999px;background:transparent;color:#fff;font-size:14px;font-weight:600;border:2px solid rgba(255,255,255,0.4);transition:all 0.2s; }
        .btn-outline:hover { background:#fff;color:${BG};transform:translateY(-2px); }

        /* ── Swiper cards ── */
        .swiper { width:100%;padding-bottom:52px !important; }
        .swiper-slide { border-radius:16px;overflow:hidden;position:relative;cursor:none; }
        .swiper-slide img { display:block;width:100%;height:100%;object-fit:cover;transition:transform 0.5s ease; }
        .swiper-slide:hover img { transform:scale(1.08); }

        .card-bottom { position:absolute;bottom:0;left:0;right:0;padding:1.4rem 1.2rem;background:linear-gradient(to top,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.6) 55%,transparent 100%);transition:opacity 0.35s ease; }
        .swiper-slide:hover .card-bottom { opacity:0; }

        .card-hover-overlay { position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.25),${CYAN});transform:translateY(100%);transition:transform 0.5s ease;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:10px;padding:2rem 1.5rem; }
        .swiper-slide:hover .card-hover-overlay { transform:translateY(0); }

        .swiper-pagination-bullet { background:${CYAN} !important;opacity:0.3; }
        .swiper-pagination-bullet-active { opacity:1 !important; }

        /* ── data project standalone card (same hover as swiper slides) ── */
        .data-proj-card { position:relative;overflow:hidden;border-radius:16px;cursor:none; }
        .data-proj-card:hover .card-bottom  { opacity:0; }
        .data-proj-card:hover .card-hover-overlay { transform:translateY(0); }
        .data-proj-card:hover .dash-bar { filter:brightness(1.25); }

        /* ── stat card ── */
        .stat-card { background:${CARD};border-radius:16px;padding:28px 24px;border:1px solid rgba(0,238,255,0.08);transition:all 0.25s ease; }
        .stat-card:hover { border-color:rgba(0,238,255,0.35);box-shadow:0 0 30px rgba(0,238,255,0.07);transform:translateY(-3px); }

        /* ── hero subtle grid ── */
        .hero-grid {
          position:absolute;inset:0;pointer-events:none;
          background-image:linear-gradient(rgba(98,95,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(98,95,255,0.06) 1px,transparent 1px);
          background-size:60px 60px;
          mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 100%);
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:50,backgroundColor:'rgba(8,27,41,0.92)',backdropFilter:'blur(14px)',borderBottom:'1px solid rgba(0,238,255,0.08)',padding:'0 5%' }}>
        <div style={{ maxWidth:1200,margin:'0 auto',padding:'18px 0',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
          <span style={{ fontSize:22,fontWeight:800,color:'#fff',letterSpacing:'-0.01em' }}>
            Immaculate<span style={{ color:CYAN }}>.</span>
          </span>
          <div className="hidden md:flex" style={{ gap:36 }}>
            {['Home','Work','About','Contact'].map(item => (
              <a key={item} href={item==='Home'?'#':`#${item.toLowerCase()}`}
                style={{ fontSize:14,fontWeight:500,color:'#b0b8d4',transition:'color 0.2s' }}
                onMouseEnter={e=>{e.target.style.color=CYAN;onLinkEnter();}}
                onMouseLeave={e=>{e.target.style.color='#b0b8d4';onLinkLeave();}}
              >{item}</a>
            ))}
          </div>
          <a href="mailto:immaculatemuli25@gmail.com?subject=Inquiry" className="btn-cyan hidden md:inline-flex" style={{ padding:'10px 24px',fontSize:13 }}
            onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}
          >Hire Me</a>
          <button onClick={()=>setMenuOpen(!menuOpen)} className="md:hidden" style={{ color:'#aaa',background:'none',border:'none' }}
            onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}
          >{menuOpen?<X size={22}/>:<Menu size={22}/>}</button>
        </div>
        {menuOpen && (
          <div style={{ padding:'12px 5% 20px',borderTop:'1px solid rgba(255,255,255,0.06)',backgroundColor:'rgba(8,27,41,0.98)' }}>
            {['Work','About','Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={()=>setMenuOpen(false)}
                style={{ display:'block',padding:'12px 0',fontSize:14,color:'#b0b8d4',borderBottom:'1px solid rgba(255,255,255,0.05)' }}
              >{item}</a>
            ))}
            <a href="mailto:immaculatemuli25@gmail.com" className="btn-cyan" style={{ marginTop:16,justifyContent:'center',width:'100%' }}>Hire Me</a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh',display:'flex',alignItems:'center',padding:'100px 5% 60px',maxWidth:1200,margin:'0 auto',position:'relative' }}>
        <div className="hero-grid" />
        <div style={{ display:'grid',gridTemplateColumns:'1fr auto',gap:60,alignItems:'center',width:'100%',position:'relative',zIndex:1 }}>
          <div>
            <p className="reveal" style={{ fontSize:18,fontWeight:500,color:'#b0b8d4',marginBottom:12 }}>Hello, I'm</p>
            <h1 className="reveal reveal-delay-1" style={{ fontSize:'clamp(2.6rem,6vw,5rem)',fontWeight:900,color:'#fff',lineHeight:1.05,marginBottom:12,letterSpacing:'-0.02em',fontVariantNumeric:'tabular-nums' }}>
              {heroName || <span style={{ opacity:0 }}>Immaculate Muli</span>}
            </h1>
            <div key={roleIndex} className="role-anim reveal reveal-delay-2" style={{ display:'flex',alignItems:'center',gap:10,marginBottom:24 }}>
              <span style={{ background:`linear-gradient(90deg,${CYAN},${PINK})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontSize:'clamp(1.3rem,3vw,2.2rem)',fontWeight:700 }}>{roles[roleIndex]}</span>
            </div>
            <p className="reveal reveal-delay-2" style={{ fontSize:15,lineHeight:1.85,color:'#8892b0',maxWidth:500,marginBottom:36 }}>
              I design interfaces that people enjoy using and analyze data to find what the numbers are really trying to say. Doing both at once — Figma for UI/UX, Python and Power BI for data analysis.
            </p>
            <div className="reveal reveal-delay-3" style={{ display:'flex',gap:14,flexWrap:'wrap',marginBottom:40 }}>
              <a href="#work" className="btn-cyan" onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>See My Work <ArrowRight size={16}/></a>
              <a href="/Immaculate Muli.pdf" download="Immaculate Muli.pdf" className="btn-outline" onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>Download CV</a>
            </div>
            <div className="reveal reveal-delay-3" style={{ display:'flex',gap:12 }}>
              {[{icon:Github,href:'https://github.com/muliimmaculate',label:'GitHub'},{icon:Linkedin,href:'https://www.linkedin.com/in/immaculate-muli',label:'LinkedIn'},{icon:Mail,href:'mailto:immaculatemuli25@gmail.com',label:'Email'}].map((s,i)=>(
                <a key={i} href={s.href} target={s.label!=='Email'?'_blank':undefined} rel={s.label!=='Email'?'noopener noreferrer':undefined}
                  className="soc-icon" title={s.label} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}
                ><s.icon size={18}/></a>
              ))}
            </div>
          </div>
          {/* Circular profile with rotating ring */}
          <div className="hidden md:block profile-glow reveal" style={{ position:'relative',width:340,height:340,flexShrink:0 }}>
            <div className="spin-ring"/>
            <div style={{ position:'absolute',inset:5,borderRadius:'50%',overflow:'hidden',backgroundColor:CARD }}>
              <img src={require('./assets/profile.jpg')} alt="Immaculate Muli" style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 15%' }}/>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ overflow:'hidden',borderTop:`1px solid rgba(0,238,255,0.1)`,borderBottom:`1px solid rgba(0,238,255,0.1)`,padding:'14px 0' }}>
        <div className="ticker-track">
          {[...tools,...tools].map((t,i)=>(
            <span key={i} style={{ margin:'0 20px',fontSize:12,fontWeight:700,letterSpacing:'0.12em',color:i%6===0?CYAN:'rgba(255,255,255,0.1)' }}>{t.toUpperCase()} /</span>
          ))}
        </div>
      </div>

      {/* ── WHAT I DO ── */}
      <section style={{ padding:'90px 5%',maxWidth:1200,margin:'0 auto' }}>
        <div className="reveal" style={{ textAlign:'center',marginBottom:56 }}>
          <h2 style={{ fontSize:12,fontWeight:700,letterSpacing:'0.14em',color:CYAN,marginBottom:12,textTransform:'uppercase' }}>What I Do</h2>
          <p style={{ fontSize:'clamp(1.9rem,4vw,2.8rem)',fontWeight:800,color:'#fff',lineHeight:1.2 }}>Two disciplines, one creative mind.</p>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:24 }}>
          {[
            { icon:Palette, title:'UI/UX & Visual Design', desc:'Designing clean, intuitive interfaces in Figma — from wireframes to polished prototypes. Bold visual work in Canva that tells a story.', tools:['Figma','Canva','Prototyping','Wireframing','Visual Design'], delay:'reveal-delay-1' },
            { icon:BarChart2, title:'Data Analysis', desc:'Turning raw data into clear insight using Python, Excel, SQL and Power BI. End-to-end analysis: cleaning, EDA, visualizations, dashboards.', tools:['Python','Excel','Power BI','SQL','Pandas','Seaborn'], delay:'reveal-delay-2' },
          ].map((svc,i)=>(
            <div key={i} className={`svc-card reveal ${svc.delay}`}>
              <div style={{ width:60,height:60,borderRadius:14,backgroundColor:'rgba(0,238,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:24 }}>
                <svc.icon size={28} color={CYAN}/>
              </div>
              <h3 style={{ fontSize:20,fontWeight:700,color:'#fff',marginBottom:12 }}>{svc.title}</h3>
              <p style={{ fontSize:14,lineHeight:1.8,color:'#8892b0',marginBottom:20 }}>{svc.desc}</p>
              <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
                {svc.tools.map(t=>(
                  <span key={t} style={{ padding:'4px 12px',borderRadius:999,fontSize:12,fontWeight:600,backgroundColor:'rgba(0,238,255,0.07)',color:CYAN,border:`1px solid rgba(0,238,255,0.18)` }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section ref={skillsRef} style={{ padding:'90px 5%',backgroundColor:'rgba(0,0,0,0.18)' }}>
        <div style={{ maxWidth:1200,margin:'0 auto' }}>
          <div className="reveal" style={{ textAlign:'center',marginBottom:56 }}>
            <h2 style={{ fontSize:12,fontWeight:700,letterSpacing:'0.14em',color:CYAN,marginBottom:12,textTransform:'uppercase' }}>Skills</h2>
            <p style={{ fontSize:'clamp(1.9rem,4vw,2.8rem)',fontWeight:800,color:'#fff' }}>My Toolkit</p>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:28 }}>
            {[{ label:'Design Skills',items:designSkills },{ label:'Data Skills',items:dataSkills }].map((group,gi)=>(
              <div key={gi} className={`reveal reveal-delay-${gi+1}`} style={{ backgroundColor:CARD,borderRadius:16,padding:'2rem' }}>
                <h3 style={{ fontSize:16,fontWeight:700,color:CYAN,marginBottom:28,letterSpacing:'0.08em',textTransform:'uppercase' }}>{group.label}</h3>
                <div style={{ display:'flex',flexDirection:'column',gap:22 }}>
                  {group.items.map(item=>(
                    <div key={item.skill}>
                      <div style={{ display:'flex',justifyContent:'space-between',marginBottom:8 }}>
                        <span style={{ fontSize:13,fontWeight:500,color:'#ccd6f6' }}>{item.skill}</span>
                        <span style={{ fontSize:12,fontWeight:600,color:CYAN }}>{item.level}%</span>
                      </div>
                      <div className="skill-bg">
                        <div className={`skill-fill${skillsVisible?' show':''}`} style={{ '--lv':`${item.level}%` }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="work" style={{ padding:'90px 5%',maxWidth:1200,margin:'0 auto' }}>
        <div className="reveal" style={{ textAlign:'center',marginBottom:48 }}>
          <h2 style={{ fontSize:12,fontWeight:700,letterSpacing:'0.14em',color:CYAN,marginBottom:12,textTransform:'uppercase' }}>Portfolio</h2>
          <p style={{ fontSize:'clamp(1.9rem,4vw,2.8rem)',fontWeight:800,color:'#fff',marginBottom:32 }}>Selected Work</p>
          <div style={{ display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap' }}>
            {[{id:'all',label:'All'},{id:'design',label:'Design'},{id:'data',label:'Data Analysis'}].map(f=>(
              <button key={f.id} onClick={()=>setActiveFilter(f.id)} className={`filter-btn ${activeFilter===f.id?'active':'inactive'}`}
                onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}
              >{f.label}</button>
            ))}
          </div>
        </div>

        {/* DATA PROJECT — visual card with Boineelo hover */}
        {showData && (
          <div className="reveal data-proj-card" style={{ height:420, marginBottom:28, backgroundColor:CARD }}>

            {/* ── Dashboard visual background ── */}
            <div style={{ position:'absolute',inset:0,background:`linear-gradient(135deg,${BG} 0%,#0d2137 60%,#081b29 100%)`,overflow:'hidden',padding:'32px 36px' }}>
              {/* subtle grid */}
              <div style={{ position:'absolute',inset:0,backgroundImage:`linear-gradient(rgba(0,238,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,238,255,0.04) 1px,transparent 1px)`,backgroundSize:'40px 40px',opacity:0.6 }}/>

              {/* top bar */}
              <div style={{ position:'relative',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28 }}>
                <div>
                  <p style={{ fontSize:10,fontWeight:700,letterSpacing:'0.14em',color:CYAN,marginBottom:4 }}>RETAIL ANALYSIS · KAGGLE DATASET</p>
                  <p style={{ fontSize:16,fontWeight:800,color:'#fff' }}>Consumer Behaviour Dashboard</p>
                </div>
                <div style={{ display:'flex',gap:8 }}>
                  {[{v:'3,900',l:'Records'},{v:'18',l:'Variables'},{v:'4',l:'Categories'}].map(k=>(
                    <div key={k.l} style={{ padding:'8px 14px',borderRadius:10,background:'rgba(0,238,255,0.07)',border:'1px solid rgba(0,238,255,0.15)',textAlign:'center' }}>
                      <div style={{ fontSize:14,fontWeight:800,color:CYAN,lineHeight:1 }}>{k.v}</div>
                      <div style={{ fontSize:9,color:'#3a5070',marginTop:3 }}>{k.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* charts row */}
              <div style={{ position:'relative',display:'grid',gridTemplateColumns:'1fr 1fr',gap:24 }}>

                {/* Seasonal bar chart */}
                <div>
                  <p style={{ fontSize:9,fontWeight:700,letterSpacing:'0.12em',color:'#3a5070',marginBottom:12 }}>REVENUE BY SEASON</p>
                  <div style={{ display:'flex',alignItems:'flex-end',gap:8,height:100 }}>
                    {seasonData.map(d=>(
                      <div key={d.label} style={{ flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:5 }}>
                        <div className="dash-bar" style={{ width:'100%',borderRadius:'4px 4px 0 0',height:`${(d.value/seasonMax)*82}px`,background:d.label==='Fall'?`linear-gradient(to top,${CYAN},rgba(0,238,255,0.5))`:'rgba(0,238,255,0.12)',boxShadow:d.label==='Fall'?`0 0 16px rgba(0,238,255,0.35)`:'none',transition:'filter 0.3s' }}/>
                        <span style={{ fontSize:8,color:d.label==='Fall'?CYAN:'#2a4060',fontWeight:d.label==='Fall'?700:400 }}>{d.label.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category breakdown */}
                <div>
                  <p style={{ fontSize:9,fontWeight:700,letterSpacing:'0.12em',color:'#3a5070',marginBottom:12 }}>REVENUE BY CATEGORY</p>
                  <div style={{ display:'flex',flexDirection:'column',gap:9 }}>
                    {categoryData.map((d,i)=>(
                      <div key={d.label}>
                        <div style={{ display:'flex',justifyContent:'space-between',marginBottom:4 }}>
                          <span style={{ fontSize:10,color:i===0?'#ccd6f6':'#4a6080' }}>{d.label}</span>
                          <span style={{ fontSize:10,fontWeight:700,color:i===0?CYAN:'#2a4060' }}>{Math.round((d.value/catMax)*100)}%</span>
                        </div>
                        <div style={{ height:5,borderRadius:999,background:'rgba(255,255,255,0.05)' }}>
                          <div className="dash-bar" style={{ height:'100%',borderRadius:999,width:`${(d.value/catMax)*100}%`,background:i===0?`linear-gradient(90deg,${CYAN},rgba(0,238,255,0.5))`:'rgba(0,238,255,0.15)',transition:'filter 0.3s' }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* tech pills row */}
              <div style={{ position:'relative',display:'flex',gap:6,flexWrap:'wrap',marginTop:24 }}>
                {['Python','Pandas','SQL','Matplotlib','Seaborn','Power BI','Jupyter','NumPy'].map(t=>(
                  <span key={t} style={{ fontSize:9,padding:'3px 9px',borderRadius:999,background:'rgba(0,238,255,0.06)',color:'rgba(0,238,255,0.5)',border:'1px solid rgba(0,238,255,0.12)' }}>{t}</span>
                ))}
              </div>
            </div>

            {/* always-visible bottom badge + title */}
            <div className="card-bottom">
              <div style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'4px 12px',borderRadius:999,background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.08)',marginBottom:8 }}>
                <span style={{ width:7,height:7,borderRadius:'50%',backgroundColor:CYAN,display:'inline-block' }}/>
                <span style={{ fontSize:10,fontWeight:700,color:'rgba(255,255,255,0.9)',letterSpacing:'0.1em' }}>DATA ANALYSIS</span>
              </div>
              <p style={{ fontSize:15,fontWeight:700,color:'#fff',lineHeight:1.35 }}>Retail Consumer Behaviour Analysis</p>
            </div>

            {/* slide-up hover overlay (Boineelo style) */}
            <div className="card-hover-overlay">
              <p style={{ fontSize:11,fontWeight:700,letterSpacing:'0.12em',color:'rgba(0,0,0,0.75)',textTransform:'uppercase' }}>Data Analysis · Python · Power BI</p>
              <p style={{ fontSize:15,fontWeight:700,color:'#fff',textAlign:'center',lineHeight:1.35 }}>Retail Consumer Behaviour Analysis</p>
              <p style={{ fontSize:13,color:'rgba(255,255,255,0.8)',textAlign:'center',lineHeight:1.6,maxWidth:460 }}>
                End-to-end analysis of 3,900 customer records — data cleaning, EDA, SQL queries, Python visualizations, and a Power BI dashboard. Found that Clothing dominates revenue and Fall is the peak season.
              </p>
              <a
                href="https://github.com/immaculatemuli/retail-consumer-behaviour-analysis"
                target="_blank" rel="noopener noreferrer"
                onClick={e=>e.stopPropagation()}
                style={{ width:52,height:52,borderRadius:'50%',backgroundColor:'#fff',color:BG,display:'flex',alignItems:'center',justifyContent:'center',marginTop:8,transition:'transform 0.2s',flexShrink:0 }}
                onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.15)';onLinkEnter();}}
                onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';onLinkLeave();}}
              ><Github size={22}/></a>
            </div>
          </div>
        )}

        {/* DESIGN — Swiper coverflow */}
        {showDesign && (
          <div className="reveal">
            <Swiper
              modules={[EffectCoverflow, Pagination, Autoplay]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{ rotate:30,stretch:0,depth:120,modifier:1,slideShadows:true }}
              pagination={{ clickable:true }}
              autoplay={{ delay:3200,disableOnInteraction:false,pauseOnMouseEnter:true }}
              loop={true}
            >
              {designProjects.map(p=>(
                <SwiperSlide key={p.id} style={{ width:280,height:380,backgroundColor:CARD }}>
                  <img src={p.image} alt={p.title} style={{ width:'100%',height:'100%',objectFit:'cover' }}/>
                  <div className="card-bottom">
                    <div style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'4px 12px',borderRadius:999,background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.08)',marginBottom:8 }}>
                      <span style={{ width:7,height:7,borderRadius:'50%',backgroundColor:CYAN,display:'inline-block' }}/>
                      <span style={{ fontSize:10,fontWeight:700,color:'rgba(255,255,255,0.9)',letterSpacing:'0.1em',textTransform:'uppercase' }}>{p.type}</span>
                    </div>
                    <p style={{ fontSize:14,fontWeight:700,color:'#fff',lineHeight:1.35 }}>{p.title}</p>
                  </div>
                  <div className="card-hover-overlay">
                    <p style={{ fontSize:11,fontWeight:700,letterSpacing:'0.12em',color:'rgba(0,0,0,0.75)',textTransform:'uppercase' }}>{p.type}</p>
                    <p style={{ fontSize:14,fontWeight:700,color:'#fff',textAlign:'center',lineHeight:1.4 }}>{p.title}</p>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                      style={{ width:46,height:46,borderRadius:'50%',backgroundColor:'#fff',color:BG,display:'flex',alignItems:'center',justifyContent:'center',marginTop:6,transition:'transform 0.2s' }}
                      onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.15)';onLinkEnter();}}
                      onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';onLinkLeave();}}
                    ><ArrowUpRight size={20}/></a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding:'90px 5%',backgroundColor:'rgba(0,0,0,0.18)' }}>
        <div style={{ maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center' }}>
          <div>
            <h2 className="reveal" style={{ fontSize:12,fontWeight:700,letterSpacing:'0.14em',color:CYAN,marginBottom:12,textTransform:'uppercase' }}>About Me</h2>
            <p className="reveal reveal-delay-1" style={{ fontSize:'clamp(1.9rem,4vw,2.8rem)',fontWeight:800,color:'#fff',lineHeight:1.2,marginBottom:24 }}>
              Designer.<br/>Analyst.<br/><span style={{ color:CYAN }}>Both.</span>
            </p>
            <div className="reveal reveal-delay-2" style={{ display:'flex',flexDirection:'column',gap:16,fontSize:14,lineHeight:1.9,color:'#8892b0' }}>
              <p>I got into design because I liked making things look right. I got into data because I wanted to understand why things work. Turns out both ask the same question — what's actually going on here?</p>
              <p>Currently doing both at once: Figma for interfaces, Python and Excel for analysis, Power BI for dashboards. Building at the intersection of the two.</p>
            </div>
            <div className="reveal reveal-delay-3" style={{ display:'flex',gap:12,marginTop:32,flexWrap:'wrap' }}>
              {[{icon:Github,label:'GitHub',url:'https://github.com/muliimmaculate'},{icon:Linkedin,label:'LinkedIn',url:'https://www.linkedin.com/in/immaculate-muli'},{icon:Mail,label:'Email',url:'mailto:immaculatemuli25@gmail.com'}].map((s,i)=>(
                <a key={i} href={s.url} target={s.label!=='Email'?'_blank':undefined} rel={s.label!=='Email'?'noopener noreferrer':undefined}
                  className="soc-icon" title={s.label} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}
                ><s.icon size={18}/></a>
              ))}
            </div>
          </div>
          <div ref={statsRef} style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
            {[{num:20,suffix:'+',label:'Design Projects'},{num:2,suffix:'',label:'Disciplines'},{num:10,suffix:'+',label:'Case Studies'},{num:5,suffix:'+',label:'Tools Mastered'}].map((s,i)=>(
              <div key={s.label} className={`stat-card reveal reveal-delay-${i+1}`}>
                <div style={{ fontSize:42,fontWeight:900,color:CYAN,lineHeight:1 }}>
                  <StatNum value={s.num} suffix={s.suffix} isVisible={statsVisible}/>
                </div>
                <div style={{ fontSize:13,color:'#8892b0',marginTop:8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:'90px 5%',maxWidth:800,margin:'0 auto',textAlign:'center' }}>
        <h2 className="reveal" style={{ fontSize:12,fontWeight:700,letterSpacing:'0.14em',color:CYAN,marginBottom:12,textTransform:'uppercase' }}>Contact</h2>
        <p className="reveal reveal-delay-1" style={{ fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:900,color:'#fff',lineHeight:1.15,marginBottom:20 }}>Let's Work Together.</p>
        <p className="reveal reveal-delay-2" style={{ fontSize:15,lineHeight:1.8,color:'#8892b0',marginBottom:40,maxWidth:480,margin:'0 auto 40px' }}>
          Open to freelance, internships, and full-time roles in design and data analysis. If you have something interesting, reach out.
        </p>
        <div className="reveal reveal-delay-3" style={{ display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap' }}>
          <a href="mailto:immaculatemuli25@gmail.com?subject=Hey" className="btn-cyan" onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}><Mail size={16}/> Get in Touch</a>
          <a href="/Immaculate Muli.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline" onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>View Resume</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:'24px 5%',borderTop:'1px solid rgba(255,255,255,0.06)',backgroundColor:'rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12 }}>
          <span style={{ fontSize:16,fontWeight:800,color:'rgba(255,255,255,0.15)' }}>Immaculate<span style={{ color:'rgba(0,238,255,0.3)' }}>.</span></span>
          <span style={{ fontSize:12,color:'rgba(255,255,255,0.12)' }}>© 2026 Immaculate Muli</span>
          <div style={{ display:'flex',gap:14 }}>
            {[{icon:Github,href:'https://github.com/muliimmaculate'},{icon:Linkedin,href:'https://www.linkedin.com/in/immaculate-muli'},{icon:Mail,href:'mailto:immaculatemuli25@gmail.com'}].map((s,i)=>(
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ color:'rgba(255,255,255,0.2)',transition:'color 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.color=CYAN;onLinkEnter();}}
                onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.2)';onLinkLeave();}}
              ><s.icon size={16}/></a>
            ))}
          </div>
        </div>
      </footer>

      {scrollY > 400 && (
        <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
          style={{ position:'fixed',bottom:24,right:24,zIndex:50,width:42,height:42,borderRadius:'50%',backgroundColor:CYAN,color:BG,border:'none',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 0 16px rgba(0,238,255,0.4)`,cursor:'none' }}
          onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}
        ><ArrowUp size={18}/></button>
      )}
    </div>
  );
}
