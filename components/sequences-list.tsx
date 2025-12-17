"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, MoreHorizontal, Play, Pause, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for sequences
const sequences = [
  {
    id: 1,
    name: "Sales Enablement Motion",
    tags: ["SaaS", "Mid-Market", "Product-Led"],
    responseRate: 28,
    prospects: {
      active: 45,
      paused: 12,
      failed: 3,
      bounced: 5,
    },
    openRate: 62,
    replyRate: 28,
    interests: 14,
    owner: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      initials: "AJ",
    },
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    name: "Sales Leaders",
    tags: ["Enterprise", "Decision Makers", "Leadership"],
    responseRate: 32,
    prospects: {
      active: 78,
      paused: 5,
      failed: 7,
      bounced: 3,
    },
    openRate: 58,
    replyRate: 32,
    interests: 25,
    owner: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg",
      initials: "SM",
    },
    lastUpdated: "1 day ago",
  },
  {
    id: 3,
    name: "CROs",
    tags: ["C-Suite", "Enterprise", "Revenue"],
    responseRate: 18,
    prospects: {
      active: 32,
      paused: 8,
      failed: 4,
      bounced: 2,
    },
    openRate: 45,
    replyRate: 18,
    interests: 6,
    owner: {
      name: "Michael Chen",
      avatar: "/placeholder.svg",
      initials: "MC",
    },
    lastUpdated: "3 days ago",
  },
]

export function SequencesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredSequences = sequences.filter(
    (sequence) =>
      sequence.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sequence.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search sequences..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <Button>Create Sequence</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Sequences</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="paused">Paused</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6">
            {filteredSequences.map((sequence) => (
              <Card key={sequence.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{sequence.name}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {sequence.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-muted-foreground">Response Rate</span>
                          <span className="font-medium">{sequence.responseRate}%</span>
                        </div>
                        <Progress value={sequence.responseRate} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Open Rate</p>
                          <p className="text-lg font-semibold">{sequence.openRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Reply Rate</p>
                          <p className="text-lg font-semibold">{sequence.replyRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Interests</p>
                          <p className="text-lg font-semibold">{sequence.interests}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
                          <p className="text-sm">{sequence.lastUpdated}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Current Prospects</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center gap-2">
                            <Play className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Active: {sequence.prospects.active}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Pause className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">Paused: {sequence.prospects.paused}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <span className="text-sm">Failed: {sequence.prospects.failed}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Bounced: {sequence.prospects.bounced}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-4">
                        <p className="text-sm text-muted-foreground">Owner:</p>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={sequence.owner.avatar} alt={sequence.owner.name} />
                            <AvatarFallback>{sequence.owner.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{sequence.owner.name}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          View Prospects
                        </Button>
                        <Button size="sm" variant={sequence.prospects.active > 0 ? "default" : "secondary"}>
                          {sequence.prospects.active > 0 ? "Pause All" : "Resume All"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active" className="mt-6">
          <p>Active sequences will appear here.</p>
        </TabsContent>
        <TabsContent value="paused" className="mt-6">
          <p>Paused sequences will appear here.</p>
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <p>Completed sequences will appear here.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
