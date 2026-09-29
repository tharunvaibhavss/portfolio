import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tharunvaibhavss.github.io"),
  title: "Tharun Vaibhav S S | Software Engineer | AI, Data & IoT",
  description:
    "Production portfolio of Tharun Vaibhav S S – Software Engineer specializing in Artificial Intelligence, Generative AI, LLM-powered diagnostics, Data Analytics, and IoT systems. 'Wild Idea. Wealthy Innovation.'",
  keywords: [
    "Tharun Vaibhav S S",
    "Tharun Vaibhav",
    "Software Engineer",
    "AI Engineer",
    "IoT Developer",
    "Data Analytics",
    "FastAPI",
    "Next.js",
    "PSG College of Arts and Science",
    "Dyzen Consultants",
    "OpenAI GPT-5.5",
    "Enervision",
  ],
  authors: [{ name: "Tharun Vaibhav S S", url: "https://github.com/tharunvaibhavss" }],
  creator: "Tharun Vaibhav S S",
  openGraph: {
    title: "Tharun Vaibhav S S | Software Engineer | AI, Data & IoT",
    description:
      "Wild Idea. Wealthy Innovation. Portfolio of Tharun Vaibhav S S, bridging AI, Data, IoT telemetry, and dependable software engineering.",
    url: "https://github.com/tharunvaibhavss",
    siteName: "Tharun Vaibhav S S Portfolio",
    images: [
      {
        url: "/photos/tharun_vaibhav_portrait.jpg",
        width: 960,
        height: 1280,
        alt: "Tharun Vaibhav S S - Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tharun Vaibhav S S | Software Engineer | AI, Data & IoT",
    description: "Wild Idea. Wealthy Innovation. Physical-digital systems, AI diagnostics, and modern software.",
    images: ["/photos/tharun_vaibhav_portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tharun Vaibhav S S",
    jobTitle: "Software Engineer",
    description: "Software Engineer specializing in AI, Data, IoT, and Full-Stack Engineering.",
    url: "https://github.com/tharunvaibhavss",
    sameAs: [
      "https://github.com/tharunvaibhavss",
      "https://www.linkedin.com/in/tharun-vaibhav-s-s",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "PSG College of Arts & Science",
    },
    knowsAbout: [
      "Software Engineering",
      "Artificial Intelligence",
      "FastAPI",
      "Next.js",
      "Python",
      "Internet of Things",
      "PostgreSQL",
      "OpenAI API",
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-500/20 selection:text-blue-700 antialiased">
        {children}
      </body>
    </html>
  );
}
