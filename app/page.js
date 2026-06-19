"use client";

import { useEffect, useState } from "react";
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
};

const COLORS = {
  ink: "#1A1A1A",
  paper: "#F2EDE4",
  red: "#C9402A",
  green: "#2B4A3E",
  gray: "#8A8378",
  white: "#FFFFFF",
};

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

function StripeDivider({ height = 10 }) {
  return (
    <div
      style={{
        height,
        width: "100%",
        backgroundImage: `repeating-linear-gradient(45deg, ${COLORS.red} 0px, ${COLORS.red} 14px, ${COLORS.paper} 14px, ${COLORS.paper} 28px, ${COLORS.green} 28px, ${COLORS.green} 42px, ${COLORS.paper} 42px, ${COLORS.paper} 56px)`,
      }}
    />
  );
}

function CallWhatsRow({ size = "normal" }) {
  const isBig = size === "big";
  const [hoverCall, setHoverCall] = useState(false);
  const [hoverWa, setHoverWa] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        justifyContent: "center",
      }}
    >
      <a
        href={`tel:${PHONE_TEL}`}
        onMouseEnter={() => setHoverCall(true)}
        onMouseLeave={() => setHoverCall(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: COLORS.red,
          color: COLORS.white,
          textDecoration: "none",
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: isBig ? 18 : 16,
          padding: isBig ? "16px 28px" : "13px 22px",
          borderRadius: 4,
          letterSpacing: 0.2,
          boxShadow: hoverCall
            ? "0 6px 0 rgba(0,0,0,0.25)"
            : "0 4px 0 rgba(0,0,0,0.25)",
          transform: hoverCall ? "translateY(-2px)" : "translateY(0)",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
        }}
      >
        <span aria-hidden="true">📞</span> Zadzwoń teraz
      </a>
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
          backgroundColor: COLORS.green,
          color: COLORS.white,
          textDecoration: "none",
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: isBig ? 18 : 16,
          padding: isBig ? "16px 28px" : "13px 22px",
          borderRadius: 4,
          letterSpacing: 0.2,
          boxShadow: hoverWa
            ? "0 6px 0 rgba(0,0,0,0.25)"
            : "0 4px 0 rgba(0,0,0,0.25)",
          transform: hoverWa ? "translateY(-2px)" : "translateY(0)",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
        }}
      >
        <span aria-hidden="true">💬</span> WhatsApp
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
        padding: "16px 20px",
        backgroundColor: hover ? "rgba(201,64,42,0.05)" : "transparent",
        borderBottom: i === total - 1 ? "none" : "1px dashed rgba(26,26,26,0.15)",
        transform: hover ? "translateX(4px)" : "translateX(0)",
        transition: "background-color 0.2s ease, transform 0.2s ease",
      }}
    >
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 15,
          fontWeight: 500,
          color: COLORS.ink,
        }}
      >
        {s.name}
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 16,
          fontWeight: 700,
          color: COLORS.red,
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
        border: `1px solid rgba(242,237,228,0.12)`,
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
        border: `1px solid rgba(26,26,26,0.08)`,
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
          backgroundColor: isOpen ? "#3FA34D" : COLORS.red,
          boxShadow: isOpen
            ? "0 0 6px rgba(63,163,77,0.7)"
            : "0 0 6px rgba(201,64,42,0.5)",
        }}
      />
      <span style={{ fontWeight: 600, color: isOpen ? "#3FA34D" : COLORS.red }}>
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
        <circle cx="6" cy="6" r="2.4" stroke={COLORS.red} strokeWidth="1.6" />
        <circle cx="6" cy="18" r="2.4" stroke={COLORS.red} strokeWidth="1.6" />
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
        backgroundColor: scrolled ? "rgba(26,26,26,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(242,237,228,0.1)"
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
          style={{ display: "none", gap: 10, alignItems: "center" }}
          className="nav-cta-desktop"
        >
          <a
            href={`tel:${PHONE_TEL}`}
            aria-label="Zadzwoń"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: COLORS.red,
              color: COLORS.white,
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            📞
          </a>
          <a
            href={`https://wa.me/${PHONE_WA}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: COLORS.green,
              color: COLORS.white,
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            💬
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
            backgroundColor: "rgba(26,26,26,0.97)",
            borderTop: "1px solid rgba(242,237,228,0.1)",
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

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    const t = setTimeout(() => setHeroLoaded(true), 80);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
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
    >
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
          backgroundColor: COLORS.ink,
          padding: "10px 14px",
          gap: 10,
          boxShadow: "0 -4px 16px rgba(0,0,0,0.3)",
        }}
      >
        <a
          href={`tel:${PHONE_TEL}`}
          style={{
            flex: 1,
            textAlign: "center",
            backgroundColor: COLORS.red,
            color: COLORS.white,
            textDecoration: "none",
            fontWeight: 700,
            fontFamily: "Inter, sans-serif",
            padding: "12px 0",
            borderRadius: 4,
            fontSize: 15,
          }}
        >
          📞 Zadzwoń
        </a>
        <a
          href={`https://wa.me/${PHONE_WA}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            textAlign: "center",
            backgroundColor: COLORS.green,
            color: COLORS.white,
            textDecoration: "none",
            fontWeight: 700,
            fontFamily: "Inter, sans-serif",
            padding: "12px 0",
            borderRadius: 4,
            fontSize: 15,
          }}
        >
          💬 WhatsApp
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
            opacity: 0.38,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(180deg, rgba(26,26,26,0.65) 0%, rgba(26,26,26,0.55) 40%, rgba(26,26,26,0.85) 100%), radial-gradient(circle at 30% 20%, rgba(201,64,42,0.22), transparent 55%), radial-gradient(circle at 80% 80%, rgba(43,74,62,0.3), transparent 55%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              color: COLORS.red,
              fontWeight: 700,
              letterSpacing: 3,
              fontSize: 13,
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
              fontSize: "clamp(42px, 11vw, 88px)",
              lineHeight: 0.98,
              color: COLORS.paper,
              margin: 0,
              maxWidth: 760,
              letterSpacing: 0.5,
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s",
            }}
          >
            ŚWIEŻE FADE'Y I NOWOCZESNE
            <br />
            STRZYŻENIA W ŁODZI
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
              marginTop: 30,
              display: "flex",
              gap: 22,
              flexWrap: "wrap",
              justifyContent: "center",
              color: COLORS.paper,
              opacity: heroLoaded ? 0.75 : 0,
              fontSize: 13,
              fontFamily: "Inter, sans-serif",
              transform: heroLoaded ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s",
            }}
          >
            <span>⭐ 4.9 / 5 lokalnych opinii</span>
            <span>📍 ul. Piotrkowska, Łódź</span>
            <span>🕒 Pon–Sob 9:00–19:00</span>
          </div>
        </div>
      </section>

      <StripeDivider />

      {/* SERVICES */}
      <section
        id="cennik"
        style={{
          padding: "70px 20px",
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <h2
            style={{
              fontFamily: "'Bebas Neue', Inter, sans-serif",
              fontSize: "clamp(32px, 7vw, 48px)",
              color: COLORS.ink,
              marginBottom: 6,
              letterSpacing: 0.5,
            }}
          >
            CENNIK
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: COLORS.gray,
              marginBottom: 30,
              fontSize: 15,
            }}
          >
            Uczciwe ceny, bez ukrytych dopłat. Tak jak na tablicy w zakładzie.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            style={{
              backgroundColor: COLORS.white,
              border: `1px solid rgba(26,26,26,0.08)`,
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            {services.map((s, i) => (
              <ServiceRow key={s.name} s={s} i={i} total={services.length} />
            ))}
          </div>
        </Reveal>

        <div style={{ marginTop: 28, textAlign: "center" }}>
          <CallWhatsRow />
        </div>
      </section>

      <StripeDivider height={6} />

      {/* ABOUT */}
      <section
        style={{
          backgroundColor: COLORS.ink,
          padding: "70px 20px",
        }}
      >
        <Reveal>
          <div
            style={{
              maxWidth: 980,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr)",
              gap: 36,
            }}
            className="about-grid"
          >
            <AboutPhoto />

            <div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', Inter, sans-serif",
                  fontSize: "clamp(30px, 6vw, 42px)",
                  color: COLORS.paper,
                  marginBottom: 20,
                  letterSpacing: 0.5,
                }}
              >
                KTO TNIE
              </h2>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: COLORS.gray,
                  fontSize: 16,
                  lineHeight: 1.75,
                  marginBottom: 16,
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
                  lineHeight: 1.75,
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
      </section>

      <StripeDivider height={6} />

      {/* GALLERY */}
      <section
        id="galeria"
        style={{
          padding: "70px 20px",
          maxWidth: 980,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <h2
            style={{
              fontFamily: "'Bebas Neue', Inter, sans-serif",
              fontSize: "clamp(30px, 6vw, 42px)",
              color: COLORS.ink,
              marginBottom: 6,
              letterSpacing: 0.5,
              textAlign: "center",
            }}
          >
            U NAS W ŚRODKU
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: COLORS.gray,
              marginBottom: 30,
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Tak wygląda nasz zakład — wpadnij i zobacz sam.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={i * 0.12}>
              <GalleryPhoto g={g} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* SEO SECTION */}
      <section
        style={{
          padding: "60px 20px",
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <h2
            style={{
              fontFamily: "'Bebas Neue', Inter, sans-serif",
              fontSize: "clamp(28px, 6vw, 36px)",
              color: COLORS.ink,
              marginBottom: 16,
              letterSpacing: 0.5,
            }}
          >
            BARBER ŁÓDŹ — TWOJA OKOLICA
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: COLORS.gray,
              fontSize: 15,
              lineHeight: 1.7,
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

      <StripeDivider height={6} />

      {/* MAP */}
      <section
        id="mapa"
        style={{
          padding: "70px 20px",
          maxWidth: 760,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Reveal>
          <h2
            style={{
              fontFamily: "'Bebas Neue', Inter, sans-serif",
              fontSize: "clamp(30px, 6vw, 42px)",
              color: COLORS.ink,
              marginBottom: 8,
              letterSpacing: 0.5,
            }}
          >
            ZNAJDŹ NAS
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: COLORS.gray,
              marginBottom: 26,
              fontSize: 15,
            }}
          >
            {ADDRESS}
          </p>

          <div
            style={{
              borderRadius: 6,
              overflow: "hidden",
              border: `1px solid rgba(26,26,26,0.1)`,
              marginBottom: 20,
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
              fontWeight: 700,
              fontSize: 14,
              color: COLORS.ink,
              textDecoration: "none",
              border: `2px solid ${COLORS.ink}`,
              padding: "11px 22px",
              borderRadius: 4,
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
          backgroundColor: COLORS.green,
          padding: "70px 20px",
          textAlign: "center",
        }}
      >
        <Reveal>
          <h2
            style={{
              fontFamily: "'Bebas Neue', Inter, sans-serif",
              fontSize: "clamp(32px, 7vw, 48px)",
              color: COLORS.paper,
              marginBottom: 10,
              letterSpacing: 0.5,
            }}
          >
            UMÓW SIĘ DZIŚ
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(242,237,228,0.8)",
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            {PHONE_DISPLAY}
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(242,237,228,0.8)",
              fontSize: 14,
              marginBottom: 34,
            }}
          >
            Pon–Sob: 9:00–19:00 · Niedziela: zamknięte
          </p>

          <CallWhatsRow size="big" />
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: COLORS.ink,
          padding: "26px 20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <OpenStatus />
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            color: COLORS.gray,
            fontSize: 12,
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} Fade Studio Łódź · {ADDRESS}
        </p>
      </footer>

      <div style={{ height: 60 }} />

      <style>{`
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 460px 1fr !important;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
