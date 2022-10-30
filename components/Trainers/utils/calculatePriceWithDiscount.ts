import PricesInterface from "interfaces/partners/PricesInterface"

const calculatePriceWithDiscount = (
  amountOfLessons: number,
  paymentMethodSelected: number,
  prices: PricesInterface[],
) => {
  const lessonPriceForFreePass: {
    amount_of_lessons: number
    cash: number
    mp: number
  }[] = [
    {
      amount_of_lessons: 1,
      cash: prices[3].price_cash - prices[0].price_cash,
      mp: prices[3].price_mp - prices[0].price_mp,
    },
    {
      amount_of_lessons: 4,
      cash: prices[4].price_cash - prices[0].price_cash * 4,
      mp: prices[4].price_mp - prices[0].price_mp * 4,
    },
    {
      amount_of_lessons: 8,
      cash: prices[5].price_cash - prices[0].price_cash * 8,
      mp: prices[5].price_mp - prices[0].price_mp * 8,
    },
  ]

  let price = 0
  switch (amountOfLessons) {
    case 4:
      price =
        paymentMethodSelected === 1
          ? lessonPriceForFreePass[1].cash
          : lessonPriceForFreePass[1].mp
      break
    case 8:
      price =
        paymentMethodSelected === 1
          ? lessonPriceForFreePass[2].cash
          : lessonPriceForFreePass[2].mp
      break
    default:
      price =
        paymentMethodSelected === 1
          ? lessonPriceForFreePass[0].cash * amountOfLessons
          : lessonPriceForFreePass[0].mp * amountOfLessons
  }

  return price
}
export default calculatePriceWithDiscount
