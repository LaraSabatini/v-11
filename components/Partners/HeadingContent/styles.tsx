import styled from "styled-components"
import theme from "theme/index"

const HeadContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.h4`
  font-family: ${theme.fonts.primary};
  font-size: 20px;
  margin: 0;
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

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export { HeadContent, Title, Divider, FiltersContainer }
