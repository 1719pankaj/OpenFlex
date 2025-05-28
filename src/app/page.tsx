"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Download,
  Calendar,
  Award,
  BookOpen,
  Code,
  Briefcase,
  User,
  Globe,
  ArrowRight,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
// Remove unused Card components
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useResumeData } from "@/hooks/useResumeData"
import placeholderImage from "@/assets/placeholder.png";
import appdemo from "@/assets/appdemo.png";
import { CardSpotlight } from "@/components/ui/card-spotlight";


export default function Home() {
  const { data: resumeData, isLoading, error } = useResumeData();
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Refs for each section - moved outside useMemo to fix hooks rule violation
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const educationRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Create refs object after individual refs are created
  const sectionRefs = {
    hero: heroRef,
    about: aboutRef,
    skills: skillsRef,
    projects: projectsRef,
    experience: experienceRef,
    education: educationRef,
    stats: statsRef,
    faq: faqRef,
    contact: contactRef,
  }

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Determine which section is currently in view
      const currentPosition = window.scrollY + 100

      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current
          if (currentPosition >= offsetTop && currentPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionRefs])

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs[sectionId as keyof typeof sectionRefs].current
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust offset for sticky header
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false)
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#d5ff5f] mx-auto mb-4"></div>
          <p>Loading resume data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !resumeData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error: {error || 'Failed to load resume data'}</p>
          <p>Please check the configuration file.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header - Updated with dynamic data */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrollY > 50 ? "bg-black/90 shadow-sm backdrop-blur-sm" : "bg-transparent",
        )}
      >
        <div className="container max-w-full px-4 md:px-6 flex h-16 items-center justify-between">
          <div className="font-bold">
            <Link href="/" className="flex items-center gap-2 text-xl">
              <span>{resumeData.personal.name}</span>
              <span className="text-[#d5ff5f]">.</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>

          {/* Mobile menu */}
          <div
            className={cn(
              "fixed inset-0 bg-black flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden",
              mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible",
            )}
          >
             {/* Navigation Links - Functionality unchanged */}
            <NavLink active={activeSection === "about"} onClick={() => scrollToSection("about")}>
              About
            </NavLink>
            <NavLink active={activeSection === "skills"} onClick={() => scrollToSection("skills")}>
              Skills
            </NavLink>
            <NavLink active={activeSection === "projects"} onClick={() => scrollToSection("projects")}>
              Projects
            </NavLink>
            <NavLink active={activeSection === "experience"} onClick={() => scrollToSection("experience")}>
              Experience
            </NavLink>
            <NavLink active={activeSection === "education"} onClick={() => scrollToSection("education")}>
              Education
            </NavLink>
            <NavLink active={activeSection === "contact"} onClick={() => scrollToSection("contact")}>
              Contact
            </NavLink>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-6">
             {/* Navigation Links - Functionality unchanged */}
            <NavLink active={activeSection === "about"} onClick={() => scrollToSection("about")}>
              About
            </NavLink>
            <NavLink active={activeSection === "skills"} onClick={() => scrollToSection("skills")}>
              Skills
            </NavLink>
            <NavLink active={activeSection === "projects"} onClick={() => scrollToSection("projects")}>
              Projects
            </NavLink>
            <NavLink active={activeSection === "experience"} onClick={() => scrollToSection("experience")}>
              Experience
            </NavLink>
            <NavLink active={activeSection === "education"} onClick={() => scrollToSection("education")}>
              Education
            </NavLink>
            <NavLink active={activeSection === "contact"} onClick={() => scrollToSection("contact")}>
              Contact
            </NavLink>
          </nav>

          {/* Social Links - Updated with dynamic data */}
          <div className="hidden md:flex items-center gap-2">
            <Link href={resumeData.personal.github} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-[d5ff5f] hover:text-black">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href={resumeData.personal.linkedin} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-[d5ff5f] hover:text-black">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href={`mailto:${resumeData.personal.email}`}>
              <Button variant="ghost" size="icon" className="text-[d5ff5f] hover:text-black">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Updated with dynamic data */}
        <section ref={sectionRefs.hero} className="relative min-h-screen flex items-center">
          <div className="container max-w-full px-4 md:px-6 z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <div
                    className="inline-block animate-slide-up opacity-0"
                    style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
                  >
                    <Badge className="px-4 py-1 text-sm bg-[#f5ffdd] text-black border-[#e7ffac] mb-4">
                      {resumeData.hero.badge}
                    </Badge>
                  </div>
                  <h1
                    className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none animate-slide-up opacity-0"
                    style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
                  >
                    {resumeData.hero.title.split('&').map((part, index) => (
                      <span key={index}>
                        {index === 0 ? part : (
                          <>
                            <br />& <span className="text-[#d5ff5f]">{part}</span>
                          </>
                        )}
                      </span>
                    ))}
                  </h1>
                  <p
                    className="max-w-[600px] text-gray-500 md:text-xl animate-slide-up opacity-0"
                    style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
                  >
                    {resumeData.hero.subtitle}
                  </p>
                </div>
                <div
                  className="flex flex-col gap-4 sm:flex-row animate-slide-up opacity-0"
                  style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
                >
                  <Button
                    className="bg-[#d5ff5f] hover:bg-[#c4ee4e] text-black border-0 rounded-none px-8"
                    onClick={() => scrollToSection("projects")}
                  >
                    {resumeData.hero.ctaButtons.primary}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#d5ff5f] text-black hover:bg-[#f5ffdd] rounded-none px-8"
                    onClick={() => scrollToSection("contact")}
                  >
                    {resumeData.hero.ctaButtons.secondary}
                  </Button>
                  <Link href={resumeData.personal.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      className="text-[#d5ff5f] hover:text-[#d5ff5f] hover:bg-transparent rounded-none px-8"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {resumeData.hero.ctaButtons.resume}
                    </Button>
                  </Link>
                </div>

                {/* Social Links in Hero - Updated with dynamic data */}
                <div
                  className="flex gap-4 animate-slide-up opacity-0"
                  style={{ animationDelay: "1s", animationFillMode: "forwards" }}
                >
                  <Link href={resumeData.personal.github} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-none hover:bg-transparent hover:text-[#d5ff5f]"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                  <Link href={resumeData.personal.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-none hover:bg-transparent hover:text-[#d5ff5f]"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                  <Link href={`mailto:${resumeData.personal.email}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-none hover:bg-transparent hover:text-[#d5ff5f]"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Image Section - Unchanged */}
              <div
                className="flex items-center justify-center animate-slide-up opacity-0"
                style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-none bg-[#d5ff5f] blur-3xl opacity-10 animate-pulse" />
                  <Image
                    src={placeholderImage} // Keep your image
                    width={400}
                    height={400}
                    alt="Developer portrait"
                    className="relative rounded-none aspect-square object-cover border-4 border-[#d5ff5f]/30 p-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Button - Unchanged */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none hover:bg-transparent hover:text-[#d5ff5f]"
              onClick={() => scrollToSection("about")}
            >
              <ChevronRight className="h-5 w-5 rotate-90" />
              <span className="sr-only">Scroll Down</span>
            </Button>
          </div>
        </section>

        {/* About Section - Updated with dynamic data */}
        <section id="about" ref={sectionRefs.about} className="w-full py-20 md:py-32 relative bg-zinc-900">
          <div className="container max-w-full px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {resumeData.about.title.split(' ').map((word, index) => (
                    <span key={index}>
                      {word === 'Me' ? <span className="text-[#d5ff5f]">{word}</span> : word}
                      {index < resumeData.about.title.split(' ').length - 1 && ' '}
                    </span>
                  ))}
                </h2>
                <p className="text-gray-300 md:text-xl/relaxed">
                  {resumeData.about.subtitle}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative">
                <Image
                  src={appdemo}
                  width={500}
                  height={600}
                  alt="App Demo Showcase"
                  className="object-cover border-8 border-zinc-800 shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-zinc-800 p-4 shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#d5ff5f]">{resumeData.stats[0].value}</p>
                      <p className="text-sm text-gray-400">{resumeData.stats[0].label}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#d5ff5f]">{resumeData.stats[1].value}</p>
                      <p className="text-sm text-gray-400">{resumeData.stats[1].label}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold">
                  Hello! I&apos;m <span className="text-[#d5ff5f]">{resumeData.personal.name}</span>
                </h3>
                {resumeData.about.description.map((paragraph, index) => (
                  <p key={index} className="text-white">
                    {paragraph}
                  </p>
                ))}

                <div className="grid grid-cols-2 gap-4 pt-4">
                  {resumeData.about.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[#d5ff5f]" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-[#d5ff5f]" />
                    <span className="text-white">Name: {resumeData.personal.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[#d5ff5f]" />
                    <span className="text-white">Email: {resumeData.personal.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[#d5ff5f]" />
                    <span className="text-white">Available: {resumeData.about.availability}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-[#d5ff5f]" />
                    <span className="text-white">Location: {resumeData.personal.location}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href={resumeData.personal.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-[#d5ff5f] hover:bg-[#c4ee4e] text-black rounded-none">
                      Download Resume <Download className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section - Updated with dynamic data */}
        <section id="skills" ref={sectionRefs.skills} className="w-full py-20 md:py-32 relative">
          <div className="container max-w-full px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  My <span className="text-[#d5ff5f]">Skills</span>
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
                  {/* Updated Subtitle */}
                  The technologies and practices I leverage to build modern software solutions.
                </p>
              </div>
            </div>

            <Tabs defaultValue="technical" className="w-full max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-12">
                <TabsTrigger value="technical" className="text-sm sm:text-base">
                  Technical Skills
                </TabsTrigger>
                <TabsTrigger value="tools_platforms" className="text-sm sm:text-base">
                  Tools & Platforms
                </TabsTrigger>
                <TabsTrigger value="languages" className="text-sm sm:text-base">
                  Languages
                </TabsTrigger>
              </TabsList>
               {/* Technical Skills - Updated from Resume */}
              <TabsContent value="technical" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {resumeData.skills.technical.map((skill, index) => (
                    <SkillBar key={index} name={skill.name} percentage={skill.percentage} />
                  ))}
                </div>
              </TabsContent>
              {/* Tools & Platforms - Updated from Resume */}
              <TabsContent value="tools_platforms" className="space-y-8">
                 <h3 className="text-xl font-bold text-center text-[#d5ff5f]">Cloud & DevOps</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                   {resumeData.skills.tools.map((tool, index) => (
                     <SkillBar key={index} name={tool.name} percentage={tool.percentage} />
                   ))}
                 </div>
                 <h3 className="text-xl font-bold text-center mt-10 text-[#d5ff5f]">Development Tools</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                   {resumeData.skills.devTools.map((tool, index) => (
                     <TechIcon key={index} name={tool} />
                   ))}
                 </div>
              </TabsContent>
              {/* Languages - Unchanged (assuming these are still accurate) */}
              <TabsContent value="languages" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {resumeData.skills.languages.map((language, index) => (
                    <SkillBar key={index} name={language.name} percentage={language.percentage} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Projects Section - Updated with dynamic data */}
        <section id="projects" ref={sectionRefs.projects} className="w-full py-20 md:py-32 relative bg-zinc-900">
          <div className="container max-w-full px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Featured <span className="text-[#d5ff5f]">Projects</span>
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed">
                  {/* Updated Subtitle */}
                  A selection of my work showcasing full-stack and mobile development capabilities.
                </p>
              </div>
            </div>

            {/* Updated Project Cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto">
              {resumeData.projects.map((project, index) => (
                <ProjectSpotlightCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  githubUrl={project.githubUrl}
                  demoUrl={project.demoUrl ?? undefined}
                />
              ))}
            </div>

            {/* View All Projects Button - Unchanged */}
            <div className="flex justify-center mt-12">
              <Link href={"https://github.com/1719pankaj?tab=repositories"} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="bg-[#d5ff5f] text-black hover:bg-[#f5ffdd] rounded-none">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Experience Section - Updated with dynamic data */}
        <section id="experience" ref={sectionRefs.experience} className="w-full py-20 md:py-32 relative">
          <div className="container max-w-full px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Work <span className="text-[#d5ff5f]">Experience</span>
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
                  {/* Updated Subtitle */}
                  My professional journey building software solutions.
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative border-l-2 border-[#d5ff5f] pl-8 ml-4">
                {resumeData.experience.map((exp, index) => (
                  <TimelineItem
                    key={index}
                    title={exp.title}
                    company={exp.company}
                    period={exp.period}
                    description={exp.description}
                    responsibilities={exp.responsibilities}
                    isLast={index === resumeData.experience.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Section - Updated with dynamic data */}
        <section id="education" ref={sectionRefs.education} className="w-full py-20 md:py-32 relative bg-zinc-900">
          <div className="container max-w-full px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  <span className="text-[#d5ff5f]">Education</span> & Certifications
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed">
                  My academic background and professional qualifications.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Education Details - Updated */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <BookOpen className="mr-2 h-6 w-6 text-[#d5ff5f]" />
                  Education
                </h3>
                <div className="space-y-8">
                  {resumeData.education.map((edu, index) => (
                    <EducationItem
                      key={index}
                      degree={edu.degree}
                      institution={edu.institution}
                      period={edu.period}
                      description={edu.description}
                    />
                  ))}
                </div>
              </div>

              {/* Certifications - Updated */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Award className="mr-2 h-6 w-6 text-[#d5ff5f]" />
                  Certifications
                </h3>
                <div className="space-y-8">
                  {resumeData.certifications.map((cert, index) => (
                    <CertificationItem
                      key={index}
                      title={cert.title}
                      issuer={cert.issuer}
                      date={cert.date}
                      description={cert.description}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Updated with dynamic data */}
        <section id="stats" ref={sectionRefs.stats} className="w-full py-20 md:py-32 relative bg-black text-white">
          <div className="container max-w-full px-4 md:px-6 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {resumeData.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-[#d5ff5f] mb-2">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Updated with dynamic data */}
        <section id="faq" ref={sectionRefs.faq} className="w-full py-20 md:py-32 relative">
          <div className="container max-w-full px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Frequently Asked <span className="text-[#d5ff5f]">Questions</span>
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
                  {/* Escape apostrophe */}
                  Common questions about my skills, experience, and process.
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {resumeData.faq.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                    <AccordionTrigger className="text-left font-medium py-4 hover:text-[#d5ff5f] hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white pb-4">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Section - Updated with dynamic data */}
        <section id="contact" ref={sectionRefs.contact} className="w-full py-20 md:py-32 relative bg-zinc-900">
          <div className="container max-w-full px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  {resumeData.contact.title.split(' ').map((word, index) => (
                    <span key={index}>
                      {word === 'Touch' ? <span className="text-[#d5ff5f]">{word}</span> : word}
                      {index < resumeData.contact.title.split(' ').length - 1 && ' '}
                    </span>
                  ))}
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed">
                  {resumeData.contact.subtitle}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-10 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="bg-black p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-[#d5ff5f]">
                        <Mail className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <a href={`mailto:${resumeData.personal.email}`} className="hover:text-[#d5ff5f]">
                          {resumeData.personal.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-[#d5ff5f]">
                        <Github className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">GitHub</p>
                        <a
                          href={resumeData.personal.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#d5ff5f]"
                        >
                          {resumeData.personal.github.replace('https://', '')}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-[#d5ff5f]">
                        <Linkedin className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">LinkedIn</p>
                        <a
                          href={resumeData.personal.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#d5ff5f]"
                        >
                          {resumeData.personal.linkedin.replace('https://', '')}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h4 className="font-medium mb-2">Availability</h4>
                    <p className="text-white">
                      {resumeData.contact.availability}
                    </p>
                  </div>
                </div>

                <div className="bg-black p-6 shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Location</h3>
                  <div className="aspect-video bg-gray-200 mb-4">
                    <iframe
                      title="Location Map"
                      src={resumeData.contact.mapUrl}
                      width="400"
                      height="200"
                      className="w-full h-full object-cover border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <p className="text-white">{resumeData.personal.location}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Updated with dynamic data */}
      <footer className="w-full border-t border-gray-700 py-8 bg-black">
        <div className="container max-w-full flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} {resumeData.personal.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href={resumeData.personal.github} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-[d5ff5f] hover:text-[#d5ff5f] hover:bg-transparent">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href={resumeData.personal.linkedin} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-[d5ff5f] hover:text-[#d5ff5f] hover:bg-transparent">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href={`mailto:${resumeData.personal.email}`}>
              <Button variant="ghost" size="icon" className="text-[d5ff5f] hover:text-[#d5ff5f] hover:bg-transparent">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Helper Components (NavLink, SkillBar, TechIcon, TimelineItem, EducationItem, CertificationItem, ProjectSpotlightCard, TechItem, CheckIcon) remain unchanged structurally.
// Only the data passed into them might have changed based on the main component updates.

// --- Helper Components (Keep these as they were in your original file) ---

function NavLink({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm font-medium transition-colors hover:text-[#d5ff5f] relative",
        active ? "text-[#d5ff5f]" : "text-white",
      )}
    >
      {children}
      <span
        className={cn(
          "absolute -bottom-1 left-0 h-0.5 bg-[#d5ff5f] transition-all duration-300",
          active ? "w-full" : "w-0",
        )}
      />
    </button>
  )
}

function SkillBar({ name, percentage }: { name: string; percentage: number }) {
  // Added check for valid percentage
  const validPercentage = Math.max(0, Math.min(100, percentage || 0));
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="font-medium text-white">{name}</span> {/* Ensured text is white */}
        <span className="text-gray-400">{validPercentage}%</span> {/* Ensured text color */}
      </div>
      {/* Updated progress bar colors for better contrast */}
      <Progress value={validPercentage} className="h-2 bg-zinc-400" style={{ '--progress-foreground': '#d5ff5f' } as React.CSSProperties} />
    </div>
  )
}

function TechIcon({ name }: { name: string }) {
  return (
     // Updated border/hover for dark mode
    <div className="flex flex-col items-center justify-center p-4 border border-zinc-700 hover:border-[#d5ff5f] transition-colors text-center">
      <div className="p-2 rounded-full bg-[#d5ff5f] mb-2">
        <Code className="h-6 w-6 text-black" />
      </div>
      <span className="text-sm text-white">{name}</span> {/* Ensured text is white */}
    </div>
  )
}

function TimelineItem({
  title,
  company,
  period,
  description,
  responsibilities,
  isLast = false,
}: {
  title: string
  company: string
  period: string
  description: string
  responsibilities: string[]
  isLast?: boolean
}) {
  return (
    <div className={`relative pb-12 ${isLast ? "" : ""}`}>
      {/* Dot adjusted */}
      <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border-4 border-zinc-900 bg-[#d5ff5f] flex items-center justify-center">
        <Briefcase className="h-3 w-3 text-black" />
      </div>
       {/* Card background and border adjusted */}
      <div className="bg-zinc-800 p-6 shadow-md border border-zinc-700 rounded">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-gray-400">{company}</p>
          </div>
           {/* Badge styling adjusted */}
          <Badge variant="outline" className="w-fit border-[#d5ff5f] text-black bg-[#d5ff5f] px-3 py-0.5">
            {period}
          </Badge>
        </div>
        <p className="text-gray-300 mb-4">{description}</p> {/* Lighter text for description */}
        <div>
           {/* Responsibilities title color adjusted */}
          <h4 className="font-semibold mb-2 text-gray-400">Key Responsibilities:</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-300"> {/* Lighter text for list items */}
            {responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function EducationItem({
  degree,
  institution,
  period,
  description,
}: {
  degree: string
  institution: string
  period: string
  description: string
}) {
  return (
     // Adjusted background and border
    <div className="bg-zinc-800 p-6 shadow-md border border-zinc-700 rounded">
      <div className="flex flex-col gap-2 mb-4">
         {/* Ensured text is white */}
        <h3 className="text-lg font-bold text-white">{degree}</h3>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <p className="text-gray-400">{institution}</p>
           {/* Adjusted badge styling */}
          <Badge variant="outline" className="border-[#d5ff5f] text-black bg-[#d5ff5f] px-3 py-0.5">
            {period}
          </Badge>
        </div>
      </div>
      <p className="text-gray-300">{description}</p> {/* Lighter text */}
    </div>
  )
}

function CertificationItem({
  title,
  issuer,
  date,
  description,
}: {
  title: string
  issuer: string
  date: string
  description: string
}) {
  return (
    <div className="flex gap-4">
      <div className="p-2 rounded-full bg-[#d5ff5f] h-fit mt-1"> {/* Adjusted margin */}
        <Award className="h-5 w-5 text-black" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">{title}</h3> {/* Ensured text is white */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <p className="text-gray-400">{issuer}</p>
          <span className="text-gray-500">•</span>
          <p className="text-gray-400">{date}</p>
        </div>
        <p className="text-gray-300">{description}</p> {/* Lighter text */}
      </div>
    </div>
  )
}


function ProjectSpotlightCard({
  title,
  description,
  technologies,
  githubUrl,
  demoUrl,
}: {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string; // Make demoUrl optional
}) {
  return (
     // Ensure CardSpotlight takes full height if needed within grid
    <CardSpotlight className="h-full flex flex-col">
       {/* Content Area */}
      <div className="flex-grow">
        <p className="text-xl font-bold relative z-20 mt-2 text-white">
          {title}
        </p>
        <div className="text-neutral-300 mt-4 relative z-20"> {/* Slightly lighter description */}
          {description}
          {/* Technologies List */}
          <div className="mt-4 space-x-2 space-y-1 relative z-20 flex flex-wrap">
             <span className="text-sm font-medium text-gray-400 block w-full mb-1">Tech Stack:</span>
            {technologies.map((tech, index) => (
               // Using Badge for tech stack items
              <Badge key={index} variant="secondary" className="bg-zinc-700 text-gray-300 border-zinc-600 hover:bg-zinc-600">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
       {/* Footer Area for Buttons */}
      <div className="flex flex-wrap gap-3 mt-6 relative z-20 pt-4 border-t border-zinc-700"> {/* Added border top */}
        <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
           {/* Adjusted GitHub button style */}
          <Button variant="outline" size="sm" className="border-[#d5ff5f] text-[#d5ff5f] bg-transparent hover:bg-[#d5ff5f] hover:text-black">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </Link>
        {/* Conditionally render Demo button */}
        {demoUrl && demoUrl !== "#" && (
          <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
             {/* Adjusted Demo button style */}
            <Button size="sm" className="bg-[#d5ff5f] hover:bg-[#c4ee4e] text-black">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </Link>
        )}
      </div>
    </CardSpotlight>
  );
}


// TechItem is replaced by Badges in ProjectSpotlightCard now, can be removed if not used elsewhere
// const TechItem = ({ title }: { title: string }) => { ... }

// CheckIcon is not used in the revised ProjectSpotlightCard, can be removed if not used elsewhere
// const CheckIcon = () => { ... }
