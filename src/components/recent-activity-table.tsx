import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function RecentActivityTable() {
  const activities = [
    {
      id: 1,
      user: { name: "Sarah Johnson", avatar: "/placeholder-user.jpg", initials: "SJ" },
      action: "Completed questionnaire",
      topic: "Infant Nutrition",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: { name: "Emily Davis", avatar: "/placeholder-user.jpg", initials: "ED" },
      action: "Read article",
      topic: "Sleep Training",
      time: "3 hours ago",
    },
    {
      id: 3,
      user: { name: "Jessica Williams", avatar: "/placeholder-user.jpg", initials: "JW" },
      action: "Completed questionnaire",
      topic: "Developmental Milestones",
      time: "5 hours ago",
    },
    {
      id: 4,
      user: { name: "Michelle Brown", avatar: "/placeholder-user.jpg", initials: "MB" },
      action: "Read article",
      topic: "Breastfeeding Tips",
      time: "6 hours ago",
    },
    {
      id: 5,
      user: { name: "Amanda Wilson", avatar: "/placeholder-user.jpg", initials: "AW" },
      action: "Completed questionnaire",
      topic: "Postpartum Recovery",
      time: "8 hours ago",
    },
  ]

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Recent User Activity</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                    <AvatarFallback>{activity.user.initials}</AvatarFallback>
                  </Avatar>
                  <span>{activity.user.name}</span>
                </div>
              </TableCell>
              <TableCell>{activity.action}</TableCell>
              <TableCell>{activity.topic}</TableCell>
              <TableCell className="text-right">{activity.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
