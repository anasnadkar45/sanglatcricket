import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function SubmitPlayerButton({ player }: { player?: any }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending
        ? "Saving..."
        : player
        ? "Update Player"
        : "Add Player"}
    </Button>
  );
}