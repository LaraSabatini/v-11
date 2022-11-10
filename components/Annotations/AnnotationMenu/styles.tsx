import styled from "styled-components"
import theme from "theme/index"

const Menu = styled.div`
  position: absolute;
  background: white;
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  padding: 10px;
  text-align: left;
  right: 0;
  top: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 5px;
  font-size: 15px;
  width: 200%;

  button {
    border: none;
    cursor: pointer;
    text-align: left;
    background: none;
    font-family: ${theme.fonts.primary};
    font-weight: ${theme.fontWeights.light};

    &:hover {
      font-weight: ${theme.fontWeights.regular};
    }
  }
`

export default Menu
