import { searchProductsAction } from "helpers/store"
import cleanMargin from "utils/cleanMargin"
import RowsInterface from "interfaces/store/RowsInterface"
import ProductInterface from "interfaces/store/ProductInterface"
import OptionsInterface from "interfaces/store/OptionsInterface"

const searchProducts = async (
  searchValueForStock: string,
  brands: OptionsInterface[],
  categories: OptionsInterface[],
) => {
  const search = await searchProductsAction(searchValueForStock, 1)
  const rowsCleaned: RowsInterface[] = []

  search.map((product: ProductInterface) => {
    const marginString = `${product.margin}`
    const cleanIt = cleanMargin(marginString.split("."))
    const finalMargin = cleanIt.includes(".")
      ? parseFloat(cleanIt)
      : parseInt(cleanIt, 10)

    rowsCleaned.push({
      id: product.id,
      item: product.name,
      brand: brands.filter(
        (brand: OptionsInterface) => brand.id === product.brand_id,
      )[0]?.name,
      category: categories.filter(
        (category: OptionsInterface) => category.id === product.category_id,
      )[0]?.name,
      stock: product.stock,
      price: product.price,
      margin: finalMargin,
      cost: product.cost,
      sales_contact_name: product.sales_contact_name,
      sales_contact_information: product.sales_contact_information,
    })
    return 0
  })

  return {
    products: search,
    rows: {
      success: true,
      rows: rowsCleaned,
    },
  }
}

export default searchProducts
