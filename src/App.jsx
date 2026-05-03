import { useEffect, useRef, useState } from "react";
import "./App.css";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "React.js", level: 90 },
  { name: "Node.js", level: 80 },
  { name: "JavaScript", level: 92 },
  { name: "Tailwind CSS", level: 88 },
  { name: "MongoDB", level: 75 },
  { name: "Express.js", level: 78 },
];

const PROJECTS = [
  {
    title: "Eliaselitaxservices",
    desc: "Full-stack MERN app with payment integration, admin dashboard & real-time updates.",
    tags: ["React", "Node.js", "MongoDB"],
    color: "#7c3aed",
     link: "https://www.eliaselitaxservices.com"
  },
  {
    title: "Zenithflowbot",
    desc: "Real-time chat app powered by OpenAI API with streaming responses and auth.",
    tags: ["React", "OpenAI", "Socket.io"],
    color: "#0ea5e9",
    link:"https://zenithflowbot.com"
  },
  {
    title: "Glowera-frontend",
    desc: "Analytics dashboard with dynamic charts, dark mode and role-based access control.",
    tags: ["React", "Chart.js", "Express"],
    color: "#10b981",
    link: "https://glowera-frontend.vercel.app/"
  },
  {
    title: "Amazest",
    desc: "Headless CMS-powered portfolio with dynamic content management and SEO optimization.",
    tags: ["Next.js", "Sanity", "Tailwind"],
    color: "#f59e0b",
    link:"https://amazest.netlify.app/"
    
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function SkillBar({ name, level, inView }) {
  return (
    <div className="skill-item">
      <div className="skill-header">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ width: inView ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`project-card ${inView ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.1}s`, "--accent": project.color }}
    >
      <div className="card-glow" style={{ background: project.color }} />
      <h3>{project.title}</h3>
      <p>{project.desc}</p>
      <div className="tags">
        {project.tags.map((t) => (
          <span
            key={t}
            className="tag"
            style={{ borderColor: project.color, color: project.color }}
          >
            {t}
          </span>
        ))}
      </div>
      <button className="card-btn" style={{ background: project.color }}
        onClick={() => window.open(project.link, "_blank")}>
        View Project →
      </button>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [typed, setTyped] = useState("");
  const [skillsRef, skillsInView] = useInView();
  const [aboutRef, aboutInView] = useInView();
  const [contactRef, contactInView] = useInView();

  const roles = [
    "Full Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Freelancer",
  ];
  const roleIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = () => {
      const current = roles[roleIndex.current];
      if (!deleting.current) {
        setTyped(current.slice(0, charIndex.current + 1));
        charIndex.current++;
        if (charIndex.current === current.length) {
          deleting.current = true;
          setTimeout(tick, 1500);
          return;
        }
      } else {
        setTyped(current.slice(0, charIndex.current - 1));
        charIndex.current--;
        if (charIndex.current === 0) {
          deleting.current = false;
          roleIndex.current = (roleIndex.current + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting.current ? 60 : 100);
    };
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <div className="portfolio">
      {/* Animated BG */}
      <div className="bg-orbs">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />
      </div>

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          <span className="logo-dot" />
          Fareen<span className="logo-accent">Dev</span>
        </div>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button
                className={active === l ? "nav-active" : ""}
                onClick={() => scrollTo(l)}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>
        <button className="hire-btn" onClick={() => scrollTo("Contact")}>
          Hire Me
        </button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Hero */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <p className="hero-greeting">👋 Hello, I'm</p>
          <h1 className="hero-name">
            Fareen <span className="gradient-text">Zahid</span>
          </h1>
          <h2 className="hero-role">
            <span className="typed">{typed}</span>
            <span className="cursor">|</span>
          </h2>
          <p className="hero-desc">
            I craft high-performance web applications with clean code and
            stunning UI. Turning ideas into digital reality — one pixel at a
            time.
          </p>
          <div className="hero-btns">
            <button
              className="btn-primary"
              onClick={() => scrollTo("Projects")}
            >
              View My Work
            </button>
            <button className="btn-outline" onClick={() => scrollTo("Contact")}>
              Let's Talk
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span>2+</span>
              <p>Years Exp.</p>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span>20+</span>
              <p>Projects</p>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span>15+</span>
              <p>Clients</p>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="avatar-ring">
            <div className="avatar-inner">
              <span>F</span>
            </div>
            <div className="ring ring1" />
            <div className="ring ring2" />
            <div className="floating-badge badge1">React</div>
            <div className="floating-badge badge2">Node.js</div>
            <div className="floating-badge badge3">MongoDB</div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <p>Scroll Down</p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section">
        <div
          ref={aboutRef}
          className={`about-container ${aboutInView ? "visible" : ""}`}
        >
          <div className="section-tag">About Me</div>
          <h2 className="section-title">Who Am I?</h2>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">💻</div>
              <h3>Developer</h3>
              <p>
                I build scalable, fast and beautiful web applications using
                modern technologies like React, Node.js and MongoDB.
              </p>
            </div>
            <div className="about-card">
              <div className="about-icon">🎨</div>
              <h3>Designer</h3>
              <p>
                I care deeply about UI/UX. Every pixel matters. I create
                interfaces that are both functional and visually stunning.
              </p>
            </div>
            <div className="about-card">
              <div className="about-icon">🚀</div>
              <h3>Freelancer</h3>
              <p>
                Available for freelance projects. I deliver on time, communicate
                clearly and always exceed client expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="skills-section">
        <div className="section-tag">My Skills</div>
        <h2 className="section-title">What I Work With</h2>
        <div ref={skillsRef} className="skills-grid">
          {SKILLS.map((s) => (
            <SkillBar key={s.name} {...s} inView={skillsInView} />
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="projects-section">
        <div className="section-tag">Portfolio</div>
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div
          ref={contactRef}
          className={`contact-container ${contactInView ? "visible" : ""}`}
        >
          <div className="section-tag">Contact</div>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="contact-sub">
            Have a project in mind? Let's build something amazing together.
          </p>
          <a href="tel:+923057975627" className="contact-phone">
            📞 +92 305 7975627
          </a>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
            </div>
            <input type="text" placeholder="Subject" required />
            <textarea
              placeholder="Tell me about your project..."
              rows={5}
              required
            />
            <button type="submit" className="btn-primary submit-btn">
              Send Message 🚀
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          Designed & Built by{" "}
          <span className="gradient-text">Fareen Zahid</span>
        </p>
        <a href="tel:+923057975627" className="footer-phone">📞 +92 305 7975627</a>
        <p className="footer-sub">© 2025 All rights reserved.</p>
      </footer>

      {/* WhatsApp Fixed Button */}
      <a
        href="https://wa.me/923057975627"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-btn"
      >
        <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.675 4.797 1.849 6.785L2 30l7.43-1.818A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.826-1.594l-.418-.248-4.33 1.06 1.094-4.2-.272-.432A11.46 11.46 0 0 1 4.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.61c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.546-.172-.776.172-.23.344-.89 1.118-1.09 1.348-.2.23-.4.258-.744.086-.344-.172-1.452-.535-2.766-1.707-1.022-.912-1.712-2.037-1.912-2.381-.2-.344-.021-.53.15-.701.155-.154.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.43-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.672-.564-.58-.776-.59l-.66-.011c-.23 0-.603.086-.918.43-.316.344-1.205 1.177-1.205 2.87s1.233 3.328 1.405 3.558c.172.23 2.427 3.706 5.88 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.036-.832 2.323-1.635.287-.803.287-1.491.2-1.635-.086-.143-.316-.23-.66-.402z"/>
        </svg>
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
