"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { toast } = useToast()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

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
            <div className="flex items-center w-full max-w-2xl">
              <div className="relative w-full">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9 pr-12 py-2 h-10 w-full"
                  placeholder="Search across people, accounts, emails, calls..."
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
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

        {/* Search Dialog */}
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Search</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search across people, accounts, emails, calls..." autoFocus />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium">Recent Searches</h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-sm h-8">
                  <Search className="h-3 w-3 mr-2" />
                  TechCorp account details
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm h-8">
                  <Search className="h-3 w-3 mr-2" />
                  John Doe contact info
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm h-8">
                  <Search className="h-3 w-3 mr-2" />
                  Enterprise Outreach sequence
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 h-full">{children}</main>
      </div>
    </div>
  )
}
