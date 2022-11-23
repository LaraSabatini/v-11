const cleanPartnerData = (data: string) => {
  const input = data.toLowerCase()
  const cleanedData = input.charAt(0).toUpperCase() + input.slice(1)

  return cleanedData
}

export default cleanPartnerData
