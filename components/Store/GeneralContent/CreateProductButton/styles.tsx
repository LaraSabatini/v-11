import styled from "styled-components"
import theme from "theme/index"

const MainButton = styled.div`
  position: absolute;
  right: 0;
  bottom: -10px;
`
const CreateProduct = styled.button`
  border-radius: 50%;
  width: 50px;
  height: 50px;
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

export { MainButton, CreateProduct }
