import styles from './Username.module.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@contexts/User/User.context'
import { isValidUsername } from '@utils/User.utils'

export default function Username() {
  const { username, updateUsername } = useContext(UserContext)
  const [value, setValue] = useState('')

  function onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  useEffect(() => {
    const shouldUpdate = isValidUsername(value)
      && value !== username

    if (shouldUpdate) {
      const timeoutId = setTimeout(() => {
        updateUsername(value)
      }, 1000)
  
      return () => clearTimeout(timeoutId)
    }
  }, [value])

  useEffect(() => {
    setValue(username)
  }, [username])

  return (
    <input
      value={value}
      onChange={onValueChange}
      placeholder="Votre pseudo"
      className={styles.input}
    />
  )
}