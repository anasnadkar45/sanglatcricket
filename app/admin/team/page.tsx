import React from 'react'
import CreateTeamForm from './_components/CreateTeamForm'
import prisma from '@/lib/db'
import EditTeamForm from './_components/EditTeamForm'

const page = async() => {
  const team = await prisma.team.findMany()
  return (
    <div>
        <CreateTeamForm />
        <EditTeamForm team={team[0]} />
    </div>
  )
}

export default page