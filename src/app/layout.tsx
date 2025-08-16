import React from "react";
import "./globals.css";

import type { Metadata, Viewport } from "next";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export const metadata: Metadata = {
  title: {
    default: "Frases",
    template: "%s | Frases",
  },
  description: "Colecciona y busca tus frases favoritas",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const NavMenu = (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Frases</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/">Listado</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Mas opciones</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/">Opcion 1</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            {NavMenu}
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
