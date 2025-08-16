import React, { Suspense } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { CreatePhraseFormContainer, PhrasesCardsContainer, PhrasesCardsFallback, PhrasesProvider } from "@/features/phrases";

const Home: React.FC = () => {
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

  const MyPagination = (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );

  return (
    <PhrasesProvider>
      <main>
        <div className="min-h-screen bg-background p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {Title}

            <div className="max-w-md mx-auto">
              <CreatePhraseFormContainer />
            </div>

            <Suspense fallback={<PhrasesCardsFallback />}>
              <PhrasesCardsContainer />
            </Suspense>

            {MyPagination}
          </div>
        </div>
      </main>
    </PhrasesProvider>
  );
};

export default Home;
