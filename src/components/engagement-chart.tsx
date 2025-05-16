"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

export function EngagementChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return

    // Mock data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    const articleViews = [420, 380, 500, 480, 600, 650]
    const questionnaireCompletions = [120, 150, 180, 200, 240, 280]

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

    // Draw y-axis labels
    ctx.textAlign = "right"
    const maxValue = Math.max(...articleViews, ...questionnaireCompletions)
    const yStep = chartHeight / 5

    for (let i = 0; i <= 5; i++) {
      const y = canvasHeight - padding - i * yStep
      const value = Math.round((i / 5) * maxValue)
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
      const y = canvasHeight - padding - (value / maxValue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw questionnaire completions line
    ctx.beginPath()
    questionnaireCompletions.forEach((value, i) => {
      const x = padding + i * xStep
      const y = canvasHeight - padding - (value / maxValue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.strokeStyle = "#10b981"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw legend
    const legendX = canvasWidth - padding - 180
    const legendY = padding + 20

    // Article views legend
    ctx.beginPath()
    ctx.moveTo(legendX, legendY)
    ctx.lineTo(legendX + 20, legendY)
    ctx.strokeStyle = "#3b82f6"
    ctx.stroke()
    ctx.fillStyle = "#1e293b"
    ctx.textAlign = "left"
    ctx.fillText("Article Views", legendX + 30, legendY + 5)

    // Questionnaire completions legend
    ctx.beginPath()
    ctx.moveTo(legendX, legendY + 20)
    ctx.lineTo(legendX + 20, legendY + 20)
    ctx.strokeStyle = "#10b981"
    ctx.stroke()
    ctx.fillText("Questionnaire Completions", legendX + 30, legendY + 25)
  }, [])

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">User Engagement Trends</h3>
      <Card className="p-4">
        <canvas ref={canvasRef} width={800} height={400} className="w-full h-[300px] md:h-[400px]" />
      </Card>
    </div>
  )
}
