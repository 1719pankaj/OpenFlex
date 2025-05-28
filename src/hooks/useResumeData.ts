import { useState, useEffect } from 'react';
import resumeData from '@/config/resume-data.json';

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    resumeUrl: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
    backgroundColor: string;
    zincBackground: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaButtons: {
      primary: string;
      secondary: string;
      resume: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    description: string[];
    highlights: string[];
    availability: string;
  };
  stats: Array<{ value: string; label: string }>;
  skills: {
    technical: Array<{ name: string; percentage: number }>;
    tools: Array<{ name: string; percentage: number }>;
    devTools: string[];
    languages: Array<{ name: string; percentage: number }>;
  };
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    demoUrl: string | null;
  }>;
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
    responsibilities: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
    description: string;
    gpa: string;
  }>;
  certifications: Array<{
    title: string;
    issuer: string;
    date: string;
    description: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  contact: {
    title: string;
    subtitle: string;
    availability: string;
    mapUrl: string;
  };
}

export const useResumeData = () => {
  const [data, setData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Since we're importing the JSON directly, we can set it immediately
      setData(resumeData as ResumeData);
      setIsLoading(false);
    } catch {
      setError('Failed to load resume data');
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error };
};
