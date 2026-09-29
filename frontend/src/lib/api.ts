import { PortfolioData, Project, Certification } from "@/types/portfolio";
import { fallbackPortfolioData } from "./fallbackData";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchPortfolioSummary(): Promise<PortfolioData> {
  try {
    const res = await fetch(`${API_BASE}/api/portfolio-summary`, {
      next: { revalidate: 60 },
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      console.warn(`FastAPI returned status ${res.status}, using verified static data.`);
      return fallbackPortfolioData;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.info("Connecting with verified portfolio snapshot (FastAPI fallback active).", err);
    return fallbackPortfolioData;
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE}/api/projects`, { next: { revalidate: 60 } });
    if (res.ok) return await res.json();
  } catch (e) {
    // fallback
  }
  return fallbackPortfolioData.projects;
}

export async function fetchCertifications(): Promise<Certification[]> {
  try {
    const res = await fetch(`${API_BASE}/api/certifications`, { next: { revalidate: 60 } });
    if (res.ok) return await res.json();
  } catch (e) {
    // fallback
  }
  return fallbackPortfolioData.certifications;
}
