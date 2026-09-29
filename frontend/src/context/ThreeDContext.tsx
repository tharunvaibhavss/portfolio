"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";

export type SectionType =
  | "home"
  | "about"
  | "engineering"
  | "projects"
  | "experience"
  | "skills"
  | "achievements"
  | "certifications"
  | "contact";

export type DisciplineType = "ai" | "data" | "iot" | "software" | null;

interface MousePosition {
  x: number; // Normalized device coordinates: -1 to 1
  y: number; // Normalized device coordinates: 1 to -1 (Three.js convention)
  screenX: number; // Viewport pixel X
  screenY: number; // Viewport pixel Y
}

interface ThreeDContextValue {
  scrollProgress: number; // 0.0 to 1.0
  activeSection: SectionType;
  mouse: MousePosition;
  activeDiscipline: DisciplineType;
  setActiveDiscipline: (d: DisciplineType) => void;
  hoveredDiscipline: DisciplineType;
  setHoveredDiscipline: (d: DisciplineType) => void;
  activeProjectSlug: string | null;
  setActiveProjectSlug: (slug: string | null) => void;
  hoveredProjectSlug: string | null;
  setHoveredProjectSlug: (slug: string | null) => void;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

const defaultContextValue: ThreeDContextValue = {
  scrollProgress: 0,
  activeSection: "home",
  mouse: { x: 0, y: 0, screenX: 0, screenY: 0 },
  activeDiscipline: "ai",
  setActiveDiscipline: () => {},
  hoveredDiscipline: null,
  setHoveredDiscipline: () => {},
  activeProjectSlug: "cat-industrial-diagnostic-system",
  setActiveProjectSlug: () => {},
  hoveredProjectSlug: null,
  setHoveredProjectSlug: () => {},
  isMobile: false,
  prefersReducedMotion: false,
};

const ThreeDContext = createContext<ThreeDContextValue>(defaultContextValue);

export function ThreeDProvider({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionType>("home");
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineType>("ai");
  const [hoveredDiscipline, setHoveredDiscipline] = useState<DisciplineType>(null);
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>("cat-industrial-diagnostic-system");
  const [hoveredProjectSlug, setHoveredProjectSlug] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse coords with ref for low-overhead read & throttled state update
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0, screenX: 0, screenY: 0 });
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0, screenX: 0, screenY: 0 });

  useEffect(() => {
    // 1. Check device capabilities
    const checkDevice = () => {
      const mobileQuery = window.matchMedia("(max-width: 768px), (pointer: coarse)");
      setIsMobile(mobileQuery.matches);

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(motionQuery.matches);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice, { passive: true });

    // 2. Track global scroll
    const sections: SectionType[] = [
      "home",
      "about",
      "engineering",
      "projects",
      "experience",
      "skills",
      "certifications",
      "achievements",
      "contact",
    ];

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / totalScroll)));
      }

      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 3. Track mouse movement for 3D parallax & camera target calculations
    let rafId: number;
    let latestEvent: MouseEvent | null = null;

    const updateMouse = () => {
      if (latestEvent) {
        const ndcX = (latestEvent.clientX / window.innerWidth) * 2 - 1;
        const ndcY = -(latestEvent.clientY / window.innerHeight) * 2 + 1;
        const newPos = {
          x: ndcX,
          y: ndcY,
          screenX: latestEvent.clientX,
          screenY: latestEvent.clientY,
        };
        mouseRef.current = newPos;
        setMouse(newPos);
        latestEvent = null;
      }
      rafId = requestAnimationFrame(updateMouse);
    };

    rafId = requestAnimationFrame(updateMouse);

    const handleMouseMove = (e: MouseEvent) => {
      latestEvent = e;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <ThreeDContext.Provider
      value={{
        scrollProgress,
        activeSection,
        mouse,
        activeDiscipline,
        setActiveDiscipline,
        hoveredDiscipline,
        setHoveredDiscipline,
        activeProjectSlug,
        setActiveProjectSlug,
        hoveredProjectSlug,
        setHoveredProjectSlug,
        isMobile,
        prefersReducedMotion,
      }}
    >
      {children}
    </ThreeDContext.Provider>
  );
}

export function use3DWorld() {
  return useContext(ThreeDContext);
}
