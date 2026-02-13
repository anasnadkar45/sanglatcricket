import PlayerForm from "../_components/PlayerForm";

export default async function NewPlayerPage({ params }: {
    params: Promise<{ teamId: string }>
}) {

  console.log("params", (await params).teamId)
  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Add Player</h1>
      <PlayerForm teamId={(await params).teamId} />
    </div>
  );
}