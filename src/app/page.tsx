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
import placeholderImage from "@/assets/placeholder.png"; // Keep your existing image import
import appdemo from "@/assets/appdemo.png"; // Keep your existing image import
import { CardSpotlight } from "@/components/ui/card-spotlight";


export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Refs for each section
  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    education: useRef<HTMLElement>(null),
    stats: useRef<HTMLElement>(null),
    faq: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
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
  }, [sectionRefs]) // Add sectionRefs to dependency array

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

  // Updated stats based on resume
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "10+", label: "Projects Built" }, // Estimated from resume/GitHub
    { value: "2", label: "Certifications" }, // From resume
    { value: "11", label: "Engineers Led (Project)" }, // Specific achievement from resume
  ]

  // Updated FAQ items reflecting broader scope
  const faqItems = [
    {
      question: "What is your development process?",
      answer:
        "My development process generally follows agile methodologies. I prioritize understanding requirements thoroughly, followed by iterative design, development (backend & frontend/mobile), rigorous testing (unit, integration, E2E), and deployment. Continuous communication and feedback loops are key to ensuring the final product aligns with the vision and performs optimally.",
    },
    {
      question: "What technologies do you specialize in?",
      answer:
        "I specialize in building full-stack applications using Java/Spring Boot for robust backends, React/Next.js for dynamic web frontends, and Kotlin/React Native for native and cross-platform mobile experiences. I'm also proficient with cloud platforms like AWS and Azure, various databases (SQL/NoSQL), containerization with Docker, and CI/CD practices.",
    },
    {
      question: "How do you approach building scalable applications?",
      answer:
        "Scalability starts with architecture. I leverage microservices patterns where appropriate, design efficient RESTful APIs, utilize cloud-native services (like AWS Lambda, EC2 Auto Scaling, Azure Functions), optimize database interactions, and implement caching strategies. Performance testing and monitoring are crucial throughout the development lifecycle.",
    },
    {
      question: "Do you have experience with both web and mobile development?",
      answer:
        "Yes, absolutely. I have extensive experience developing high-performance web applications using React and Next.js, building RESTful APIs with Java/Spring Boot, and creating native Android applications with Kotlin. I'm comfortable working across the entire stack and integrating web, mobile, and backend components seamlessly.",
    },
     {
      question: "Can you integrate AI/ML features into applications?",
      answer:
        "Yes, I have experience applying machine learning techniques and integrating AI functionalities. This includes implementing features like AI-optimized context generation (as seen in my Code2Context project using RAG) and leveraging AI services for tasks like data analysis or enhancing user interactions.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header remains structurally the same, links updated if needed */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrollY > 50 ? "bg-black/90 shadow-sm backdrop-blur-sm" : "bg-transparent",
        )}
      >
        {/* Added px-4 md:px-6 for explicit horizontal padding */}
        <div className="container px-4 md:px-6 flex h-16 items-center justify-between">
          <div className="font-bold">
            <Link href="/" className="flex items-center gap-2 text-xl">
              <span>Pankaj Roy</span>
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

          {/* Social Links - Unchanged */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="https://github.com/1719pankaj" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-[d5ff5f] hover:text-black">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://linkedin.com/in/1719pankaj" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-[d5ff5f] hover:text-black">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="mailto:1719pankaj@gmail.com">
              <Button variant="ghost" size="icon" className="text-[d5ff5f] hover:text-black">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Updated Text */}
        <section ref={sectionRefs.hero} className="relative min-h-screen flex items-center">
          <div className="container px-4 md:px-6 z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <div
                    className="inline-block animate-slide-up opacity-0"
                    style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
                  >
                    {/* Updated Badge */}
                    <Badge className="px-4 py-1 text-sm bg-[#f5ffdd] text-black border-[#e7ffac] mb-4">
                      Full-Stack Developer
                    </Badge>
                  </div>
                  <h1
                    className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none animate-slide-up opacity-0"
                    style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
                  >
                    {/* Updated Heading */}
                    Building Scalable Web <br />
                    & <span className="text-[#d5ff5f]">Mobile Applications</span>
                  </h1>
                  <p
                    className="max-w-[600px] text-gray-500 md:text-xl animate-slide-up opacity-0"
                    style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
                  >
                    {/* Updated Tagline */}
                    Passionate about crafting high-performance applications using Java/Spring Boot, React/Next.js, Kotlin, and cloud technologies like AWS & Azure. Focused on robust architecture and seamless user experiences.
                  </p>
                </div>
                 {/* Buttons and Links - Functionality unchanged, CV link updated */}
                <div
                  className="flex flex-col gap-4 sm:flex-row animate-slide-up opacity-0"
                  style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
                >
                  <Button
                    className="bg-[#d5ff5f] hover:bg-[#c4ee4e] text-black border-0 rounded-none px-8"
                    onClick={() => scrollToSection("projects")}
                  >
                    View My Projects
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#d5ff5f] text-black hover:bg-[#f5ffdd] rounded-none px-8"
                    onClick={() => scrollToSection("contact")}
                  >
                    Contact Me
                  </Button>
                  {/* Assuming this is your CV link from the resume */}
                  <Link href={"https://74w9gmh08h.ufs.sh/f/Pq0T9K360QRgvohzN6HRbO9NM7BDr5YWlfq6X3HJwj0Zisue"} target="_blank" rel="noopener noreferrer"> 
                    <Button
                      variant="ghost"
                      className="text-[#d5ff5f] hover:text-[#d5ff5f] hover:bg-transparent rounded-none px-8"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download CV
                    </Button>
                  </Link>
                </div>

                {/* Social Links in Hero - Unchanged */}
                <div
                  className="flex gap-4 animate-slide-up opacity-0"
                  style={{ animationDelay: "1s", animationFillMode: "forwards" }}
                >
                  <Link href="https://github.com/1719pankaj" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-none hover:bg-transparent hover:text-[#d5ff5f]"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                  <Link href="https://linkedin.com/in/1719pankaj" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-none hover:bg-transparent hover:text-[#d5ff5f]"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                  <Link href="mailto:1719pankaj@gmail.com">
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

        {/* About Section - Updated Text */}
        <section id="about" ref={sectionRefs.about} className="w-full py-20 md:py-32 relative bg-zinc-900">
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  About <span className="text-[#d5ff5f]">Me</span>
                </h2>
                <p className="text-gray-300 md:text-xl/relaxed">
                  {/* Updated Subtitle */}
                  A dedicated Full-Stack Developer experienced in Java, React, Next.js, Kotlin, and cloud platforms.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
               {/* Image and Stats Overlay - Unchanged, uses stats array */}
              <div className="relative">
                <Image
                  src={appdemo} // Keep your image
                  width={500}
                  height={600}
                  alt="App Demo Showcase"
                  className="object-cover border-8 border-zinc-800 shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-zinc-800 p-4 shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#d5ff5f]">{stats[0].value}</p>
                      <p className="text-sm text-gray-400">{stats[0].label}</p>
                    </div>
                    <div className="text-center">
                       <p className="text-3xl font-bold text-[#d5ff5f]">{stats[1].value}</p>
                       <p className="text-sm text-gray-400">{stats[1].label}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Text Content - Updated */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">
                  {/* Escape apostrophe */}
                  Hello! I&apos;m <span className="text-[#d5ff5f]">Pankaj Roy</span>
                </h3>
                <p className="text-white">
                  {/* Escape apostrophe */}
                  I&apos;m a Full-Stack Developer with 5+ years of hands-on experience designing, building, and deploying scalable applications. My expertise spans across backend development with Java/Spring Boot, frontend development with React/Next.js, native Android development with Kotlin, and leveraging cloud technologies like AWS and Azure.
                </p>
                <p className="text-white">
                  {/* Escape apostrophe */}
                  I have a strong background in REST API development, microservices architecture, and integrating AI/ML techniques to enhance application capabilities. I thrive in agile environments, collaborating effectively to deliver high-quality software solutions that meet user needs and business goals. I&apos;m passionate about performance optimization and creating seamless, engaging user experiences across platforms.
                </p>

                 {/* Checklist - Updated */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-[#d5ff5f]" />
                    <span>Java & Spring Boot</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-[#d5ff5f]" />
                    <span>React & Next.js</span>
                  </div>
                   <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-[#d5ff5f]" />
                    <span>Kotlin & Android Dev</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-[#d5ff5f]" />
                    <span>AWS & Azure Cloud</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-[#d5ff5f]" />
                    <span>REST API Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-[#d5ff5f]" />
                    <span>Microservices</span>
                  </div>
                   <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-[#d5ff5f]" />
                    <span>Agile Methodologies</span>
                  </div>
                   <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-[#d5ff5f]" />
                    <span>Performance Tuning</span>
                  </div>
                </div>

                 {/* Personal Details - Updated Location, Availability */}
                <div className="pt-4 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-[#d5ff5f]" />
                    <span className="text-white">Name: Pankaj Kumar Roy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[#d5ff5f]" />
                    <span className="text-white">Email: 1719pankaj@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[#d5ff5f]" />
                    {/* Updated Availability - More general */}
                    <span className="text-white">Available: Open to Opportunities</span> 
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-[#d5ff5f]" />
                    {/* Updated Location */}
                    <span className="text-white">Location: Kolkata, India</span> 
                  </div>
                </div>

                {/* Resume Button - Updated link */}
                <div className="pt-4">
                  <Link href={"https://74w9gmh08h.ufs.sh/f/Pq0T9K360QRgvohzN6HRbO9NM7BDr5YWlfq6X3HJwj0Zisue"} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-[#d5ff5f] hover:bg-[#c4ee4e] text-black rounded-none">
                      Download Resume <Download className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section - Updated Skills & Tools */}
        <section id="skills" ref={sectionRefs.skills} className="w-full py-20 md:py-32 relative">
          <div className="container px-4 md:px-6 relative">
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
                  {/* Backend */}
                  <SkillBar name="Java" percentage={95} />
                  <SkillBar name="Spring Boot" percentage={90} />
                  <SkillBar name="REST API Development" percentage={95} />
                  <SkillBar name="Microservices" percentage={80} />
                  <SkillBar name="Python" percentage={75} />
                  {/* Frontend */}
                  <SkillBar name="JavaScript / TypeScript" percentage={90} />
                  <SkillBar name="React / Next.js" percentage={90} />
                  <SkillBar name="Redux" percentage={85} />
                  <SkillBar name="HTML / CSS" percentage={85} />
                  {/* Mobile */}
                  <SkillBar name="Kotlin" percentage={95} />
                  <SkillBar name="Android SDK / Jetpack" percentage={90} />
                  <SkillBar name="React Native" percentage={80} /> 
                  {/* Database & General */}
                  <SkillBar name="SQL (Postgres, MySQL)" percentage={80} />
                  <SkillBar name="NoSQL (DynamoDB, Firebase)" percentage={75} />
                  <SkillBar name="AI/ML Integration (Basic)" percentage={65} />
                </div>
              </TabsContent>
              {/* Tools & Platforms - Updated from Resume */}
              <TabsContent value="tools_platforms" className="space-y-8">
                 <h3 className="text-xl font-bold text-center text-[#d5ff5f]">Cloud & DevOps</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                     <SkillBar name="AWS (EC2, S3, Lambda, DynamoDB)" percentage={85} />
                     <SkillBar name="Azure (Fundamentals, DevOps)" percentage={80} />
                     <SkillBar name="Firebase" percentage={80} />
                     <SkillBar name="Docker" percentage={85} />
                     <SkillBar name="Terraform" percentage={70} />
                     <SkillBar name="GitHub Actions / Azure DevOps" percentage={75} />
                 </div>
                 <h3 className="text-xl font-bold text-center mt-10 text-[#d5ff5f]">Development Tools</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                     <TechIcon name="IntelliJ IDEA" />
                     <TechIcon name="VS Code" />
                     <TechIcon name="Android Studio" />
                     <TechIcon name="Git / GitHub" />
                     <TechIcon name="Postman" />
                     <TechIcon name="Gradle / Maven" />
                     <TechIcon name="PySpark" />
                     <TechIcon name="Jira" />
                     <TechIcon name="Figma (Basic)" />
                 </div>
              </TabsContent>
              {/* Languages - Unchanged (assuming these are still accurate) */}
              <TabsContent value="languages" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <SkillBar name="English" percentage={90} />
                  <SkillBar name="Hindi" percentage={100} />
                  <SkillBar name="Bengali" percentage={85} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Projects Section - Updated with user's projects */}
        <section id="projects" ref={sectionRefs.projects} className="w-full py-20 md:py-32 relative bg-zinc-900">
          <div className="container px-4 md:px-6 relative">
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
              <ProjectSpotlightCard
                title="OnlyFormula1"
                description="Ultra-fast live F1 race monitor app, delivering data minutes ahead of TV broadcasts via a high-performance Go backend managing 40+ data sources."
                technologies={["Go", "Kotlin", "CockroachDB", "MVVM", "Retrofit", "Android"]}
                githubUrl="https://github.com/1719pankaj/OnlyFormula1"
                demoUrl="#" // Add demo URL if available
              />
              <ProjectSpotlightCard
                title="Code2Context"
                description="Text extraction toolchain processing multiple codebases to generate optimized context for LLM prompting or RAG graph construction."
                technologies={["Python", "PyTorch", "OpenRouter API", "AI/ML"]}
                githubUrl="https://github.com/1719pankaj/code2context"
                demoUrl="#" // Add demo URL if available
              />
              <ProjectSpotlightCard
                title="OpenDrive"
                description="Exposes vehicle CAN bus data via ESP32, providing real-time insights and metrics through a Kotlin Android application."
                technologies={["ESP_IDF", "Kotlin", "CAN Bus", "ELM327", "Android", "IoT"]}
                githubUrl="https://github.com/1719pankaj/OpenDrive"
                demoUrl="#" // Add demo URL if available
              />
              <ProjectSpotlightCard
                title="Pastry Wrapper"
                description="Open-source Android app aggregating various LLMs with an interactive, prompt-engineering-friendly UI, featuring advanced pre/post-processing."
                technologies={["Kotlin", "MVVM", "Gemini API", "OpenRouter API", "Retrofit", "Android"]}
                githubUrl="https://github.com/1719pankaj/Pastry-Wrapper"
                demoUrl="#" // Add demo URL if available
              />
               <ProjectSpotlightCard
                title="Phuljhari"
                description="Patient monitoring system using embedded tech & Firebase backend. Allows remote monitoring of vital stats via Android, iOS (planned), and Next.js web apps."
                technologies={["Embedded C/C++", "Firebase", "Kotlin", "Next.js", "IoT", "Android", "Web"]}
                githubUrl="https://github.com/1719pankaj/Phuljhari"
                demoUrl="#" // Add demo URL if available
              />
              <ProjectSpotlightCard
                title="Portfolio Website (This Site)"
                description="My personal portfolio website showcasing projects and skills, built with a modern tech stack focused on performance and aesthetics."
                technologies={["Next.js", "React", "TypeScript", "TailwindCSS", "shadcn/ui", "Aceternity UI", "UploadThing"]}
                githubUrl="https://github.com/1719pankaj/pankaj-portfolio" // Replace with your actual repo name if different
                demoUrl="https://pankaj.is-a.dev" // Link to the live site
              />
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

        {/* Experience Section - Updated from Resume */}
        <section id="experience" ref={sectionRefs.experience} className="w-full py-20 md:py-32 relative">
          <div className="container px-4 md:px-6 relative">
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
                {/* Added Experience Items from Resume */}
                <TimelineItem
                  title="Programmer Analyst"
                  company="Cognizant"
                  period="Apr 2023 - Present"
                  description="Developing and enhancing high-performance web applications and robust backend APIs within a large-scale enterprise environment."
                  responsibilities={[
                    "Built and maintained high-performance web applications using React, Next.js, and Java/Spring Boot, contributing to a 40% increase in user engagement.",
                    "Developed and optimized RESTful APIs supporting over 10,000 concurrent users, achieving a 25% reduction in response times.",
                    "Led a team of 11 engineers on the CII Conversion Framework project, delivering significant annual savings ($531K).",
                    "Applied microservices architecture principles and cloud technologies (AWS).",
                  ]}
                />

                <TimelineItem
                  title="Programmer Analyst Trainee"
                  company="Cognizant"
                  period="Dec 2022 - Mar 2023"
                  description="Gained foundational experience in full-stack development within an agile team setting."
                  responsibilities={[
                    "Developed responsive web application features using React, Next.js, and Spring Boot.",
                    "Collaborated within agile teams, participating in sprints and contributing to feature delivery on schedule.",
                    "Gained exposure to enterprise development workflows and best practices.",
                  ]}
                />

                 <TimelineItem
                  title="Data Development Intern"
                  company="Cognizant (Azure)"
                  period="Jan 2022 - Jun 2022"
                  description="Focused on data engineering tasks, building data pipelines and exploring cross-platform cloud solutions."
                  responsibilities={[
                    "Implemented data pipelines utilizing PySpark and Azure services.",
                    "Applied knowledge of AWS for designing cross-platform compatibility solutions.",
                    "Gained experience in cloud-based data processing and management.",
                  ]}
                />

                <TimelineItem
                  title="Freelance React & Java Developer"
                  company="Self-Employed"
                  period="Jan 2019 - Dec 2021"
                  description="Provided freelance web development services to various clients, focusing on React frontends and Java backends."
                  responsibilities={[
                    "Developed full-stack web applications for clients using React, Next.js, Spring Boot, and AWS.",
                    "Designed and implemented RESTful APIs.",
                    "Managed application state effectively using Redux.",
                    "Handled client communication, requirement gathering, and project delivery.",
                  ]}
                  isLast={true} // Mark the last item
                />
              </div>
            </div>
          </div>
        </section>

        {/* Education Section - Updated from Resume */}
        <section id="education" ref={sectionRefs.education} className="w-full py-20 md:py-32 relative bg-zinc-900">
          <div className="container px-4 md:px-6 relative">
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
                  <EducationItem
                    degree="B.Tech in Electrical Engineering"
                    institution="MAKAUT, Academy of Technology"
                    period="2018 - 2022"
                    description="Completed Bachelor of Technology with a CGPA of 8.61. Coursework provided a strong analytical foundation relevant to software engineering problem-solving."
                  />
                  {/* Add any other relevant education here if needed */}
                </div>
              </div>

              {/* Certifications - Updated */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Award className="mr-2 h-6 w-6 text-[#d5ff5f]" />
                  Certifications
                </h3>
                <div className="space-y-8">
                  <CertificationItem
                    title="Microsoft Certified: Azure Developer Associate (AZ-204)"
                    issuer="Microsoft"
                    date="Earned" // Add date if known, otherwise keep general
                    description="Validates expertise in designing, building, testing, and maintaining cloud applications and services on Microsoft Azure."
                  />
                  <CertificationItem
                    title="Microsoft Certified: Azure Fundamentals (AZ-900)"
                    issuer="Microsoft"
                    date="Earned" // Add date if known
                    description="Demonstrates foundational knowledge of cloud concepts and Azure services, security, privacy, compliance, trust, pricing, and support."
                  />
                   {/* Add any other relevant certifications here */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Updated using stats array */}
        <section id="stats" ref={sectionRefs.stats} className="w-full py-20 md:py-32 relative bg-black text-white">
          <div className="container px-4 md:px-6 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-[#d5ff5f] mb-2">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Updated using faqItems array */}
        <section id="faq" ref={sectionRefs.faq} className="w-full py-20 md:py-32 relative">
          <div className="container px-4 md:px-6 relative">
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
                {faqItems.map((item, index) => (
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

        {/* Contact Section - Updated Location Text & Map */}
        <section id="contact" ref={sectionRefs.contact} className="w-full py-20 md:py-32 relative bg-zinc-900">
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Get In <span className="text-[#d5ff5f]">Touch</span>
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed">
                  Interested in collaborating or have an opportunity? Let@aposs connect!
                </p>
              </div>
            </div>

            {/* Changed grid layout to md:grid-cols-1 and centered content */}
            <div className="grid md:grid-cols-1 gap-10 max-w-2xl mx-auto"> {/* Adjusted max-width and centering */}
              {/* Contact Info Box - Unchanged structure, links verified */}
              <div className="space-y-6">
                <div className="bg-black p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    {/* Email */}
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-[#d5ff5f]">
                        <Mail className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <a href="mailto:1719pankaj@gmail.com" className="hover:text-[#d5ff5f]">
                          1719pankaj@gmail.com
                        </a>
                      </div>
                    </div>
                    {/* GitHub */}
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-[#d5ff5f]">
                        <Github className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">GitHub</p>
                        <a
                          href="https://github.com/1719pankaj"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#d5ff5f]"
                        >
                          github.com/1719pankaj
                        </a>
                      </div>
                    </div>
                    {/* LinkedIn */}
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-[#d5ff5f]">
                        <Linkedin className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">LinkedIn</p>
                        <a
                          href="https://linkedin.com/in/1719pankaj"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#d5ff5f]"
                        >
                          linkedin.com/in/1719pankaj
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* Availability Text - Updated */}
                  <div className="mt-8">
                    <h4 className="font-medium mb-2">Availability</h4>
                    <p className="text-white">
                     {/* Escape apostrophe */}
                     I&apos;m actively seeking challenging Full-Stack or Software Engineering roles. Feel free to reach out if you have a project or position in mind.
                    </p>
                  </div>
                </div>

                {/* Location Box - Updated Map and Text */}
                <div className="bg-black p-6 shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Location</h3>
                  <div className="aspect-video bg-gray-200 mb-4">
                     {/* Updated iframe source for Kolkata */}
                    <iframe
                      title="Kolkata Map"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=88.26227188110353%2C22.52001001460465%2C88.42294692993164%2C22.627004259373486&layer=mapnik"
                      width="400"
                      height="200"
                      className="w-full h-full object-cover border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  {/* Updated Location Text */}
                  <p className="text-white">Kolkata, West Bengal, India</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

       {/* Footer - Unchanged Structure, links verified */}
      <footer className="w-full border-t border-gray-700 py-8 bg-black">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Pankaj Kumar Roy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/1719pankaj" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-[d5ff5f] hover:text-[#d5ff5f] hover:bg-transparent">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://linkedin.com/in/1719pankaj" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-[d5ff5f] hover:text-[#d5ff5f] hover:bg-transparent">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="mailto:1719pankaj@gmail.com">
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