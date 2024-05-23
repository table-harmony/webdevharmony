import Link from "next/link";

import { CommandMenu } from "@/components/command-menu";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";

export async function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-muted/60 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
      <div className="container flex h-14 items-center md:justify-between gap-2">
        <MainNav />
        <MobileNav />
        <CommandMenu />
        <nav className="flex items-center gap-2">
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
