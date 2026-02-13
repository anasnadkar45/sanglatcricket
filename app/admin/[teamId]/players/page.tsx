import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function PlayersPage({ params }: {
  params: Promise<{ teamId: string }>
}) {
  const players = await prisma.player.findMany({
    where: { teamId: (await params).teamId },
    orderBy: { createdAt: "desc" },
  });

  const { teamId } = await params;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Players</h1>

        <Link
          href={`/admin/${(await params).teamId}/players/new`}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Add Player
        </Link>
      </div>

      {players.map((player) => (
        <div
          key={player.id}
          className="flex justify-between border p-4 rounded-lg"
        >
          <Image src={player?.imageUrl || "/default-avatar.png"} width={40} height={40} alt={player.name} className="rounded-full" unoptimized />
          <div>
            <p className="font-medium">{player.name}</p>
            <p className="text-sm text-gray-500">{player.role}</p>
          </div>

          <Link
            href={`/admin/${teamId}/players/${player.id}`}
            className="underline"
          >
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
}