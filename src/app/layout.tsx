import "./globals.css";

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

export const metadata = {
  title: "Frases",
  description: "Colecciona y busca tus frases favoritas",
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
