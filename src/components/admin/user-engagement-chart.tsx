"use client"

import { useEffect, useRef } from "react"

export function UserEngagementChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return

    // Mock data
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const values = [320, 380, 420, 390, 450, 520, 480]

    // Draw chart
    const canvasWidth = ctx.canvas.width
    const canvasHeight = ctx.canvas.height
    const padding = 10
    const chartWidth = canvasWidth - padding * 2
    const chartHeight = canvasHeight - padding * 2

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Find max value for scaling
    const maxValue = Math.max(...values)

    // Draw line
    ctx.beginPath()
    values.forEach((value, i) => {
      const x = padding + (i / (values.length - 1)) * chartWidth
      const y = canvasHeight - padding - (value / maxValue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.strokeStyle = "#9f7aea" // Purple color
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw area under the line
    ctx.lineTo(padding + chartWidth, canvasHeight - padding)
    ctx.lineTo(padding, canvasHeight - padding)
    ctx.closePath()
    ctx.fillStyle = "rgba(159, 122, 234, 0.1)" // Light purple
    ctx.fill()

    // Draw dots
    values.forEach((value, i) => {
      const x = padding + (i / (values.length - 1)) * chartWidth
      const y = canvasHeight - padding - (value / maxValue) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fillStyle = "#9f7aea"
      ctx.fill()
    })
  }, [])

  return <canvas ref={canvasRef} width={300} height={60} />
}
