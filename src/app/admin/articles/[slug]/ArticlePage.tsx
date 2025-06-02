"use client"

import type React from "react"
import { FormEvent, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

import { CalendarIcon, X, Upload, Eye, Save } from "lucide-react"
import { RichTextEditor } from "@/components/rich-text-editor"
import { createArticle, deleteArticle, updateArticle } from "@/lib/articles"
import { toast } from "sonner"


interface Article {
  id: number;
  title: string | null;
  content: string | null;
  excerpt: string | null;
  featuredImage: string | null;
  tags: string[] | null;
}

export default function ArticlePage(article:Article) {
  console.log(article);
  
  const [tags, setTags] = useState<string[]>(article[0].tags)
  const [currentTag, setCurrentTag] = useState("")  
  const [featuredImage, setFeaturedImage] = useState<string>(article[0].featuredImage)

  const [title,setTitle] = useState(article[0].title)
  const [excerpt,setExcerpt] = useState(article[0].excerpt)
  const [content,setContent] = useState(article[0].content)

  
  

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const handlePublish = async () => {
    const rawData = {
      id:article[0].id,
      title,
      excerpt,
      content,
      featuredImage,
      tags
    }
    const res = await updateArticle(rawData)
    if (res == 'success') toast.success("Article has been updated.")

    if (res == 'error')toast.error("There has been an issue. Try again later")
    }
  
  const handleDelete = async () => {
    const rawData = {
      id:article[0].id,
      title,
      excerpt,
      content,
      featuredImage,
      tags
    }
    const res = await deleteArticle(rawData)
    if (res == 'success') toast.success("Article has been deleted.")
    if (res == 'error')toast.error("There has been an issue. Try again later")

  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Update Article</h1>
        <p className="text-muted-foreground mt-2">Write and publish your post</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>The main content of your post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Enter your blog post title..." className="text-lg" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea 
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)} id="excerpt" placeholder="Write a brief excerpt or summary..." className="min-h-[80px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <RichTextEditor
                  placeholder="Write your blog post content here..."                  
                  value={content}
                  onChange={(c) => {                    
                    setContent(c)
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
              <CardDescription>Upload or provide a URL for the featured image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                />
              </div>              

              {featuredImage && (
                <div className="mt-4">
                  <img
                    src={featuredImage || "/placeholder.svg"}
                    alt="Featured image preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>Add tags to help categorize your post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button onClick={addTag} size="sm">
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1 cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag}
                    <X className="h-3 w-3"  />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 justify-end">
        <Button variant="outline" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Preview
        </Button>        
        <Button onClick={handlePublish} className="flex items-center gap-2">Update Post</Button>
        <Button variant='destructive' onClick={handleDelete} className="flex items-center gap-2">Delete Post</Button>
      </div>
    </div>
  )
}
