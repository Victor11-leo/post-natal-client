"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function QuestionnairesManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState<any>(null)

  // Mock data
  const questionnaires = [
    {
      id: 1,
      title: "Breastfeeding Experience Survey",
      questions: 8,
      responses: 156,
      relatedArticle: "Breastfeeding Basics",
      createdAt: "2023-05-15",
    },
    {
      id: 2,
      title: "Sleep Patterns Questionnaire",
      questions: 10,
      responses: 203,
      relatedArticle: "Sleep Training Methods",
      createdAt: "2023-06-20",
    },
    {
      id: 3,
      title: "Developmental Milestones Checklist",
      questions: 12,
      responses: 178,
      relatedArticle: "Developmental Milestones: 0-6 Months",
      createdAt: "2023-07-25",
    },
    {
      id: 4,
      title: "Solid Foods Introduction Survey",
      questions: 9,
      responses: 142,
      relatedArticle: "Introducing Solid Foods",
      createdAt: "2023-09-22",
    },
  ]

  const handleEdit = (questionnaire: any) => {
    setCurrentQuestionnaire(questionnaire)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Questionnaires</h1>
          <p className="text-muted-foreground">Create and manage questionnaires</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-purple-700 hover:bg-purple-800">
          <Plus className="mr-2 h-4 w-4" />
          New Questionnaire
        </Button>
      </div>

      <Tabs defaultValue="questionnaires">
        <TabsList>
          <TabsTrigger value="questionnaires">Questionnaires</TabsTrigger>
          <TabsTrigger value="responses">User Responses</TabsTrigger>
        </TabsList>
        <TabsContent value="questionnaires" className="border rounded-md p-0 mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead>Related Article</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questionnaires.map((questionnaire) => (
                <TableRow key={questionnaire.id}>
                  <TableCell className="font-medium">{questionnaire.title}</TableCell>
                  <TableCell>{questionnaire.questions}</TableCell>
                  <TableCell>{questionnaire.responses}</TableCell>
                  <TableCell>{questionnaire.relatedArticle}</TableCell>
                  <TableCell>{questionnaire.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(questionnaire)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="responses" className="border rounded-md p-4 mt-2">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Response Analytics</h3>
            <p className="text-muted-foreground">
              Select a questionnaire from the Questionnaires tab to view detailed response analytics
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Questionnaire Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Questionnaire</DialogTitle>
            <DialogDescription>Add a new questionnaire to your platform</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter questionnaire title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter questionnaire description" rows={3} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="related-article">Related Article</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select related article" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breastfeeding">Breastfeeding Basics</SelectItem>
                  <SelectItem value="sleep-training">Sleep Training Methods</SelectItem>
                  <SelectItem value="milestones">Developmental Milestones: 0-6 Months</SelectItem>
                  <SelectItem value="postpartum">Postpartum Recovery Tips</SelectItem>
                  <SelectItem value="solid-foods">Introducing Solid Foods</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Questions</h4>
              <div className="space-y-4">
                <div className="grid gap-2 p-3 border rounded-md">
                  <div className="flex justify-between">
                    <Label htmlFor="question-1">Question 1</Label>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      Remove
                    </Button>
                  </div>
                  <Input id="question-1" placeholder="Enter your question" />
                  <div className="grid gap-2">
                    <Label htmlFor="question-type-1">Question Type</Label>
                    <Select defaultValue="multiple-choice">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                        <SelectItem value="yes-no">Yes/No</SelectItem>
                        <SelectItem value="scale">Scale (1-5)</SelectItem>
                        <SelectItem value="text">Text Answer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-700 hover:bg-purple-800">
              Create Questionnaire
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Questionnaire Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Questionnaire</DialogTitle>
            <DialogDescription>Make changes to the questionnaire</DialogDescription>
          </DialogHeader>
          {currentQuestionnaire && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input id="edit-title" defaultValue={currentQuestionnaire.title} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea id="edit-description" placeholder="Enter questionnaire description" rows={3} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-related-article">Related Article</Label>
                <Select defaultValue="breastfeeding">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breastfeeding">Breastfeeding Basics</SelectItem>
                    <SelectItem value="sleep-training">Sleep Training Methods</SelectItem>
                    <SelectItem value="milestones">Developmental Milestones: 0-6 Months</SelectItem>
                    <SelectItem value="postpartum">Postpartum Recovery Tips</SelectItem>
                    <SelectItem value="solid-foods">Introducing Solid Foods</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Questions</h4>
                <div className="space-y-4">
                  {/* Example of existing questions */}
                  <div className="grid gap-2 p-3 border rounded-md">
                    <div className="flex justify-between">
                      <Label htmlFor="edit-question-1">Question 1</Label>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        Remove
                      </Button>
                    </div>
                    <Input id="edit-question-1" defaultValue="How often do you breastfeed your baby?" />
                    <div className="grid gap-2">
                      <Label htmlFor="edit-question-type-1">Question Type</Label>
                      <Select defaultValue="multiple-choice">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                          <SelectItem value="yes-no">Yes/No</SelectItem>
                          <SelectItem value="scale">Scale (1-5)</SelectItem>
                          <SelectItem value="text">Text Answer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-700 hover:bg-purple-800">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
