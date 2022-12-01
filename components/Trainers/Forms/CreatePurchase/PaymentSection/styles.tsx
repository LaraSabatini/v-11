import styled from "styled-components"
import theme from "theme/index"

const LessonsSubGroup = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-start;
`

const PriceContainer = styled.div`
  background: ${theme.colors.grey_lighter};
  padding: 1%;
  width: 150px;
  border-radius: 5px;
  position: absolute;
  right: 0;
  bottom: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    margin: 0;
  }
`

export { LessonsSubGroup, PriceContainer }
