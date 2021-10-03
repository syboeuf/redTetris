import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'

export function getRandomUsername() {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors],
    separator: '-',
    length: 2
  })
}

export function isValidUsername(username: string) {
  return /^[0-9a-zA-Z_.-]+$/.test(username)
}