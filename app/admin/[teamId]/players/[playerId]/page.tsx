import prisma from "@/lib/db";
import PlayerForm from "../_components/PlayerForm";

export default async function EditPlayerPage({
  params,
}: {
  params: Promise<{ teamId: string; playerId: string }>;
}) {
  const { teamId, playerId } = await params;
  const player = await prisma.player.findUnique({
    where: { id: playerId },
  });

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Player</h1>

      <PlayerForm teamId={teamId} player={player} />
    </div>
  );
}