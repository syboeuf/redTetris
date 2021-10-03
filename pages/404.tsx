import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function _NotFound() {
  const router = useRouter()
  const [seconds, setSeconds] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000)
    
    if (seconds === 0) {
      clearInterval(interval)
      router.push('/')
    }

    return () => clearInterval(interval)
  }, [seconds])

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
      <Image src="/ghost.svg" width={400} height={400} className="pointer-events-none" />
      <div className="mt-4">
        <p className="mb-2">Désolé, cette page n'existe pas, vous serez redirigé dans {seconds} secondes.</p>
        <Link href="/">
          <a className="font-bold hover:underline">Revenir à l'accueil</a>
        </Link>
      </div>
    </div>
  )
}