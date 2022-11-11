import setLessonsData from "../setLessonsData"

describe("setLessonsData", () => {
  it("Returns a object with data filled", () => {
    const partnerPaymentsByDateMockData = [
        {
          amount_of_items: 4,
          date: "10-11-2022",
          id: 2,
          item_id: 4,
          item_name: "Dia",
          payment_method_id: 2,
          profit: 2400,
          created_by: 1,
        },
        {
          amount_of_items: 8,
          date: "10-11-2022",
          id: 2,
          item_id: 4,
          item_name: "Clases",
          payment_method_id: 1,
          profit: 1500,
          created_by: 1,
        },
      ]

    const expected = [1, 1]

    expect(setLessonsData(partnerPaymentsByDateMockData)).toEqual(expected)
  })
})
