import prisma from '@/lib/db'
import Image from 'next/image';

const TeamBanner = async () => {
    const data = await prisma.team.findMany()

    const team = data[0];
    console.log("team banner", data)
  return (
        <div>
            {team?.bannerUrl && (
                <Image src={team?.bannerUrl} alt='' width={1000} height={400} unoptimized className='rounded-xl max-h-80 object-cover object-top'/>
            )}
        </div>
    )
}

export default TeamBanner