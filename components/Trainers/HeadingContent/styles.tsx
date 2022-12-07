import styled from "styled-components"
import theme from "theme/index"

const Title = styled.h4`
  font-family: ${theme.fonts.primary};
  font-size: 20px;
  margin: 0;
  gap: 5px;
  width: 98%;
  display: flex;
  align-items: center;
  gap: 5px;

  span {
    font-weight: ${theme.fontWeights.regular};
    font-size: 15px;
    background-color: #ededed;
    padding: 3px 5px;
    border-radius: 10px;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: rgba(83, 45, 117, 0.4);
  margin-top: 10px;
`

export { Title, Divider }
