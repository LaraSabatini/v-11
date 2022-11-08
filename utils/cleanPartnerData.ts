/* eslint-disable import/prefer-default-export */
export function cleanPartnerData(data: string) {
  const input = data.toLowerCase()
  const finalData = input.charAt(0).toUpperCase() + input.slice(1)

  return finalData
}
