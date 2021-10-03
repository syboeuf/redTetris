import { createContext, useEffect, useState } from 'react'
import { getCookie, setCookie } from '@utils/Cookies.utils'
import { UserContextValues } from './User.types'
import { toast } from 'react-toastify'
import { getRandomUsername } from '@utils/User.utils'

export const UserContext = createContext<UserContextValues>({
  username: '',
  updateUsername: () => null,
})

export function UserProvider({ children }: any) {
  const [username, setUsername] = useState('')

  function updateUsername(value: string) {
    setUsername(value)
    setCookie('_redtetris_username', value)
    toast('Votre pseudo a été sauvegardé', {
      toastId: 'pseudo_saved'
    })
  }

  useEffect(() => {
    if (!getCookie('_redtetris_username')) {
      setCookie('_redtetris_username', getRandomUsername())
    }

    const retrievedUsername = getCookie('_redtetris_username')
    setUsername(retrievedUsername)
  }, [])

  return (
    <UserContext.Provider value={{ username, updateUsername }}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.displayName = 'UserProvider'
UserContext.displayName = 'UserContext'