"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { Github, Mail, Linkedin, ArrowRight } from "lucide-react"
import { SectionLabel } from "@/components/shared/SectionLabel"
import { BracketLabel } from "@/components/shared/BracketLabel"
import { personalData } from "@/lib/data"

const socials = [
  { label: "GITHUB", href: personalData.github, icon: Github },
  { label: "LINKEDIN", href: personalData.linkedin, icon: Linkedin },
  { label: "MAIL", href: `mailto:${personalData.email}`, icon: Mail },
]

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
})

type ContactForm = z.infer<typeof contactSchema>

export function Contact() {
  const sectionRef = useScrollAnimation({ selector: ".contact-content" })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactForm) => {
    const subject = encodeURIComponent(`Message from portfolio - ${data.name}`)
    const body = encodeURIComponent(
      [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        "",
        data.message,
      ].join("\n")
    )

    window.location.href = `mailto:${personalData.email}?subject=${subject}&body=${body}`
    toast.success("Mail client opened", {
      description: "Please confirm and send the email in your mail client.",
    })
    reset()
  }

  return (
    <section id="contact" ref={sectionRef} className="magazine-page relative px-6 py-32 lg:px-10 lg:py-40">
      <div className="absolute left-0 top-0 h-full w-1/2 text-foreground/25 swiss-dots-fine pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="contact-content">
          <SectionLabel number="06" title="CONTACT" />
        </div>

        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(28rem,1.05fr)] lg:gap-24">
          <div className="contact-content">
            <h2 className="font-editorial mb-8 text-5xl font-black leading-[0.98] tracking-normal text-foreground md:text-6xl lg:text-7xl">
              Let&apos;s build
              <br />
              something.
            </h2>
            <p className="max-w-md border-l border-accent/70 pl-6 leading-8 text-muted-foreground">
              If you have a project, collaboration, or opportunity in mind, feel free to reach out. I&apos;m always happy to discuss interesting ideas.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                  data-cursor-hover
                >
                  <s.icon className="w-4 h-4" />
                  <BracketLabel>{s.label}</BracketLabel>
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="contact-content magazine-paper border border-foreground/12 p-6 sm:p-8 space-y-8" noValidate>
            <div>
              <label className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground block mb-3">
                [NAME]
              </label>
              <input
                type="text"
                {...register("name")}
                className={`w-full bg-transparent border-b py-3 text-foreground focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/50 ${
                  errors.name ? "border-red-500" : "border-[hsla(0,0%,89%,0.12)]"
                }`}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground block mb-3">
                [EMAIL]
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full bg-transparent border-b py-3 text-foreground focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/50 ${
                  errors.email ? "border-red-500" : "border-[hsla(0,0%,89%,0.12)]"
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground block mb-3">
                [MESSAGE]
              </label>
              <textarea
                rows={4}
                {...register("message")}
                className={`w-full bg-transparent border-b py-3 text-foreground focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-muted-foreground/50 ${
                  errors.message ? "border-red-500" : "border-[hsla(0,0%,89%,0.12)]"
                }`}
                placeholder="What's on your mind..."
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-2">{errors.message.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="group inline-flex items-center gap-3 border border-foreground/15 px-5 py-3 font-mono text-sm uppercase tracking-[0.1em] text-foreground hover:border-accent/60 hover:text-accent transition-colors"
              data-cursor-hover
            >
              <BracketLabel hover={false} className="group-hover:text-accent transition-colors">
                OPEN MAIL
              </BracketLabel>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
