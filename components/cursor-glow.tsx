"use client"

import { useEffect, useRef } from "react"

export function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<any[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const particles: any[] = []

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      alpha: number
      life: number
      size: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 4
        this.vy = (Math.random() - 0.5) * 4
        this.alpha = 0.8
        this.life = 1
        this.size = Math.random() * 3 + 2
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.alpha *= 0.98
        this.life *= 0.96
        this.vx *= 0.98
        this.vy *= 0.98
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(138, 43, 226, ${this.alpha * this.life})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Create particles
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(mouseX, mouseY))
      }
    }

    const handleWindowResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw glow circle at cursor
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 40)
      gradient.addColorStop(0, "rgba(138, 43, 226, 0.3)")
      gradient.addColorStop(1, "rgba(138, 43, 226, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(mouseX - 40, mouseY - 40, 80, 80)

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update()
        particles[i].draw(ctx)

        if (particles[i].life < 0.1) {
          particles.splice(i, 1)
        }
      }

      particlesRef.current = particles
      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleWindowResize)
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }} />
}
