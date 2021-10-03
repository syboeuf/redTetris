import { Dispatch, SetStateAction } from 'react'

export interface UserContextValues {
  username: string
  updateUsername: (value: string) => void
}