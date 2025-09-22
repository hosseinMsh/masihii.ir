"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Github, Mail, MessageCircle, ExternalLink, Code, Shield, Database } from "lucide-react"

interface Project {
  id: number
  name: string
  description: string
  html_url: string
  language: string
  topics: string[]
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    // Fetch GitHub projects
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://api.github.com/users/hosseinMsh/repos?sort=updated&per_page=6")
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Floating background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full animate-float" />
        <div
          className="absolute bottom-20 left-20 w-24 h-24 bg-accent/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-primary">
            ح. مسیحی
          </a>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => scrollToSection("about")}>
              درباره
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("skills")}>
              مهارت‌ها
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("projects")}>
              پروژه‌ها
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("contact")}>
              تماس
            </Button>
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              سلام! من <span className="text-primary">حسین مسیحی</span> هستم.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              توسعه‌دهندهٔ نرم‌افزار و تست‌کنندهٔ امنیت/اپلیکیشن در مرکز فاوا شریف. تمرکز: Python، Django، Security &
              Automation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => scrollToSection("projects")} className="bg-primary hover:bg-primary/90">
                دیدن پروژه‌ها
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/hosseinMsh" target="_blank" rel="noreferrer noopener">
                  <Github className="w-4 h-4 ml-2" />
                  GitHub
                </a>
              </Button>
              <Button variant="secondary" onClick={() => scrollToSection("contact")}>
                ارتباط
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-primary/20 animate-glow">
                <img src="/professional-developer-portrait.png" alt="حسین مسیحی" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">درباره من</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            دانشجوی مهندسی کامپیوتر، توسعهٔ بک‌اند با Python/Django/FastAPI/Flask، تست و امنیت (Nmap, Whois, Netcat,
            OpenSSL)، استقرار سرویس‌ها (Rocket.Chat, Elastic, n8n) و اسکریپتینگ لینوکس.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">مهارت‌ها</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Backend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Python, Django, FastAPI, Flask</li>
                  <li>REST APIs, JWT, Postman</li>
                  <li>PostgreSQL, SQL</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  DevOps & Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Nmap, Whois, Netcat, OpenSSL</li>
                  <li>Linux/Shell, CI/CD (GitHub Actions)</li>
                  <li>Elastic stack, n8n, Rocket.Chat</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  Tools & UI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Git/GitHub, Figma</li>
                  <li>HTML, CSS, JS (basic)</li>
                  <li>Monitoring & Scripting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">پروژه‌ها</h2>
          {loading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">بارگذاری پروژه‌ها...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{project.name}</span>
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </CardTitle>
                    <CardDescription>{project.description || "بدون توضیحات"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.language && <Badge variant="secondary">{project.language}</Badge>}
                      {project.topics?.slice(0, 2).map((topic) => (
                        <Badge key={topic} variant="outline">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">داده‌ها از GitHub API بارگذاری می‌شود.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">ارتباط</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>راه‌های تماس</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href="mailto:hossein.masihi@gmail.com" className="text-primary hover:underline">
                    hossein.masihi@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <a
                    href="https://t.me/Hmasih"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-primary hover:underline"
                  >
                    @Hmasih
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-primary" />
                  <a
                    href="https://github.com/hosseinMsh"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-primary hover:underline"
                  >
                    hosseinMsh
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 text-center">📍</span>
                  <span className="text-muted-foreground">تهران، ایران</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>پیام سریع</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" action="mailto:hossein.masihi@gmail.com" method="post" encType="text/plain">
                  <Input type="text" name="name" placeholder="نام" required />
                  <Input type="email" name="email" placeholder="ایمیل" required />
                  <Textarea name="message" rows={4} placeholder="پیام..." required />
                  <Button type="submit" className="w-full">
                    ارسال
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
        <p>© {new Date().getFullYear()} حسین مسیحی — ساخته شده با Next.js و Tailwind CSS</p>
      </footer>
    </div>
  )
}
