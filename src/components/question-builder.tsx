"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X } from "lucide-react"

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


interface QuestionBuilderProps {
  question: Question
  onUpdate: (updates: Partial<Question>) => void
}

export function QuestionBuilder({ question, onUpdate }: QuestionBuilderProps) {
  const addOption = () => {
    const currentOptions = question.options || []
    onUpdate({
      options: [...currentOptions, `Option ${currentOptions.length + 1}`],
    })
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(question.options || [])]
    newOptions[index] = value
    onUpdate({ options: newOptions })
  }

  const removeOption = (index: number) => {
    const newOptions = question.options?.filter((_, i) => i !== index)
    onUpdate({ options: newOptions })
  }

  const renderQuestionTypeSettings = () => {
    switch (question.type) {
      case "multiple-choice":
      case "single-choice":
      case "dropdown":
        return (
          <div className="space-y-2">
            <Label>Options</Label>
            {question.options?.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeOption(index)}
                  disabled={(question.options?.length || 0) <= 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addOption} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
        )

      case "rating":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`min-${question.id}`}>Min Rating</Label>
              <Select
                value={question.minRating?.toString()}
                onValueChange={(value) => onUpdate({ minRating: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Min" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`max-${question.id}`}>Max Rating</Label>
              <Select
                value={question.maxRating?.toString()}
                onValueChange={(value) => onUpdate({ maxRating: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Max" />
                </SelectTrigger>
                <SelectContent>
                  {[3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`title-${question.id}`}>Question Title</Label>
        <Input
          id={`title-${question.id}`}
          value={question.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Enter your question..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`description-${question.id}`}>Description (Optional)</Label>
        <Textarea
          id={`description-${question.id}`}
          value={question.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Add additional context or instructions..."
          className="min-h-[60px]"
        />
      </div>

      {renderQuestionTypeSettings()}

      <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center space-x-2">
          <Switch
            id={`required-${question.id}`}
            checked={question.required}
            onCheckedChange={(checked) => onUpdate({ required: checked })}
          />
          <Label htmlFor={`required-${question.id}`}>Required</Label>
        </div>
      </div>
    </div>
  )
}
