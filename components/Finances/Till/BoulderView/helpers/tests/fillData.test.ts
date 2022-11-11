import fillData from "../fillData"
import partnerPaymentsByDateMockData from '../../../../../../tests/mockData/partnerPayments'

describe("fillData", () => {
  it("Returns a object with data filled", () => {
    const expected = {
    individualEarningsCash:2400,
    individualEarningsMP: 2400,
    individualUnitsSold:6,
    }

    expect(fillData(2,partnerPaymentsByDateMockData)).toEqual(expected)
  })
})
