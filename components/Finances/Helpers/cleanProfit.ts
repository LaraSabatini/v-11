const cleanProfit = (finalProfit: number) => {
  const splittedProfit = `${finalProfit}`.split(".")

  return splittedProfit.length > 1
    ? `${splittedProfit[0]}.${splittedProfit[1].slice(0, 2)}`
    : `${splittedProfit[0]}`
}

export default cleanProfit
