const cleanMargin = (margin: string[]) => {
  return margin.length > 1
    ? `${margin[0]}.${margin[1].slice(0, 2)}`
    : `${margin[0]}`
}

export default cleanMargin
