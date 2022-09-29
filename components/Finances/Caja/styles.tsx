import styled from "styled-components"
import theme from "theme/index"

const TotalEarnings = styled.div`
  margin-top: 50px;
  font-family: ${theme.fonts.primary};
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px 10px 15px 25px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  width: 300px;

  span {
    text-decoration: underline;
  }
`

export default TotalEarnings
