import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  title: "Fade Studio Łódź | Barber Łódź — Fryzjer Męski, Fade, Broda",
  description:
    "Fade Studio Łódź — barber w Łodzi specjalizujący się w strzyżeniu męskim, fade, trymowaniu brody. Umów się przez telefon lub WhatsApp. ul. Piotrkowska, Łódź.",
  keywords: [
    "barber Łódź",
    "fryzjer męski Łódź",
    "strzyżenie Łódź",
    "fade Łódź",
    "trymowanie brody Łódź",
  ],
  openGraph: {
    title: "Fade Studio Łódź",
    description: "Świeże fade'y i nowoczesne strzyżenia w Łodzi.",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={`${bebas.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}