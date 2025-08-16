import { PhrasesProvider } from "@/lib/phrases-context";

export const metadata = {
  title: "Frases",
  description: "Colecciona y busca tus frases favoritas",
};

export default function PhraseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PhrasesProvider>{children}</PhrasesProvider>;
}
