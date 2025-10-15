// "use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggle";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";

export async function Navbar() {
  const cookie = cookies();
  const token = (await cookie).get("token")?.value;
  const user = (await cookie).get("user")?.value;
  const role = user ? JSON.parse(user)?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null;
  const navLinks =
  role === "Admin"
    ? [
        { href: "/", label: "Home" },
        { href: "/admin", label: "Admin" },
        { href: "/admin/users", label: "Create Ticket" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/user/dashboard", label: "Dashboard" },
        { href: "/user/profile", label: "Profile" },
      ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Your Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            HmmamZiad
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                    asChild
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                    <Link href={link.href}>
                        {link.label}
                    </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          
          <ModeToggle />
          {token && user ? (
            <>
             <Button variant="outline" asChild>
              <LogoutButton />
             </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Sign Up</Link>
              </Button> 
            </>
          )
          }
          
        </div>
      </div>
    </nav>
  );
}