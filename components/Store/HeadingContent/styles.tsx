import styled from "styled-components"
import theme from "theme/index"

const HeadContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  margin-top: 25px;
  height: 38px;

  .btn-search {
    border: none;
    padding: 0;
    background: none;
  }
`

const Title = styled.h4`
  font-size: 25px;
  margin: 0;
  span {
    font-weight: ${theme.fontWeights.regular};
    font-size: 20px;
  }
`

const SearchBarContainer = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  text-align: left;
`

const HelpContainer = styled.div`
  position: relative;
  margin-top: 5px;
  cursor: pointer;
`

export { HeadContent, Title, SearchBarContainer, HelpContainer }
