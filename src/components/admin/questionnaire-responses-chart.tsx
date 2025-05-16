"use client"

import { useEffect, useRef } from "react"

export function QuestionnaireResponsesChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return

    // Mock data
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const values = [85, 110, 95, 120, 140, 160, 130]

    // Draw chart
    const canvasWidth = ctx.canvas.width
    const canvasHeight = ctx.canvas.height
    const padding = 10
    const chartWidth = canvasWidth - padding * 2
    const chartHeight = canvasHeight - padding * 2
    const barWidth = chartWidth / days.length - 8

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Find max value for scaling
    const maxValue = Math.max(...values)

    // Draw bars
    values.forEach((value, i) => {
      const x = padding + i * (chartWidth / days.length) + 4
      const barHeight = (value / maxValue) * chartHeight
      const y = canvasHeight - padding - barHeight

      ctx.beginPath()
      ctx.rect(x, y, barWidth, barHeight)
      ctx.fillStyle = "#ed64a6" // Pink color
      ctx.fill()
    })
  }, [])

  return <canvas ref={canvasRef} width={300} height={60} />
}
