import styled from "styled-components"
import theme from "theme/index"

const MainButton = styled.div`
  width: fit-content;
  position: relative;

  .subbutton {
    border: none;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.1);
    font-family: ${theme.fonts.primary};
    z-index: 500;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.324);
    }
  }
`
const CreateProduct = styled.button`
  border-radius: 50%;
  width: 45px;
  height: 45px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary};
  cursor: pointer;
  box-shadow: 0px 10px 16px 0px rgba(83, 45, 117, 0.14);
  -webkit-box-shadow: 0px 10px 16px 0px rgba(83, 45, 117, 0.14);
  -moz-box-shadow: 0px 10px 16px 0px rgba(83, 45, 117, 0.14);
`

const ProductButton = styled.button`
  position: absolute;
  right: 50px;
  bottom: 60px;
`

const CreateCategoryButton = styled.button`
  position: absolute;
  right: 60px;
  bottom: 10px;
`

const CreateBrandButton = styled.button`
  position: absolute;
  right: 50px;
  top: 52px;
`

export {
  MainButton,
  CreateProduct,
  ProductButton,
  CreateCategoryButton,
  CreateBrandButton,
}
