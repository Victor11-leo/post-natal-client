"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export interface Question {
  id: string
  type: "multiple-choice" | "single-choice" | "text" | "textarea" | "rating" | "yes-no" | "dropdown"
  title: string
  description?: string
  required: boolean
  options?: string[]
  minRating?: number
  maxRating?: number
}


interface QuestionPreviewProps {
  question: Question
  index: number
}

export function QuestionPreview({ question, index }: QuestionPreviewProps) {
  const renderQuestionInput = () => {
    switch (question.type) {
      case "text":
        return <Input placeholder="Your answer..." />

      case "textarea":
        return <Textarea placeholder="Your answer..." className="min-h-[100px]" />

      case "single-choice":
        return (
          <RadioGroup>
            {question.options?.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${optionIndex}`} />
                <Label htmlFor={`${question.id}-${optionIndex}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )

      case "multiple-choice":
        return (
          <div className="space-y-2">
            {question.options?.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <Checkbox id={`${question.id}-${optionIndex}`} />
                <Label htmlFor={`${question.id}-${optionIndex}`}>{option}</Label>
              </div>
            ))}
          </div>
        )

      case "dropdown":
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option..." />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option, optionIndex) => (
                <SelectItem key={optionIndex} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "rating":
        const min = question.minRating || 1
        const max = question.maxRating || 5
        return (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">{min}</span>
            {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((rating) => (
              <Button key={rating} variant="outline" size="sm" className="w-10 h-10">
                {rating}
              </Button>
            ))}
            <span className="text-sm text-muted-foreground">{max}</span>
          </div>
        )

      case "yes-no":
        return (
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id={`${question.id}-yes`} />
              <Label htmlFor={`${question.id}-yes`}>Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id={`${question.id}-no`} />
              <Label htmlFor={`${question.id}-no`}>No</Label>
            </div>
          </RadioGroup>
        )

      default:
        return <div className="text-muted-foreground">Question type not supported</div>
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2">
        <span className="text-sm font-medium text-muted-foreground mt-1">{index + 1}.</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{question.title || "Untitled Question"}</h3>
            {question.required && <Star className="h-4 w-4 text-orange-500" />}
          </div>
          {question.description && <p className="text-sm text-muted-foreground mt-1">{question.description}</p>}
        </div>
      </div>
      <div className="ml-6">{renderQuestionInput()}</div>
    </div>
  )
}
