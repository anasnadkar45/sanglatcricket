import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/db'
import Link from 'next/link'
import React from 'react'

const page = async() => {
  const team = await prisma.team.findMany()

  console.log("team", team)
  return (
    <div>
      {team.map((t)=>(
        <Link key={t.id} href={`/admin/${t.id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{t.name}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default page