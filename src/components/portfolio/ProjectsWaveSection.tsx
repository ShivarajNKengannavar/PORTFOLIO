import { useEffect, useRef } from "react"
import { projects } from "@/data/projects"
import "./wave.css"

export default function ProjectsWaveSection() {
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement
      const index = itemsRef.current.indexOf(active as HTMLDivElement)

      if (e.key === "ArrowRight" && index < itemsRef.current.length - 1) {
        itemsRef.current[index + 1]?.focus()
      }

      if (e.key === "ArrowLeft" && index > 0) {
        itemsRef.current[index - 1]?.focus()
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <section className="wrapper">
      <div className="items">
        {projects.slice(0, 6).map((project, i) => (
          <div
            key={project.id}
            ref={(el) => el && (itemsRef.current[i] = el)}
            className="item"
            tabIndex={0}
            style={{ backgroundImage: `url(${project.image})` }}
          >
            <div className="item-overlay">
              <h3>{project.title}</h3>
              <p>{project.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
