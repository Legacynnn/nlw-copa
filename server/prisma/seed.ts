import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

//Function to seed db
async function main() {
  //Creating User
  const user = await prisma.user.create({
    data:{
      name: 'John doe',
      email: 'John doe@gmail.com',
      avatarUrl: 'https://github.com/Legacynnn.png',
    }
  })

  //Creating Pool
  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id
    }
  })

  //Creating Participant
  const participant = await prisma.participant.create({
    data: {
      userId: user.id,
      poolId: pool.id
    }
  })

  //Creating first Game without Guess
  await prisma.game.create({
    data: {
      date: '2022-11-03T14:58:26.167Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  //Creating Second game with Guess
  await prisma.game.create({
    data: {
      date: '2022-11-03T14:58:26.167Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      //Creating Guess inside game
      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          //Creating Pariticipant inside Guess
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}

main()