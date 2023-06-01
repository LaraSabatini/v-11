import styled from "styled-components"
import theme from "theme"

const RegisterForm = styled.div`
  .title {
    font-family: ${theme.fonts.primary};
    margin: 0;
    font-size: 14px;
    color: ${theme.colors.grey};
    font-weight: ${theme.fontWeights.light};
    padding-bottom: 15px;
  }
`

// eslint-disable-next-line import/prefer-default-export
export { RegisterForm }
