import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

async function handleSubmit(formData: FormData) {
  "use server";

  // Handle form data
  const data = Object.fromEntries(formData);

  // Process the data
  console.log(data);

  // Optionally redirect
  redirect("/");
}

interface EditCardProps {
  params: {
    cardId: string;
  };
}

export default function EditCard({ params }: EditCardProps) {
  return (
    <form action={handleSubmit} className="grid w-full gap-3">
      <Label htmlFor="phrase">Frase</Label>
      <Textarea placeholder="En qué estas pensando?" id="phrase" />
      <Button>Crear</Button>
    </form>
  );
}
