"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, FileText, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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

export default function ArticlesManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null)

  // Mock data
  const articles = [
    {
      id: 1,
      title: "Breastfeeding Basics",
      category: "Nutrition",
      status: "published",
      subposts: 4,
      questionnaires: 1,
      createdAt: "2023-05-10",
    },
    {
      id: 2,
      title: "Sleep Training Methods",
      category: "Sleep",
      status: "published",
      subposts: 5,
      questionnaires: 2,
      createdAt: "2023-06-15",
    },
    {
      id: 3,
      title: "Developmental Milestones: 0-6 Months",
      category: "Development",
      status: "published",
      subposts: 3,
      questionnaires: 1,
      createdAt: "2023-07-22",
    },
    {
      id: 4,
      title: "Postpartum Recovery Tips",
      category: "Maternal Health",
      status: "draft",
      subposts: 2,
      questionnaires: 0,
      createdAt: "2023-08-05",
    },
    {
      id: 5,
      title: "Introducing Solid Foods",
      category: "Nutrition",
      status: "published",
      subposts: 6,
      questionnaires: 2,
      createdAt: "2023-09-18",
    },
  ]

  const handleDeleteClick = (id: number) => {
    setArticleToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    // Delete logic would go here
    console.log(`Deleting article ${articleToDelete}`)
    setIsDeleteDialogOpen(false)
    setArticleToDelete(null)
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Articles</h1>
          <p className="text-muted-foreground">Create and manage educational content</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-purple-700 hover:bg-purple-800">
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subposts</TableHead>
              <TableHead>Questionnaires</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>
                  <Badge variant={article.status === "published" ? "default" : "secondary"}>{article.status}</Badge>
                </TableCell>
                <TableCell>{article.subposts}</TableCell>
                <TableCell>{article.questionnaires}</TableCell>
                <TableCell>{article.createdAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/articles/${article.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Manage Subposts
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(article.id)}>
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
      </div>

      {/* Create Article Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Article</DialogTitle>
            <DialogDescription>Add a new educational article to your platform</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter article title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
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
              <Textarea id="content" placeholder="Enter article content" rows={8} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="draft">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-700 hover:bg-purple-800">
              Create Article
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this article? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
