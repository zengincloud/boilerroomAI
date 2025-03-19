"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { LayoutDashboard, Mail, Phone, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { toast } = useToast()

  const handleCall = () => {
    toast({
      title: "Initiating Call",
      description: "Opening dialer...",
    })
  }

  const handleEmail = () => {
    toast({
      title: "New Email",
      description: "Opening email composer...",
    })
  }

  const handleProfileAction = (action: string) => {
    toast({
      title: action,
      description: `Opening ${action.toLowerCase()}...`,
    })
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar className={`w-64 border-r lg:block ${isSidebarOpen ? "block" : "hidden"}`} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-14 border-b px-4 flex items-center justify-between gap-4">
          <div className="flex items-center flex-1 gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <LayoutDashboard className="h-4 w-4" />
            </Button>
            <div className="flex items-center max-w-lg flex-1">
              <Search className="h-4 w-4 absolute ml-3 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search people, accounts, or activities..." />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleCall}>
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleEmail}>
              <Mail className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => handleProfileAction("Profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleProfileAction("Settings")}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleProfileAction("Logout")}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

