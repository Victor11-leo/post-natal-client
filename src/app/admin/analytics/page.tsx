"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { UserEngagementChart } from "@/components/admin/user-engagement-chart"
import { ContentPerformanceChart } from "@/components/admin/content-performance-chart"
import { QuestionnaireResponsesChart } from "@/components/admin/questionnaire-responses-chart"

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState("month")

  // Mock data for top articles
  const topArticles = [
    {
      id: 1,
      title: "Breastfeeding Basics",
      views: 856,
      completionRate: 78,
      avgRating: 4.7,
      category: "Nutrition",
    },
    {
      id: 2,
      title: "Sleep Training Methods",
      views: 742,
      completionRate: 65,
      avgRating: 4.5,
      category: "Sleep",
    },
    {
      id: 3,
      title: "Developmental Milestones: 0-6 Months",
      views: 689,
      completionRate: 82,
      avgRating: 4.8,
      category: "Development",
    },
    {
      id: 4,
      title: "Introducing Solid Foods",
      views: 621,
      completionRate: 71,
      avgRating: 4.6,
      category: "Nutrition",
    },
    {
      id: 5,
      title: "Postpartum Recovery Tips",
      views: 543,
      completionRate: 69,
      avgRating: 4.4,
      category: "Maternal Health",
    },
  ]

  // Mock data for top users
  const topUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      articlesRead: 24,
      questionnairesCompleted: 12,
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Emily Davis",
      articlesRead: 18,
      questionnairesCompleted: 9,
      lastActive: "5 hours ago",
    },
    {
      id: 3,
      name: "Jessica Williams",
      articlesRead: 32,
      questionnairesCompleted: 15,
      lastActive: "1 day ago",
    },
    {
      id: 4,
      name: "Michelle Brown",
      articlesRead: 15,
      questionnairesCompleted: 7,
      lastActive: "2 days ago",
    },
    {
      id: 5,
      name: "Amanda Wilson",
      articlesRead: 21,
      questionnairesCompleted: 11,
      lastActive: "3 days ago",
    },
  ]

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analytics</h1>
          <p className="text-muted-foreground">Track user engagement and content performance</p>
        </div>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
            <SelectItem value="quarter">Last 90 days</SelectItem>
            <SelectItem value="year">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Article Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,623</div>
            <p className="text-xs text-muted-foreground">+18% from previous period</p>
            <div className="mt-4 h-[60px]">
              <UserEngagementChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Questionnaire Completions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,103</div>
            <p className="text-xs text-muted-foreground">+7% from previous period</p>
            <div className="mt-4 h-[60px]">
              <QuestionnaireResponsesChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Content Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6 / 5</div>
            <p className="text-xs text-muted-foreground">+0.2 from previous period</p>
            <div className="mt-4 flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${i < 4 ? "text-yellow-400" : "text-yellow-200"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Performance</CardTitle>
          <CardDescription>View detailed performance metrics for your content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ContentPerformanceChart />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="articles">
        <TabsList>
          <TabsTrigger value="articles">Top Articles</TabsTrigger>
          <TabsTrigger value="users">Top Users</TabsTrigger>
          <TabsTrigger value="categories">Category Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="border rounded-md p-0 mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Completion Rate</TableHead>
                <TableHead>Avg. Rating</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.views}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={article.completionRate} className="h-2 w-[100px]" />
                      <span className="text-sm">{article.completionRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{article.avgRating}</TableCell>
                  <TableCell>{article.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="users" className="border rounded-md p-0 mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Articles Read</TableHead>
                <TableHead>Questionnaires Completed</TableHead>
                <TableHead>Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.articlesRead}</TableCell>
                  <TableCell>{user.questionnairesCompleted}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="categories" className="border rounded-md p-4 mt-2">
          <div className="grid gap-4">
            <h3 className="text-lg font-medium mb-2">Content Category Breakdown</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-purple-600"></div>
                    <span>Nutrition</span>
                  </div>
                  <span>32%</span>
                </div>
                <Progress value={32} className="h-2" />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-pink-500"></div>
                    <span>Sleep</span>
                  </div>
                  <span>24%</span>
                </div>
                <Progress value={24} className="h-2 bg-muted [&>div]:bg-pink-500" />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                    <span>Development</span>
                  </div>
                  <span>20%</span>
                </div>
                <Progress value={20} className="h-2 bg-muted [&>div]:bg-blue-500" />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-green-500"></div>
                    <span>Maternal Health</span>
                  </div>
                  <span>15%</span>
                </div>
                <Progress value={15} className="h-2 bg-muted [&>div]:bg-green-500" />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-orange-500"></div>
                    <span>Safety</span>
                  </div>
                  <span>9%</span>
                </div>
                <Progress value={9} className="h-2 bg-muted [&>div]:bg-orange-500" />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
