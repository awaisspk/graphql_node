import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const allLinks = prisma.link.findMany()
  const newLinks = await prisma.link.create({
    data: {
      url: 'https://youtube.com',
      description:
        'probably the only social media site that is actually helpful ',
    },
  })
  console.log(newLinks)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
