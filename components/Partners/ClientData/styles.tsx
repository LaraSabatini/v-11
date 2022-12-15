import styled from "styled-components"

const ListAndDetailContainer = styled.div`
  display: flex;
  align-items: top;
  margin-top: 25px;
  gap: 20px;

  @media (max-width: 440px) {
    flex-direction: column;
    margin-top: 15px;
  }
`
export default ListAndDetailContainer
