import setProfitsForProducts from "../setProfitsForProducts"
import purchases from "../../../../../tests/mockData/productsPurchased"

describe("setProfitsForProducts", () => {
  it("Returns cash and digital profits from pruchases", () => {
    expect(setProfitsForProducts(purchases)).toEqual({
      cash: 29200,
      digital: 1200,
    })
  })
})
