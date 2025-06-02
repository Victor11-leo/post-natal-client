"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, GripVertical, Eye, Save, Settings, Copy, ChevronUp, ChevronDown, Star } from "lucide-react"
import { QuestionBuilder } from "@/components/question-builder"
import { QuestionPreview } from "@/components/question-preview"
import { createQuestionnaire } from "@/lib/articles"
import { toast } from "sonner"

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

export default function CreateQuestionnairePage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [previewMode, setPreviewMode] = useState(false)
  const [questionnaireTitle, setQuestionnaireTitle] = useState("")
  const [questionnaireDescription, setQuestionnaireDescription] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [allowAnonymous, setAllowAnonymous] = useState(true)
  const [collectEmail, setCollectEmail] = useState(false)

  const addQuestion = (type: Question["type"]) => {
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      type,
      title: "",
      required: false,
      options: type === "multiple-choice" || type === "single-choice" || type === "dropdown" ? ["Option 1"] : undefined,
      minRating: type === "rating" ? 1 : undefined,
      maxRating: type === "rating" ? 5 : undefined,
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updates } : q)))
  }

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const duplicateQuestion = (id: string) => {
    const questionToDuplicate = questions.find((q) => q.id === id)
    if (questionToDuplicate) {
      const duplicatedQuestion = {
        ...questionToDuplicate,
        id: `question-${Date.now()}`,
        title: `${questionToDuplicate.title} (Copy)`,
      }
      const index = questions.findIndex((q) => q.id === id)
      const newQuestions = [...questions]
      newQuestions.splice(index + 1, 0, duplicatedQuestion)
      setQuestions(newQuestions)
    }
  }

  const moveQuestion = (id: string, direction: "up" | "down") => {
    const index = questions.findIndex((q) => q.id === id)
    if (index === -1) return

    const newQuestions = [...questions]
    const newIndex = direction === "up" ? index - 1 : index + 1

    if (newIndex >= 0 && newIndex < questions.length) {
      ;[newQuestions[index], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[index]]
      setQuestions(newQuestions)
    }
  }

  const questionTypes = [
    { value: "multiple-choice", label: "Multiple Choice" },
    { value: "single-choice", label: "Single Choice" },
    { value: "text", label: "Short Text" },
    { value: "textarea", label: "Long Text" },
    { value: "rating", label: "Rating Scale" },
    { value: "yes-no", label: "Yes/No" },
    { value: "dropdown", label: "Dropdown" },
  ] as const

  if (previewMode) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Preview Questionnaire</h1>
            <p className="text-muted-foreground mt-2">See how your questionnaire will look to respondents</p>
          </div>
          <Button onClick={() => setPreviewMode(false)} variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Edit Mode
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{questionnaireTitle || "Untitled Questionnaire"}</CardTitle>
            {questionnaireDescription && <CardDescription>{questionnaireDescription}</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((question, index) => (
              <QuestionPreview key={question.id} question={question} index={index} />
            ))}
            {questions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No questions added yet. Switch to edit mode to add questions.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4 mt-8 justify-end">
          <Button variant="outline">Save Draft</Button>
          <Button>Publish Questionnaire</Button>
        </div>
      </div>
    )
  }

  const handlePublish = async () => {
    const rawData = {
      title:questionnaireTitle,
      description:questionnaireDescription,
      questions
    }
    console.log(rawData);
    const res = await createQuestionnaire(rawData)
    if (res == 'success') toast.success("Questionnaire has been created.")

    if (res == 'error')toast.error("There has been an issue. Try again later")
  }
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Create Questionnaire</h1>
          <p className="text-muted-foreground mt-2">Build your custom questionnaire with various question types</p>
        </div>
        <Button onClick={() => setPreviewMode(true)} variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Questionnaire Header */}
          <Card>
            <CardHeader>
              <CardTitle>Questionnaire Details</CardTitle>
              <CardDescription>Basic information about your questionnaire</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter questionnaire title..."
                  value={questionnaireTitle}
                  onChange={(e) => setQuestionnaireTitle(e.target.value)}
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the purpose of this questionnaire..."
                  value={questionnaireDescription}
                  onChange={(e) => setQuestionnaireDescription(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Questions ({questions.length})</CardTitle>
              <CardDescription>Add and configure your questionnaire questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      <Badge variant="outline">{questionTypes.find((t) => t.value === question.type)?.label}</Badge>
                      <span className="text-sm text-muted-foreground">Question {index + 1}</span>
                      {question.required && <Star className="h-4 w-4 text-orange-500" />}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveQuestion(question.id, "up")}
                        disabled={index === 0}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveQuestion(question.id, "down")}
                        disabled={index === questions.length - 1}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => duplicateQuestion(question.id)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteQuestion(question.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <QuestionBuilder question={question} onUpdate={(updates) => updateQuestion(question.id, updates)} />
                </div>
              ))}

              {questions.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <p className="text-muted-foreground mb-4">No questions added yet</p>
                  <p className="text-sm text-muted-foreground">Use the "Add Question" buttons to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Add Question */}
          <Card>
            <CardHeader>
              <CardTitle>Add Question</CardTitle>
              <CardDescription>Choose a question type to add</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {questionTypes.map((type) => (
                <Button
                  key={type.value}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addQuestion(type.value)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {type.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handlePublish} className="w-full">Publish Questionnaire</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
