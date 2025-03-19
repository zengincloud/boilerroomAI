"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Clock,
  Calendar,
  ChevronDown,
  ChevronRight,
  Play,
  MoreHorizontal,
  Globe,
  FileText,
  User,
  PhoneCall,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Sample data for accounts and contacts
const accounts = [
  {
    id: 1,
    name: "TechCorp Solutions",
    aiNotes:
      "Recently raised Series B funding of $25M. Expanding their sales team. Looking for sales enablement tools.",
    contacts: [
      {
        id: 101,
        name: "John Smith",
        title: "VP of Sales",
        phone: "+1 (415) 555-1234",
        sequenceStep: "Step 2: Follow-up Call",
        timezone: "PST (GMT-8)",
        notes: "Left Oracle 3 months ago. Connected on LinkedIn January 25.",
        priority: "high",
      },
      {
        id: 102,
        name: "Sarah Johnson",
        title: "Sales Operations Manager",
        phone: "+1 (415) 555-2345",
        sequenceStep: "Step 1: Introduction Call",
        timezone: "PST (GMT-8)",
        notes: "Mentioned pain points around sales productivity in recent post.",
        priority: "medium",
      },
    ],
  },
  {
    id: 2,
    name: "Global Enterprises Inc",
    aiNotes:
      "Undergoing digital transformation. Current CRM contract expires in 3 months. Decision maker is the new CRO.",
    contacts: [
      {
        id: 201,
        name: "Michael Chen",
        title: "Chief Revenue Officer",
        phone: "+1 (212) 555-6789",
        sequenceStep: "Step 3: Demo Follow-up",
        timezone: "EST (GMT-5)",
        notes: "New to role (2 months). Previously at Salesforce. Interested in AI solutions.",
        priority: "high",
      },
      {
        id: 202,
        name: "Jessica Lee",
        title: "Sales Enablement Director",
        phone: "+1 (212) 555-7890",
        sequenceStep: "Step 2: Follow-up Call",
        timezone: "EST (GMT-5)",
        notes: "Champion within the organization. Attended our webinar last month.",
        priority: "high",
      },
      {
        id: 203,
        name: "Robert Taylor",
        title: "Regional Sales Manager",
        phone: "+1 (212) 555-8901",
        sequenceStep: "Step 1: Introduction Call",
        timezone: "EST (GMT-5)",
        notes: "Manages East Coast team. Experiencing high turnover in his team.",
        priority: "medium",
      },
    ],
  },
  {
    id: 3,
    name: "Innovate Software",
    aiNotes: "Fast-growing startup with 150% YoY growth. Pain points around scaling their sales process efficiently.",
    contacts: [
      {
        id: 301,
        name: "Emily Davis",
        title: "Co-founder & CEO",
        phone: "+1 (650) 555-3456",
        sequenceStep: "Step 2: Follow-up Call",
        timezone: "PST (GMT-8)",
        notes: "Technical background. Interested in analytics capabilities. Last connected February 10.",
        priority: "high",
      },
      {
        id: 302,
        name: "David Wilson",
        title: "Head of Sales",
        phone: "+1 (650) 555-4567",
        sequenceStep: "Step 1: Introduction Call",
        timezone: "PST (GMT-8)",
        notes: "New hire from competitor. Building out sales team from scratch.",
        priority: "medium",
      },
    ],
  },
]

// Sample sequences
const sequences = [
  { id: 1, name: "Sales Enablement Motion" },
  { id: 2, name: "Sales Leaders" },
  { id: 3, name: "CROs" },
  { id: 4, name: "Enterprise Outreach" },
  { id: 5, name: "SMB Prospecting" },
]

export function DialerView() {
  const [expandedAccounts, setExpandedAccounts] = useState<number[]>([1, 2]) // Default expanded accounts
  const [selectedSequence, setSelectedSequence] = useState<string>("2") // Default to Sales Leaders
  const [dialingMode, setDialingMode] = useState<string>("power") // Default to power dialing

  const toggleAccount = (accountId: number) => {
    setExpandedAccounts((prev) =>
      prev.includes(accountId) ? prev.filter((id) => id !== accountId) : [...prev, accountId],
    )
  }

  return (
    <div className="space-y-6">
      {/* Dialer Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Dialer Configuration</CardTitle>
          <CardDescription>Configure your dialing session settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="phone-number">Your Phone Number</Label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">+1 (555) 123-4567</span>
              </div>
              <p className="text-xs text-muted-foreground">Calls will appear to come from this number</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dialing-mode">Dialing Mode</Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    id="dialing-mode"
                    checked={dialingMode === "parallel"}
                    onCheckedChange={(checked) => setDialingMode(checked ? "parallel" : "power")}
                  />
                  <span>
                    {dialingMode === "parallel" ? "Parallel Dial (4 at a time)" : "Power Dial (one at a time)"}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {dialingMode === "parallel"
                  ? "Dial up to 4 prospects simultaneously to maximize efficiency"
                  : "Focus on one call at a time for better conversation quality"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sequence">Sequence</Label>
              <Select value={selectedSequence} onValueChange={setSelectedSequence}>
                <SelectTrigger id="sequence">
                  <SelectValue placeholder="Select sequence" />
                </SelectTrigger>
                <SelectContent>
                  {sequences.map((sequence) => (
                    <SelectItem key={sequence.id} value={sequence.id.toString()}>
                      {sequence.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Select the sequence to use for this dialing session</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              <p className="text-sm font-medium">Ready to dial 7 contacts across 3 accounts</p>
              <p className="text-xs text-muted-foreground">Estimated session time: 35-45 minutes</p>
            </div>
            <Button size="lg" className="gap-2">
              <Play className="h-4 w-4" />
              Start Dialing Session
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Call Queue */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Call Queue</h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              Best calling hours
            </Badge>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Contacts</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {accounts.map((account) => (
            <Card key={account.id} className={expandedAccounts.includes(account.id) ? "border-primary/50" : ""}>
              <CardHeader className="py-4 cursor-pointer" onClick={() => toggleAccount(account.id)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {expandedAccounts.includes(account.id) ? (
                      <ChevronDown className="h-5 w-5 mt-1 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 mt-1 text-muted-foreground" />
                    )}
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {account.name}
                        <Badge variant="outline" className="ml-2">
                          {account.contacts.length} contacts
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm max-w-3xl">
                        <span className="font-medium text-primary">AI Insights:</span> {account.aiNotes}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {expandedAccounts.includes(account.id) && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {account.contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10 mt-1">
                              <AvatarImage src={`/placeholder.svg`} alt={contact.name} />
                              <AvatarFallback>
                                {contact.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{contact.name}</h3>
                                <Badge
                                  variant={
                                    contact.priority === "high"
                                      ? "default"
                                      : contact.priority === "medium"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {contact.priority === "high"
                                    ? "High Priority"
                                    : contact.priority === "medium"
                                      ? "Medium Priority"
                                      : "Low Priority"}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                <User className="h-3 w-3" />
                                {contact.title}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-3">
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="h-3 w-3 text-primary" />
                                  <span>{contact.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="h-3 w-3 text-muted-foreground" />
                                  <span>{contact.sequenceStep}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Globe className="h-3 w-3 text-muted-foreground" />
                                  <span>{contact.timezone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <FileText className="h-3 w-3 text-muted-foreground" />
                                  <span className="truncate">{contact.notes}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="gap-1">
                            <PhoneCall className="h-3 w-3" />
                            Call Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

