export default interface FinancialDataInterface {
  tillEarnings: {
    cash: number
    mp: number
  }
  boulder: {
    earnings: {
      cash: number
      mp: number
    }
    freePass: {
      earnings: {
        cash: number
        mp: number
      }
      individual: number
      packFour: number
      packEight: number
      total: number
      amountOfPeople: number
    }
    lessons: {
      earnings: {
        cash: number
        mp: number
      }
      individual: number
      packFour: number
      packEight: number
      total: number
    }
    month: {
      earnings: {
        cash: number
        mp: number
      }
      total: number
    }
    combo: {
      earnings: {
        cash: number
        mp: number
      }
      total: number
    }
    shoes: {
      earnings: {
        cash: number
        mp: number
      }
      total: number
    }
    freePassWithDiscount: {
      earnings: {
        cash: number
        mp: number
      }
      total: number
    }
  }
  store: {
    earnings: {
      cash: number
      mp: number
    }
  }
}
