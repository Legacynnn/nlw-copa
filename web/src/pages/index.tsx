import Image from 'next/image'

import appPreviewImg from '/home/Legacyn/Projetos/nlw/web/src/assets/app-nlw-copa-preview.png'
import logoImage from '../assets/logo.svg'
import avatar from '/home/Legacyn/Projetos/nlw/web/src/assets/users-avatar-exemples.png'
import iconCheck from '/home/Legacyn/Projetos/nlw/web/src/assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'


interface HomeProps {
  poolCount: number,
  guessCount: number,
  userCount: number
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent){
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      }) 

      const {code} = response.data

      await navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso')

      setPoolTitle('')
    } catch (error) {
      alert('Falha ao criar o bolão')
    }
  }
  
  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center '>
      <main>
        <Image src={logoImage} alt="Logo" />

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={avatar} alt="Avatars" />
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{props.userCount}</span> Pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className='mt-10 flex gap-2 text-gray-100'>
          <input className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm' type="text" required  placeholder='Qual nome do seu bolão?' onChange={event => setPoolTitle(event.target.value)} value={poolTitle} />
          <button className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700' type="submit">CRIAR MEU BOLÃO</button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className='mt-10 pt-10 border-t border-gray-500 flex items-center justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheck} alt="" quality={100} />
            <div className='flex flex-col '>
              <span className='font-bold text-2xl '>+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-500'/>

          <div>
            <div className='flex items-center gap-6'>
              <Image src={iconCheck} alt="" quality={100} />
              <div className='flex flex-col '>
                <span className='font-bold text-2xl '>+{props.guessCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Image src={appPreviewImg} alt="App Preview" quality={100} />
    </div>
  )
}

export const getServerSideProps = async () => {
  //users/count

  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count'),
  ])

  console.log(userCountResponse)

  return {
    props: {
      poolCount: poolCountResponse.data.pools,
      guessCount: guessCountResponse.data.Guesses,
      userCount: userCountResponse.data.User
    }
  }
}