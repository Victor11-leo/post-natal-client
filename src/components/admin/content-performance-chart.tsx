"use client"

import { useEffect, useRef } from "react"

export function ContentPerformanceChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return

    // Mock data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const articleViews = [420, 450, 480, 520, 550, 600, 650, 680, 720, 750, 800, 850]
    const completionRates = [65, 68, 70, 72, 75, 78, 80, 82, 83, 85, 86, 88]
    const ratings = [4.2, 4.3, 4.3, 4.4, 4.5, 4.5, 4.6, 4.6, 4.7, 4.7, 4.8, 4.8]

    // Draw chart
    const canvasWidth = ctx.canvas.width
    const canvasHeight = ctx.canvas.height
    const padding = 40
    const chartWidth = canvasWidth - padding * 2
    const chartHeight = canvasHeight - padding * 2

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvasHeight - padding)
    ctx.lineTo(canvasWidth - padding, canvasHeight - padding)
    ctx.strokeStyle = "#e2e8f0"
    ctx.stroke()

    // Draw x-axis labels
    ctx.textAlign = "center"
    ctx.fillStyle = "#64748b"
    ctx.font = "12px sans-serif"

    const xStep = chartWidth / (months.length - 1)
    months.forEach((month, i) => {
      const x = padding + i * xStep
      ctx.fillText(month, x, canvasHeight - padding + 20)
    })

    // Draw y-axis labels for article views
    ctx.textAlign = "right"
    const maxViews = Math.max(...articleViews)
    const yStep = chartHeight / 5

    for (let i = 0; i <= 5; i++) {
      const y = canvasHeight - padding - i * yStep
      const value = Math.round((i / 5) * maxViews)
      ctx.fillText(value.toString(), padding - 10, y + 5)

      // Draw horizontal grid line
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(canvasWidth - padding, y)
      ctx.strokeStyle = "#e2e8f0"
      ctx.stroke()
    }

    // Draw article views line
    ctx.beginPath()
    articleViews.forEach((value, i) => {
      const x = padding + i * xStep
      const y = canvasHeight - padding - (value / maxViews) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.strokeStyle = "#9f7aea" // Purple color
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw completion rates line
    ctx.beginPath()
    completionRates.forEach((value, i) => {
      const x = padding + i * xStep
      const y = canvasHeight - padding - (value / 100) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.strokeStyle = "#ed64a6" // Pink color
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw ratings line
    ctx.beginPath()
    ratings.forEach((value, i) => {
      const x = padding + i * xStep
      const y = canvasHeight - padding - (value / 5) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.strokeStyle = "#38b2ac" // Teal color
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw legend
    const legendX = padding + 20
    const legendY = padding + 20

    // Article views legend
    ctx.beginPath()
    ctx.moveTo(legendX, legendY)
    ctx.lineTo(legendX + 20, legendY)
    ctx.strokeStyle = "#9f7aea"
    ctx.stroke()
    ctx.fillStyle = "#1e293b"
    ctx.textAlign = "left"
    ctx.fillText("Article Views", legendX + 30, legendY + 5)

    // Completion rates legend
    ctx.beginPath()
    ctx.moveTo(legendX, legendY + 20)
    ctx.lineTo(legendX + 20, legendY + 20)
    ctx.strokeStyle = "#ed64a6"
    ctx.stroke()
    ctx.fillText("Completion Rates", legendX + 30, legendY + 25)

    // Ratings legend
    ctx.beginPath()
    ctx.moveTo(legendX, legendY + 40)
    ctx.lineTo(legendX + 20, legendY + 40)
    ctx.strokeStyle = "#38b2ac"
    ctx.stroke()
    ctx.fillText("Ratings", legendX + 30, legendY + 45)
  }, [])

  return <canvas ref={canvasRef} width={800} height={300} className="w-full" />
}
