"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Lightbulb,
  User,
  LogOut,
  Bookmark,
  LayoutDashboard,
  PlusCircle,
  Search,
  Info,
  FileText,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSession } from "@/actions/auth.action";
import { Roles } from "@/constants/roles";
import { useLogout } from "@/hooks/useLogout";

// Navigation items for public routes
const navItems = [
  { name: "Home", href: "/", icon: null },
  { name: "Ideas", href: "/ideas", icon: Lightbulb },
  { name: "About", href: "/about", icon: Info },
  { name: "Blog", href: "/blog", icon: FileText },
  { name: "Pricing", href: "/pricing", icon: CreditCard },
];

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { logout } = useLogout()
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    const fetchUser = async () => {
      const { data } = await getSession();
      setUser(data?.user || null);
    };
    fetchUser();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/ideas?search=${encodeURIComponent(searchTerm)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  const getDashboardRoute = () => {
    if (!user) return "/";
    return user.role === Roles.ADMIN ? "/admin" : "/member";
  };

  const getProfileRoute = () => {
    if (!user) return "/profile";
    return user.role === Roles.ADMIN ? "/admin/profile" : "/member/profile";
  };

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm"
          : "bg-background border-b"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                GreenSpark
              </span>
              <span className="hidden sm:inline text-xs text-muted-foreground">| Sustainable Ideas</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive(item.href)
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "text-muted-foreground hover:text-green-600 hover:bg-muted"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="flex items-center gap-2">
              {/* Search - Desktop */}
              <form onSubmit={handleSearch} className="hidden lg:flex relative">
                <Input
                  type="text"
                  placeholder="Search ideas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-9 pr-4"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </form>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <Avatar className="w-8 h-8 transition-transform hover:scale-105">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback className="bg-green-100 text-green-700 text-sm font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-green-600 capitalize mt-1">
                        {user.role.toLowerCase()}
                      </p>
                    </div>
                    <DropdownMenuSeparator />

                    {/* Dashboard */}
                    <DropdownMenuItem asChild>
                      <Link href={getDashboardRoute()} className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>

                    {/* My Ideas (only for members) */}
                    {user.role === Roles.MEMBER && (
                      <DropdownMenuItem asChild>
                        <Link href="/member/ideas" className="cursor-pointer">
                          <Lightbulb className="mr-2 h-4 w-4" />
                          My Ideas
                        </Link>
                      </DropdownMenuItem>
                    )}

                    {/* Create Idea (only for members) */}
                    {user.role === Roles.MEMBER && (
                      <DropdownMenuItem asChild>
                        <Link href="/member/ideas/create" className="cursor-pointer">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Create Idea
                        </Link>
                      </DropdownMenuItem>
                    )}

                    {/* Bookmarks */}
                    {user.role === Roles.MEMBER && (
                      <DropdownMenuItem asChild>
                        <Link href="/member/bookmarks" className="cursor-pointer">
                          <Bookmark className="mr-2 h-4 w-4" />
                          Bookmarks
                        </Link>
                      </DropdownMenuItem>
                    )}

                    {/* Profile */}
                    <DropdownMenuItem asChild>
                      <Link href={getProfileRoute()} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-full max-w-sm p-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 border-b">
              <div className="flex items-center justify-between">
                <SheetTitle>
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="text-xl font-bold text-green-600">GreenSpark</span>
                  </Link>
                </SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search ideas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Footer Actions */}
            <div className="p-4 border-t space-y-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 bg-muted/30 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback className="bg-green-100 text-green-700 text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      <p className="text-xs text-green-600 capitalize">{user.role.toLowerCase()}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href={getDashboardRoute()}>
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>

                  {user.role === Roles.MEMBER && (
                    <>
                      <Button
                        variant="outline"
                        className="w-full"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href="/member/ideas">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          My Ideas
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href="/member/ideas/create">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Create Idea
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href="/member/bookmarks">
                          <Bookmark className="h-4 w-4 mr-2" />
                          Bookmarks
                        </Link>
                      </Button>
                    </>
                  )}

                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href={getProfileRoute()}>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </Button>

                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    asChild
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}