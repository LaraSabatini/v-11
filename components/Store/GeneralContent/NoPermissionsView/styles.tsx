import styled from "styled-components"
import theme from "theme/index"

const NoPermissionsView = styled.div`
  height: 80vh;
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.semiBlack};
  font-size: 40px;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary_light};
  span {
    font-size: 20px;
    font-weight: ${theme.fontWeights.regular};
  }
`

export default NoPermissionsView
