import React, { useRef, useContext, useState, useEffect } from "react"
import ProductInterface from "interfaces/store/ProductInterface"
import HistoryInterface from "interfaces/store/HistoryInterface"
import { getPurchases } from "services/Store/getPurchases.service"
import { StoreContext } from "contexts/Store"
import InputCalendar from "components/UI/InputCalendar"
import Autocomplete from "components/UI/Autocomplete"
import DataTable from "components/UI/DataTable"
import columns from "./const/content"
import {
  Container,
  FiltersContainer,
  FilterButton,
  TableContainer,
  Details,
} from "./styles"

interface RowsInterface {
  item: string
  date: string
  amount: number
  price: number
  margin: number
  cost: number
}

const Purchases = () => {
  const { productsList } = useContext(StoreContext)
  const [historyList, setHistoryList] = useState<HistoryInterface[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDate, setSelectedDate] = useState<string>("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedProduct, setSelectedProduct] = useState<number>()

  const [rows, setRows] = useState<{
    success: boolean
    message?: {
      icon: string
      content: string
    }
    rows: any[]
  }>()

  const rowRef = useRef(null)

  const [selectProductList, setSelectProductList] = useState<
    { id: number; display_name: string }[]
  >([])
  const dateSelectedRef = useRef(null)

  const setAutocompleteProducts = () => {
    const mapping = productsList.map((product: ProductInterface) => ({
      id: product.id,
      display_name: product.name,
    }))
    mapping.push({ id: 0, display_name: "Todos" })
    setSelectProductList(mapping)
  }

  const fillData = async () => {
    const data = await getPurchases(currentPage)
    setHistoryList(data.data)

    const rowsCleaned: RowsInterface[] = []

    data.data.map((history: HistoryInterface) =>
      rowsCleaned.push({
        item: productsList.filter(
          (product: ProductInterface) => product.id === history.item_id,
        )[0]?.name,
        date: history.date,
        amount: history.amount_of_items,
        price: history.final_price,
        margin: history.margin,
        cost: history.cost,
      }),
    )

    setRows({
      success: true,
      rows: rowsCleaned,
    })
  }

  useEffect(() => {
    setAutocompleteProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goNext = () => {
    if (historyList.length > 0) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <Container>
      <FiltersContainer>
        <InputCalendar
          width={200}
          label="Filtrar por fecha"
          reference={dateSelectedRef}
          onChange={e => setSelectedDate(e.selectedChangeDate)}
        />
        <Autocomplete
          width={200}
          label="Filtrar por producto"
          options={selectProductList}
          onChangeProps={(e: { id: number; display_name: string }) =>
            setSelectedProduct(e.id)
          }
        />
        <FilterButton type="button">FILTRAR</FilterButton>
      </FiltersContainer>
      <TableContainer>
        <DataTable
          rows={rows}
          columns={columns}
          height={420}
          totalPages={1}
          reference={rowRef}
          onClickNext={goNext}
          onClickBack={goPrev}
          setPage={currentPage}
        />
      </TableContainer>
      <Details>Detalles</Details>
    </Container>
  )
}

export default Purchases
