"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Save } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ArticleEditor({ articleId }) {
  const [activeTab, setActiveTab] = useState("content")

  // Mock data for an existing article
  const article = {
    id: Number.parseInt(articleId),
    title: "Breastfeeding Basics",
    category: "Nutrition",
    content:
      "Breastfeeding is a natural process, but it often comes with challenges. This article covers the basics of proper latching, feeding positions, and common issues new mothers face.\n\nProper latching is essential for effective breastfeeding. The baby's mouth should cover not just the nipple but also part of the areola. Signs of a good latch include the baby's lips being flanged outward, their chin touching the breast, and their nose being clear for breathing.\n\nThere are several comfortable positions for breastfeeding, including the cradle hold, cross-cradle hold, football hold, and side-lying position. Experiment to find what works best for you and your baby.",
    status: "published",
    createdAt: "2023-05-10",
    updatedAt: "2023-06-15",
  }

  // Mock data for subposts
  const subposts = [
    {
      id: 1,
      title: "Proper Latching Techniques",
      status: "published",
      createdAt: "2023-05-12",
    },
    {
      id: 2,
      title: "Common Breastfeeding Positions",
      status: "published",
      createdAt: "2023-05-14",
    },
    {
      id: 3,
      title: "Dealing with Breastfeeding Pain",
      status: "published",
      createdAt: "2023-05-18",
    },
    {
      id: 4,
      title: "Increasing Milk Supply",
      status: "published",
      createdAt: "2023-05-22",
    },
  ]

  // Mock data for attached questionnaires
  const questionnaires = [
    {
      id: 1,
      title: "Breastfeeding Experience Survey",
      questions: 8,
      responses: 156,
      createdAt: "2023-05-15",
    },
  ]

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/articles">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Article</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Preview</Button>
          <Button className="bg-purple-700 hover:bg-purple-800">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="subposts">Subposts</TabsTrigger>
          <TabsTrigger value="questionnaires">Questionnaires</TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" defaultValue={article.title} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue={article.category.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nutrition">Nutrition</SelectItem>
                      <SelectItem value="sleep">Sleep</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="maternal-health">Maternal Health</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" defaultValue={article.content} rows={12} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={article.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div>Created: {article.createdAt}</div>
                  <div>Last Updated: {article.updatedAt}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subposts Tab */}
        <TabsContent value="subposts" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Subposts</CardTitle>
                <Button className="bg-purple-700 hover:bg-purple-800">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Subpost
                </Button>
              </div>
              <CardDescription>Create and manage subposts for this article</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subposts.map((subpost) => (
                    <TableRow key={subpost.id}>
                      <TableCell className="font-medium">{subpost.title}</TableCell>
                      <TableCell>
                        <Badge variant={subpost.status === "published" ? "default" : "secondary"}>
                          {subpost.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{subpost.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Questionnaires Tab */}
        <TabsContent value="questionnaires" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Attached Questionnaires</CardTitle>
                <Button className="bg-purple-700 hover:bg-purple-800">
                  <Plus className="mr-2 h-4 w-4" />
                  Attach Questionnaire
                </Button>
              </div>
              <CardDescription>Manage questionnaires attached to this article</CardDescription>
            </CardHeader>
            <CardContent>
              {questionnaires.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Responses</TableHead>
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
                        <TableCell>{questionnaire.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Responses
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-8 text-center text-gray-500">No questionnaires attached to this article yet.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
