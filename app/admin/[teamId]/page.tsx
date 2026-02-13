import prisma from "@/lib/db";
import Link from "next/link";


export default async function Page({ params }: {
    params: Promise<{ teamId: string }>
}) {
    const { teamId } = await params;

    return (
        <div>
            <h1>Team ID: {teamId}</h1>
            <Link className="text-blue-500 hover:underline" href={`/admin/${teamId}/players`}>View all players</Link>
        </div>
    );
}