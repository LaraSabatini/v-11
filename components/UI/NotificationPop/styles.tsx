import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  position: absolute;
  font-family: ${theme.fonts.primary};
  right: 90px;
  top: 90px;
  z-index: 500;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 5px rgba(59, 0, 135, 0.1);

  padding: 25px 20px;

  p {
    margin: 0;
  }

  .description {
    font-weight: ${theme.fontWeights.light};
    padding-top: 10px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    border: 1px solid ${theme.colors.grey_light};
    position: absolute;
    right: -8px;
    top: -8px;
    cursor: pointer;
  }
`
export default Container
