"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Calendar,
  ChevronDown,
  HomeIcon,
  LayoutDashboard,
  Mail,
  Phone,
  Search,
  Settings,
  Users2,
  CheckSquare,
  PhoneCall,
  FileBarChart,
  Mic,
  CalendarClock,
  Building2,
  Send,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export function Sidebar({ className }: { className?: string }) {
  const [isActivityOpen, setIsActivityOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn("bg-background p-4 flex flex-col gap-4", className)}>
      <div className="flex items-center gap-2 px-2">
        <LayoutDashboard className="h-6 w-6" />
        <div className="font-semibold flex items-baseline">
          <span>boilerroom</span>
          <span className="text-primary">.ai</span>
        </div>
      </div>
      <div className="space-y-1">
        <Button variant="ghost" className={cn("w-full justify-start", pathname === "/" && "bg-accent")} asChild>
          <Link href="/">
            <HomeIcon className="h-4 w-4 mr-3" />
            Dashboard
          </Link>
        </Button>

        <Button
          variant="ghost"
          className={cn("w-full justify-start", pathname.includes("/prospecting") && "bg-accent")}
          asChild
        >
          <Link href="/prospecting">
            <Search className="h-4 w-4 mr-3" />
            Prospecting
          </Link>
        </Button>

        <Button
          variant="ghost"
          className={cn("w-full justify-start", pathname === "/prospects" && "bg-accent")}
          asChild
        >
          <Link href="/prospects">
            <Users2 className="h-4 w-4 mr-3" />
            Prospects
          </Link>
        </Button>

        <Button variant="ghost" className={cn("w-full justify-start", pathname === "/accounts" && "bg-accent")} asChild>
          <Link href="/accounts">
            <Building2 className="h-4 w-4 mr-3" />
            Accounts
          </Link>
        </Button>

        <Button
          variant="ghost"
          className={cn("w-full justify-start", pathname === "/sequences" && "bg-accent")}
          asChild
        >
          <Link href="/sequences">
            <Mail className="h-4 w-4 mr-3" />
            Sequences
          </Link>
        </Button>

        {/* New Emailer link above Dialer */}
        <Button variant="ghost" className={cn("w-full justify-start", pathname === "/emailer" && "bg-accent")} asChild>
          <Link href="/emailer">
            <Send className="h-4 w-4 mr-3" />
            Emailer
          </Link>
        </Button>

        <Button variant="ghost" className={cn("w-full justify-start", pathname === "/dialer" && "bg-accent")} asChild>
          <Link href="/dialer">
            <Phone className="h-4 w-4 mr-3" />
            Dialer
          </Link>
        </Button>

        {/* Scheduler - New tab below Dialer */}
        <Button
          variant="ghost"
          className={cn("w-full justify-start", pathname === "/scheduler" && "bg-accent")}
          asChild
        >
          <Link href="/scheduler">
            <CalendarClock className="h-4 w-4 mr-3" />
            Scheduler
          </Link>
        </Button>

        {/* Activity Section */}
        <Collapsible open={isActivityOpen} onOpenChange={setIsActivityOpen} className="space-y-1">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <div className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-3" />
                Activity
              </div>
              <ChevronDown
                className={cn("h-4 w-4 transition-transform duration-200", isActivityOpen ? "rotate-180" : "")}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            <Button variant="ghost" className="w-full justify-start pl-9" asChild>
              <Link href="/activity/emails">
                <Mail className="h-4 w-4 mr-3" />
                Emails Delivered
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-9" asChild>
              <Link href="/activity/calls">
                <PhoneCall className="h-4 w-4 mr-3" />
                Calls Made
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-9" asChild>
              <Link href="/activity/meetings">
                <Calendar className="h-4 w-4 mr-3" />
                Meetings Had
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-9" asChild>
              <Link href="/activity/tasks">
                <CheckSquare className="h-4 w-4 mr-3" />
                Tasks Done
              </Link>
            </Button>
          </CollapsibleContent>
        </Collapsible>

        {/* Call Recordings (Beta) - New tab above Team Overview */}
        <Button
          variant="ghost"
          className={cn("w-full justify-start", pathname === "/call-recordings" && "bg-accent")}
          asChild
        >
          <Link href="/call-recordings">
            <Mic className="h-4 w-4 mr-3" />
            <span className="flex-1 text-left">Call Recordings</span>
            <Badge variant="outline" className="ml-2 text-xs bg-primary/10 text-primary">
              Beta
            </Badge>
          </Link>
        </Button>

        <Button variant="ghost" className={cn("w-full justify-start", pathname === "/reports" && "bg-accent")} asChild>
          <Link href="/reports">
            <FileBarChart className="h-4 w-4 mr-3" />
            Reports
          </Link>
        </Button>
      </div>
      <div className="mt-auto">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="h-4 w-4 mr-3" />
          Settings
        </Button>
      </div>
    </div>
  )
}

