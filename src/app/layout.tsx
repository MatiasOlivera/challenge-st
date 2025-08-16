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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <html lang="en">
      <body>
        {NavMenu}

        {children}
      </body>
    </html>
  );
}
