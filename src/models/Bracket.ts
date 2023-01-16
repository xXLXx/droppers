interface Bracket {
  date: Date
  key: string
}

export const getBracketKey = (date: Date): string => {
  const m = date.getMonth() + 1
  const d = date.getDate()

  return `${date.getFullYear()}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`
}

export default Bracket
