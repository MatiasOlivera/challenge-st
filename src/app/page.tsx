import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  const Title = (
    <div className="text-center space-y-2">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Tus frases 📑
      </h1>
      <p className="text-muted-foreground">
        Colecciona y busca tus frases favoritas
      </p>
    </div>
  );

  return (
    <main>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto space-y-8 text-center">
          {Title}

          <div className="flex justify-center">
            <Button variant="outline">
              <Link href="/phrases">Ir a frases</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
