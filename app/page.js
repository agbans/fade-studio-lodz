"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const PHONE_DISPLAY = "+48 453 129 228";
const PHONE_TEL = "+48453129228";
const PHONE_WA = "48453129228";
const ADDRESS = "ul. Piotrkowska 100, 90-001 Łódź";
const MAPS_EMBED =
  "https://www.google.com/maps?q=Piotrkowska+100,+%C5%81%C3%B3d%C5%BA&output=embed";
const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=Piotrkowska+100+%C5%81%C3%B3d%C5%BA";

const IMG = {
  hero: "/images/hero.jpg",
  about: "/images/about.jpg",
  gallery1: "/images/gallery-1.jpg",
  gallery2: "/images/gallery-2.jpg",
  gallery3: "/images/gallery-3.jpg",
  barber1: "/images/barber-1.jpg",
  barber2: "/images/barber-2.jpg",
  barber3: "/images/barber-3.jpg",
  barber4: "/images/barber-4.jpg",
};

const COLORS = {
  ink: "#141413",
  surface: "#F4F2EE",
  paper: "#FFFFFF",
  gold: "#1F4D3A",
  goldDim: "#163829",
  gray: "#6B6963",
  white: "#FFFFFF",
};

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onOver = (e) => {
      const target = e.target.closest("a, button, [data-cursor-hover]");
      setHovering(!!target);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: hovering ? 44 : 10,
        height: hovering ? 44 : 10,
        borderRadius: "50%",
        backgroundColor: hovering ? "transparent" : COLORS.gold,
        border: hovering ? `1.5px solid ${COLORS.gold}` : "none",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        transition:
          "width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), background-color 0.25s ease, border-color 0.25s ease",
        mixBlendMode: "difference",
      }}
    />
  );
}

function CountUpStat({ target, decimals = 0, suffix = "", label }) {
  const [value, setValue] = useState(0);
  const ref = (node) => {
    if (!node || node._observed) return;
    node._observed = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const duration = 1400;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(target * eased);
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
  };

  return (
    <div ref={ref}>
      <div
        style={{
          fontFamily: "'Bebas Neue', Inter, sans-serif",
          fontSize: "clamp(48px, 8vw, 72px)",
          color: COLORS.ink,
          lineHeight: 1,
        }}
      >
        {value.toFixed(decimals)}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: COLORS.gray,
          marginTop: 10,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false);
  const ref = (node) => {
    if (!node || node._observed) return;
    node._observed = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function GoldRule({ width = 64 }) {
  return (
    <div
      style={{
        width,
        height: 1,
        backgroundColor: COLORS.gold,
        margin: "0 auto",
      }}
    />
  );
}

function MagneticButton({ children, style, ...props }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.25, y: y * 0.35 });
  };
  const onMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <a
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 && offset.y === 0
          ? "transform 0.4s cubic-bezier(0.16,1,0.3,1)"
          : "transform 0.1s ease-out",
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function CallWhatsRow({ size = "normal", onDark = true }) {
  const isBig = size === "big";
  const [hoverCall, setHoverCall] = useState(false);
  const [hoverWa, setHoverWa] = useState(false);
  const outlineColor = onDark ? COLORS.paper : COLORS.ink;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 14,
        justifyContent: "center",
      }}
    >
      <MagneticButton
        href={`tel:${PHONE_TEL}`}
        onMouseEnter={() => setHoverCall(true)}
        onMouseLeave={() => setHoverCall(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: COLORS.gold,
          color: COLORS.ink,
          textDecoration: "none",
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: isBig ? 15 : 14,
          letterSpacing: 0.6,
          textTransform: "uppercase",
          padding: isBig ? "17px 32px" : "13px 24px",
          borderRadius: 2,
          opacity: hoverCall ? 0.88 : 1,
        }}
      >
        Zadzwoń teraz
      </MagneticButton>
      <a
        href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(
          "Cześć, chcę umówić wizytę w Fade Studio Łódź"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHoverWa(true)}
        onMouseLeave={() => setHoverWa(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "transparent",
          color: outlineColor,
          textDecoration: "none",
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: isBig ? 15 : 14,
          letterSpacing: 0.6,
          textTransform: "uppercase",
          padding: isBig ? "16px 30px" : "12px 22px",
          borderRadius: 2,
          border: `1px solid ${hoverWa ? COLORS.gold : (onDark ? "rgba(245,243,238,0.35)" : "rgba(12,12,13,0.25)")}`,
          transition: "border-color 0.2s ease",
        }}
      >
        WhatsApp
      </a>
    </div>
  );
}

function ServiceRow({ s, i, total }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 12,
        padding: "22px 4px",
        borderBottom: i === total - 1 ? "none" : `1px solid rgba(20,20,19,0.12)`,
        transform: hover ? "translateX(6px)" : "translateX(0)",
        transition: "transform 0.25s ease",
      }}
    >
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 16,
          fontWeight: 400,
          color: hover ? COLORS.gold : COLORS.ink,
          transition: "color 0.25s ease",
        }}
      >
        {s.name}
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 15,
          fontWeight: 500,
          color: COLORS.gray,
          whiteSpace: "nowrap",
        }}
      >
        {s.price}
      </span>
    </div>
  );
}

function AboutPhoto() {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 3",
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid rgba(20,20,19,0.12)`,
      }}
    >
      <Image
        src={IMG.about}
        alt="Barber wykonujący precyzyjny fade za pomocą maszynki"
        fill
        sizes="(max-width: 768px) 100vw, 460px"
        style={{
          objectFit: "cover",
          transform: hover ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.5s ease",
        }}
      />
    </div>
  );
}

function GalleryPhoto({ g }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 3",
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid rgba(20,20,19,0.12)`,
        cursor: "pointer",
      }}
    >
      <Image
        src={g.src}
        alt={g.alt}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
        style={{
          objectFit: "cover",
          transform: hover ? "scale(1.08)" : "scale(1)",
          filter: hover ? "brightness(1.06)" : "brightness(1)",
          transition: "transform 0.5s ease, filter 0.5s ease",
        }}
      />
    </div>
  );
}

function OpenStatus() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const day = now.getDay(); // 0 = Sunday, 1-6 = Mon-Sat
  const hour = now.getHours();
  const minute = now.getMinutes();
  const isOpen = day !== 0 && hour >= 9 && hour < 19;

  const timeStr = now.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateStr = now.toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "Inter, sans-serif",
        fontSize: 12,
        color: COLORS.gray,
        marginBottom: 10,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: isOpen ? "#6FAE7A" : "#B8554A",
          boxShadow: isOpen
            ? "0 0 6px rgba(111,174,122,0.6)"
            : "0 0 6px rgba(184,85,74,0.5)",
        }}
      />
      <span style={{ fontWeight: 600, color: isOpen ? "#6FAE7A" : "#B8554A" }}>
        {isOpen ? "Otwarte teraz" : "Zamknięte teraz"}
      </span>
      <span style={{ opacity: 0.6 }}>
        · {dateStr}, {timeStr}
      </span>
    </div>
  );
}

function Logo({ light = true }) {
  const color = light ? COLORS.paper : COLORS.ink;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="2.4" stroke={COLORS.gold} strokeWidth="1.6" />
        <circle cx="6" cy="18" r="2.4" stroke={COLORS.gold} strokeWidth="1.6" />
        <path
          d="M7.8 7.6L19 18M19 6L7.8 16.4"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span
        style={{
          fontFamily: "'Bebas Neue', Inter, sans-serif",
          fontSize: 20,
          letterSpacing: 1,
          color,
          lineHeight: 1,
        }}
      >
        FADE STUDIO
      </span>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkStyle = {
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.paper,
    textDecoration: "none",
    opacity: 0.85,
    letterSpacing: 0.2,
  };

  const navLinks = [
    { href: "#cennik", label: "Cennik" },
    { href: "#galeria", label: "Galeria" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        backgroundColor: scrolled ? "rgba(12,12,13,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(245,243,238,0.1)"
          : "1px solid transparent",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="#" style={{ textDecoration: "none" }}>
          <Logo light />
        </a>

        <div
          style={{
            display: "none",
            gap: 28,
            alignItems: "center",
          }}
          className="nav-links-desktop"
        >
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} style={linkStyle}>
              {l.label}
            </a>
          ))}
        </div>

        <div
          style={{ display: "none", alignItems: "center" }}
          className="nav-cta-desktop"
        >
          <a
            href={`tel:${PHONE_TEL}`}
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: 0.6,
              textTransform: "uppercase",
              color: COLORS.ink,
              backgroundColor: COLORS.gold,
              textDecoration: "none",
              padding: "11px 22px",
              borderRadius: 2,
            }}
          >
            Umów się
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          className="nav-toggle-mobile"
          style={{
            display: "inline-flex",
            background: "none",
            border: "none",
            color: COLORS.paper,
            fontSize: 22,
            cursor: "pointer",
            padding: 4,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="nav-toggle-mobile"
          style={{
            backgroundColor: "rgba(12,12,13,0.97)",
            borderTop: "1px solid rgba(245,243,238,0.1)",
            padding: "14px 20px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ ...linkStyle, fontSize: 16 }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .nav-links-desktop { display: flex !important; }
          .nav-cta-desktop { display: flex !important; }
          .nav-toggle-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

function ServiceCategoryTile_UNUSED_REMOVE_MARKER() {}

function BarberRoster() {
  const barbers = [
    { name: "Marek", role: "Founder · Fade specjalista", img: IMG.barber1 },
    { name: "Tomek", role: "Klasyczne strzyżenia", img: IMG.barber2 },
    { name: "Kuba", role: "Broda & golenie", img: IMG.barber3 },
    { name: "Adrian", role: "Fade & teksturyzacja", img: IMG.barber4 },
  ];
  return (
    <div style={{ marginTop: 72, maxWidth: 1040, margin: "72px auto 0" }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: COLORS.gold,
          marginBottom: 24,
          padding: "0 24px",
        }}
      >
        Zespół
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          padding: "0 24px",
        }}
      >
        {barbers.map((b) => (
          <BarberCard key={b.name} barber={b} />
        ))}
      </div>
    </div>
  );
}

function BarberCard({ barber }) {
  const [hover, setHover] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 10 });
  };
  const onLeave = () => {
    setHover(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      data-cursor-hover
      onMouseEnter={() => setHover(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      style={{
        width: "100%",
        aspectRatio: "3 / 4",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: COLORS.ink,
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hover ? "scale(1.03)" : "scale(1)"}`,
        transformStyle: "preserve-3d",
        transition: hover
          ? "transform 0.1s ease-out"
          : "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: hover
          ? "0 24px 40px -12px rgba(20,20,19,0.35)"
          : "0 4px 12px -4px rgba(20,20,19,0.1)",
      }}
    >
      <Image
        src={barber.img}
        alt={`${barber.name} — ${barber.role}`}
        fill
        sizes="(max-width: 768px) 50vw, 240px"
        style={{
          objectFit: "cover",
          objectPosition: "center 20%",
          filter: hover ? "grayscale(0)" : "grayscale(0.55)",
          transform: hover ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(20,20,19,0.05) 40%, rgba(20,20,19,0.9) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "20px 18px",
          transform: hover ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            fontFamily: "'Bebas Neue', Inter, sans-serif",
            fontSize: 24,
            color: COLORS.paper,
            letterSpacing: 0.5,
            lineHeight: 1,
          }}
        >
          {barber.name}
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            color: "rgba(244,242,238,0.7)",
            marginTop: 6,
          }}
        >
          {barber.role}
        </div>
      </div>
    </div>
  );
}

function ReviewsCarousel() {
  const reviews = [
    {
      name: "Michał K.",
      text: "W końcu fade, który trzyma formę dłużej niż tydzień. Czysta robota, bez pośpiechu.",
    },
    {
      name: "Paweł S.",
      text: "Umówiłem się przez WhatsApp wieczorem, następnego dnia byłem ostrzyżony. Prosto i bez zamieszania.",
    },
    {
      name: "Adam W.",
      text: "Pierwszy raz czułem, że barber faktycznie słucha, czego chcę, zamiast robić swoje.",
    },
    {
      name: "Kamil R.",
      text: "Atmosfera jak u znajomego, ale poziom wykończenia jak w dobrym salonie w centrum.",
    },
    {
      name: "Łukasz N.",
      text: "Broda przycięta tak, że nareszcie pasuje do kształtu twarzy. Wracam co miesiąc.",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        overflowX: "auto",
        padding: "32px 24px 8px",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {reviews.map((r) => (
        <div
          key={r.name}
          style={{
            flex: "0 0 auto",
            width: 280,
            backgroundColor: COLORS.surface,
            border: `1px solid rgba(20,20,19,0.08)`,
            padding: 28,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', Inter, sans-serif",
              fontSize: 18,
              color: COLORS.gold,
              marginBottom: 14,
              letterSpacing: 2,
            }}
          >
            ★★★★★
          </div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: COLORS.ink,
              opacity: 0.85,
              fontSize: 14,
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            {r.text}
          </p>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: COLORS.gray,
            }}
          >
            {r.name}
          </div>
        </div>
      ))}
    </div>
  );
}

function TreatmentsTabs() {
  const categories = [
    {
      label: "Strzyżenie",
      desc: "Klasyczne cięcia i ostre fade'y, dopasowane do kształtu twarzy.",
      img: IMG.gallery2,
    },
    {
      label: "Broda",
      desc: "Trymowanie, golenie brzytwą na gorąco, pełna stylizacja.",
      img: IMG.about,
    },
    {
      label: "Pełny zestaw",
      desc: "Strzyżenie, broda i mycie — kompletna sesja bez pośpiechu.",
      img: IMG.gallery3,
    },
  ];
  const [active, setActive] = useState(0);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        gap: 40,
        alignItems: "center",
      }}
      className="treatments-grid"
    >
      <div>
        {categories.map((cat, i) => {
          const isActive = i === active;
          return (
            <div
              key={cat.label}
              data-cursor-hover
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              style={{
                position: "relative",
                padding: "22px 0 22px 18px",
                borderBottom: `1px solid rgba(20,20,19,0.1)`,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  backgroundColor: COLORS.gold,
                  transform: isActive ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: "top",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: isActive ? COLORS.gold : "rgba(20,20,19,0.3)",
                    transition: "color 0.3s ease",
                  }}
                >
                  0{i + 1}
                </span>
                <span
                  style={{
                    fontFamily: "'Bebas Neue', Inter, sans-serif",
                    fontSize: "clamp(30px, 5vw, 44px)",
                    color: isActive ? COLORS.ink : "rgba(20,20,19,0.3)",
                    letterSpacing: 0.5,
                    transition: "color 0.3s ease",
                  }}
                >
                  {cat.label}
                </span>
              </div>
              <div
                style={{
                  maxHeight: isActive ? 60 : 0,
                  opacity: isActive ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.4s ease, opacity 0.3s ease",
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: COLORS.gray,
                    marginTop: 10,
                    marginLeft: 38,
                    maxWidth: 360,
                    lineHeight: 1.6,
                  }}
                >
                  {cat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
        }}
      >
        {categories.map((cat, i) => (
          <Image
            key={cat.label}
            src={cat.img}
            alt={cat.label}
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            style={{
              objectFit: "cover",
              opacity: i === active ? 1 : 0,
              transform: i === active ? "scale(1.06)" : "scale(1)",
              transition: "opacity 0.6s ease, transform 8s cubic-bezier(0.16,1,0.3,1)",
              position: "absolute",
              inset: 0,
            }}
          />
        ))}
      </div>

      <style>{`
        @media (min-width: 860px) {
          .treatments-grid {
            grid-template-columns: 0.8fr 1.2fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    const t = setTimeout(() => setHeroLoaded(true), 80);

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let onMove;
    if (!isTouch) {
      onMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        setParallax({ x, y });
      };
      window.addEventListener("mousemove", onMove);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
      if (onMove) window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const services = [
    { name: "Strzyżenie męskie (fade)", price: "60 zł" },
    { name: "Strzyżenie + broda", price: "90 zł" },
    { name: "Trymowanie brody", price: "40 zł" },
    { name: "Strzyżenie dziecięce (do 12 lat)", price: "45 zł" },
    { name: "Pełna stylizacja (strzyżenie + broda + mycie)", price: "110 zł" },
    { name: "Golenie brzytwą na gorąco", price: "55 zł" },
  ];

  const gallery = [
    { src: IMG.gallery1, alt: "Fade Studio Łódź — strefa oczekiwania z zabytkowymi narzędziami na ścianie" },
    { src: IMG.gallery2, alt: "Fade Studio Łódź — rząd foteli barberskich" },
    { src: IMG.gallery3, alt: "Fade Studio Łódź — narzędzia fryzjerskie zbliżenie" },
  ];

  return (
    <div
      style={{
        fontFamily: "Inter, -apple-system, sans-serif",
        backgroundColor: COLORS.paper,
        color: COLORS.ink,
        margin: 0,
        width: "100%",
        overflowX: "hidden",
      }}
      className="fade-studio-root"
    >
      <CustomCursor />
      <Navbar />

      {/* Sticky mobile call bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: scrolled ? "flex" : "none",
          backgroundColor: COLORS.surface,
          padding: "12px 16px",
          gap: 10,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.4)",
          borderTop: `1px solid rgba(20,20,19,0.1)`,
        }}
      >
        <a
          href={`tel:${PHONE_TEL}`}
          style={{
            flex: 1,
            textAlign: "center",
            backgroundColor: COLORS.gold,
            color: COLORS.ink,
            textDecoration: "none",
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
            padding: "13px 0",
            borderRadius: 2,
            fontSize: 13,
            letterSpacing: 0.4,
            textTransform: "uppercase",
          }}
        >
          Zadzwoń
        </a>
        <a
          href={`https://wa.me/${PHONE_WA}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            textAlign: "center",
            backgroundColor: "transparent",
            color: COLORS.ink,
            textDecoration: "none",
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
            padding: "12px 0",
            borderRadius: 2,
            fontSize: 13,
            letterSpacing: 0.4,
            textTransform: "uppercase",
            border: `1px solid rgba(20,20,19,0.25)`,
          }}
        >
          WhatsApp
        </a>
      </div>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "100px 20px 60px",
          backgroundColor: COLORS.ink,
          overflow: "hidden",
        }}
      >
        <Image
          src={IMG.hero}
          alt="Wnętrze barbershopu Fade Studio Łódź"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            zIndex: 0,
            opacity: 0.5,
            transform: `scale(1.08) translate(${parallax.x * -10}px, ${parallax.y * -10}px)`,
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(180deg, rgba(12,12,13,0.55) 0%, rgba(12,12,13,0.45) 40%, rgba(12,12,13,0.9) 100%), radial-gradient(circle at 75% 15%, rgba(201,162,39,0.12), transparent 50%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              color: COLORS.gold,
              fontWeight: 600,
              letterSpacing: 3,
              fontSize: 12,
              textTransform: "uppercase",
              marginBottom: 18,
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s",
            }}
          >
            Barber Łódź · Piotrkowska
          </div>

          <h1
            style={{
              fontFamily: "'Bebas Neue', Inter, sans-serif",
              fontSize: "clamp(56px, 13vw, 132px)",
              lineHeight: 0.92,
              color: COLORS.paper,
              margin: 0,
              maxWidth: 900,
              letterSpacing: 0.5,
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s",
            }}
          >
            Fade'y warte czekania
          </h1>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: COLORS.paper,
              opacity: heroLoaded ? 0.8 : 0,
              fontSize: 17,
              maxWidth: 480,
              marginTop: 20,
              marginBottom: 36,
              lineHeight: 1.6,
              marginLeft: "auto",
              marginRight: "auto",
              transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.34s, transform 0.7s ease 0.34s",
            }}
          >
            Bez kolejki, bez czekania w niepewności. Umów się jednym telefonem
            lub wiadomością na WhatsApp i wyjdź z fryzurą, która trzyma formę
            przez tygodnie.
          </p>

          <div
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.48s, transform 0.6s ease 0.48s",
            }}
          >
            <CallWhatsRow size="big" />
          </div>

          <div
            style={{
              marginTop: 36,
              display: "flex",
              gap: 0,
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              color: COLORS.gray,
              opacity: heroLoaded ? 1 : 0,
              fontSize: 12,
              letterSpacing: 0.4,
              fontFamily: "'JetBrains Mono', monospace",
              transform: heroLoaded ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s",
            }}
          >
            <span>4.9 / 5 lokalnych opinii</span>
            <span style={{ margin: "0 14px", color: COLORS.gold }}>·</span>
            <span>ul. Piotrkowska, Łódź</span>
            <span style={{ margin: "0 14px", color: COLORS.gold }}>·</span>
            <span>Pon–Sob 9:00–19:00</span>
          </div>
        </div>
      </section>

      <div style={{ padding: "48px 0" }}><GoldRule /></div>

      {/* STATS */}
      <section style={{ padding: "0 24px 100px", maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 32,
              textAlign: "center",
            }}
          >
            <CountUpStat target={4.9} decimals={1} label="Opinie Google" />
            <CountUpStat target={8} suffix="+" label="Lat doświadczenia" />
            <CountUpStat target={3} label="Barberów na miejscu" />
          </div>
        </Reveal>
      </section>

      <div style={{ padding: "0 0 48px" }}><GoldRule /></div>

      {/* SERVICES */}
      <section
        id="cennik"
        style={{
          padding: "120px 24px 0",
          maxWidth: 1080,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: COLORS.gold,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Usługi
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', Inter, sans-serif",
              fontSize: "clamp(34px, 6vw, 52px)",
              color: COLORS.ink,
              marginBottom: 56,
              letterSpacing: 0.5,
              lineHeight: 1.05,
              textAlign: "center",
            }}
          >
            Dopasowane do Ciebie
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <TreatmentsTabs />
        </Reveal>

        <div style={{ maxWidth: 640, margin: "100px auto 0", paddingBottom: 120 }}>
          <Reveal>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: COLORS.gray,
                marginBottom: 40,
                fontSize: 15,
                lineHeight: 1.6,
                textAlign: "center",
              }}
            >
              Pełny cennik — tak jak na tablicy w zakładzie, bez ukrytych dopłat.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              {services.map((s, i) => (
                <ServiceRow key={s.name} s={s} i={i} total={services.length} />
              ))}
            </div>
          </Reveal>

          <div style={{ marginTop: 48, textAlign: "center" }}>
            <CallWhatsRow onDark={false} />
          </div>
        </div>
      </section>

      <div style={{ padding: "48px 0" }}><GoldRule /></div>

      {/* DETAIL */}
      <section style={{ padding: "0 24px 100px", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: COLORS.gold,
              marginBottom: 16,
            }}
          >
            Drobny szczegół
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', Inter, sans-serif",
              fontSize: "clamp(28px, 5vw, 38px)",
              color: COLORS.ink,
              marginBottom: 18,
              letterSpacing: 0.5,
              lineHeight: 1.1,
            }}
          >
            Kawa, póki czekasz
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: COLORS.gray,
              fontSize: 16,
              lineHeight: 1.8,
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Świeża kawa parzona na miejscu — bo dobre strzyżenie to nie tylko
            nożyczki i maszynka, to też dziesięć minut, w których możesz
            się po prostu zatrzymać.
          </p>
        </Reveal>
      </section>

      <div style={{ padding: "0 0 48px" }}><GoldRule /></div>

      {/* ABOUT */}
      <section
        style={{
          backgroundColor: COLORS.surface,
          padding: "120px 24px",
        }}
      >
        <Reveal>
          <div
            style={{
              maxWidth: 1040,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr)",
              gap: 56,
            }}
            className="about-grid"
          >
            <AboutPhoto />

            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: COLORS.gold,
                  marginBottom: 16,
                }}
              >
                Kto tnie
              </div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', Inter, sans-serif",
                  fontSize: "clamp(32px, 6vw, 46px)",
                  color: COLORS.ink,
                  marginBottom: 24,
                  letterSpacing: 0.5,
                  lineHeight: 1.05,
                }}
              >
                Rzemiosło, nie pośpiech
              </h2>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: COLORS.gray,
                  fontSize: 16,
                  lineHeight: 1.8,
                  marginBottom: 18,
                }}
              >
                Cześć, tu Fade Studio. Strzygę w Łodzi od lat i widziałem już
                chyba każdy fryzurowy kryzys przed weselem, rozmową o pracę czy
                randką. Nie robię &quot;szybko i byle jak&quot; — siadasz na
                fotelu, gadamy chwilę o tym, co chcesz osiągnąć, i wychodzisz z
                czymś, co faktycznie pasuje do kształtu Twojej twarzy, nie do
                zdjęcia z Instagrama, które akurat było modne w zeszłym
                miesiącu.
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: COLORS.gray,
                  fontSize: 16,
                  lineHeight: 1.8,
                }}
              >
                Zakład jest mały, kameralny, bez korporacyjnego zgiełku.
                Klienci wracają, bo wiedzą, czego się spodziewać — i bo zawsze
                umawiamy się prosto: telefon albo WhatsApp, żadnych dziwnych
                formularzy.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <BarberRoster />
        </Reveal>
      </section>

      <div style={{ padding: "48px 0" }}><GoldRule /></div>

      {/* GALLERY */}
      <section
        id="galeria"
        style={{
          padding: "120px 24px",
          maxWidth: 1080,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: COLORS.gold,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Galeria
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', Inter, sans-serif",
              fontSize: "clamp(32px, 6vw, 48px)",
              color: COLORS.ink,
              marginBottom: 14,
              letterSpacing: 0.5,
              textAlign: "center",
              lineHeight: 1.05,
            }}
          >
            U nas w środku
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: COLORS.gray,
              marginBottom: 56,
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Tak wygląda nasz zakład — wpadnij i zobacz sam.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={i * 0.12}>
              <GalleryPhoto g={g} />
            </Reveal>
          ))}
        </div>
      </section>

      <div style={{ padding: "48px 0" }}><GoldRule /></div>

      {/* REVIEWS */}
      <section style={{ padding: "100px 0 120px" }}>
        <Reveal>
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: COLORS.gold,
                marginBottom: 16,
              }}
            >
              Opinie
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', Inter, sans-serif",
                fontSize: "clamp(32px, 6vw, 46px)",
                color: COLORS.ink,
                marginBottom: 8,
                letterSpacing: 0.5,
                lineHeight: 1.05,
              }}
            >
              Co mówią klienci
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: COLORS.gray,
                fontSize: 13,
                marginBottom: 0,
              }}
            >
              Przykładowe opinie — wersja demonstracyjna.
            </p>
          </div>
        </Reveal>

        <ReviewsCarousel />
      </section>

      {/* SEO SECTION */}
      <section
        style={{
          padding: "100px 24px",
          maxWidth: 680,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <h2
            style={{
              fontFamily: "'Bebas Neue', Inter, sans-serif",
              fontSize: "clamp(28px, 5vw, 38px)",
              color: COLORS.ink,
              marginBottom: 20,
              letterSpacing: 0.5,
              lineHeight: 1.1,
            }}
          >
            Barber Łódź — Twoja okolica
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: COLORS.gray,
              fontSize: 16,
              lineHeight: 1.8,
            }}
          >
            Szukasz <strong style={{ color: COLORS.ink }}>barbera w Łodzi</strong>,
            który zrobi Ci porządny fade bez losowości? Fade Studio Łódź to
            lokalny zakład fryzjerski specjalizujący się w{" "}
            <strong style={{ color: COLORS.ink }}>strzyżeniu męskim</strong>,{" "}
            <strong style={{ color: COLORS.ink }}>strzyżeniu Łódź</strong> dla
            klientów z całego miasta oraz{" "}
            <strong style={{ color: COLORS.ink }}>trymowaniu brody w Łodzi</strong>.
            Niezależnie czy szukasz klasycznego cięcia, ostrego fade&apos;a, czy
            stylizacji brody przed ważnym wydarzeniem — jesteśmy minutę od
            centrum, w pełni dostępni telefonicznie i przez WhatsApp.
          </p>
        </Reveal>
      </section>

      <div style={{ padding: "48px 0" }}><GoldRule /></div>

      {/* MAP */}
      <section
        id="mapa"
        style={{
          padding: "120px 24px",
          maxWidth: 760,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Reveal>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: COLORS.gold,
              marginBottom: 16,
            }}
          >
            Lokalizacja
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', Inter, sans-serif",
              fontSize: "clamp(32px, 6vw, 46px)",
              color: COLORS.ink,
              marginBottom: 10,
              letterSpacing: 0.5,
              lineHeight: 1.05,
            }}
          >
            Znajdź nas
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: COLORS.gray,
              marginBottom: 40,
              fontSize: 16,
            }}
          >
            {ADDRESS}
          </p>

          <div
            style={{
              borderRadius: 4,
              overflow: "hidden",
              border: `1px solid rgba(20,20,19,0.12)`,
              marginBottom: 28,
              filter: "grayscale(0.4) contrast(1.05)",
            }}
          >
            <iframe
              title="Fade Studio Łódź — mapa"
              src={MAPS_EMBED}
              width="100%"
              height="320"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: 0.6,
              textTransform: "uppercase",
              color: COLORS.ink,
              textDecoration: "none",
              border: `1px solid rgba(20,20,19,0.25)`,
              padding: "13px 26px",
              borderRadius: 2,
            }}
          >
            Otwórz w Google Maps →
          </a>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section
        id="kontakt"
        style={{
          backgroundColor: COLORS.surface,
          padding: "130px 24px",
          textAlign: "center",
        }}
      >
        <Reveal>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: COLORS.gold,
              marginBottom: 18,
            }}
          >
            Rezerwacja
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', Inter, sans-serif",
              fontSize: "clamp(36px, 8vw, 60px)",
              color: COLORS.ink,
              marginBottom: 14,
              letterSpacing: 0.5,
              lineHeight: 1,
            }}
          >
            Umów się dziś
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: COLORS.ink,
              opacity: 0.7,
              fontSize: 17,
              marginBottom: 6,
            }}
          >
            {PHONE_DISPLAY}
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: COLORS.gray,
              fontSize: 14,
              marginBottom: 44,
            }}
          >
            Pon–Sob: 9:00–19:00 · Niedziela: zamknięte
          </p>

          <CallWhatsRow size="big" onDark={false} />
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: COLORS.ink,
          padding: "72px 24px 32px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: 48,
          }}
          className="footer-grid"
        >
          <div>
            <Logo light />
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: "rgba(244,242,238,0.5)",
                fontSize: 13,
                marginTop: 16,
                lineHeight: 1.6,
                maxWidth: 240,
              }}
            >
              Świeże fade&apos;y i nowoczesne strzyżenia w Łodzi.
            </p>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: COLORS.gold,
                marginBottom: 14,
              }}
            >
              Adres
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                color: COLORS.paper,
                fontSize: 14,
                lineHeight: 1.7,
              }}
            >
              {ADDRESS}
            </div>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: 8,
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: "rgba(244,242,238,0.5)",
                textDecoration: "none",
              }}
            >
              Wyznacz trasę →
            </a>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: COLORS.gold,
                marginBottom: 14,
              }}
            >
              Godziny
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                color: COLORS.paper,
                fontSize: 14,
                lineHeight: 1.7,
              }}
            >
              Pon–Sob: 9:00–19:00
              <br />
              Niedziela: zamknięte
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: COLORS.gold,
                marginBottom: 14,
              }}
            >
              Nawigacja
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { href: "#cennik", label: "Cennik" },
                { href: "#galeria", label: "Galeria" },
                { href: "#kontakt", label: "Kontakt" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: COLORS.paper,
                    textDecoration: "none",
                  }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1100,
            margin: "56px auto 0",
            paddingTop: 24,
            borderTop: `1px solid rgba(244,242,238,0.1)`,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <OpenStatus />
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: COLORS.gray,
              fontSize: 12,
              margin: 0,
              letterSpacing: 0.3,
            }}
          >
            © {new Date().getFullYear()} Fade Studio Łódź
          </p>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .footer-grid {
              grid-template-columns: 1.4fr 1fr 1fr 1fr !important;
            }
          }
        `}</style>
      </footer>

      <div style={{ height: 60 }} />

      <style>{`
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 460px 1fr !important;
            align-items: center;
          }
        }
        @media (pointer: fine) {
          .fade-studio-root, .fade-studio-root * {
            cursor: none !important;
          }
        }
      `}</style>
    </div>
  );
}
