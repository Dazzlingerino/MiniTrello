const generateColorForString = (str: string | null, colors: string[], defaultColor: string): string => {
  if (str == null || str.trim() === '') {
    return defaultColor
  }
  // Use a simple hash function to map the string to a number in the range 0 to colors.length - 1
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  hash = Math.abs(hash % colors.length)
  return colors[hash]
}

export default generateColorForString
