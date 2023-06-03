import styled, { css } from "styled-components"
import theme from "theme"

const Section = styled.div`
  margin: 40px auto;
  width: 730px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  .buttons {
    align-self: flex-end;
    display: flex;
    gap: 10px;
  }
`

const ModalContent = styled.div`
  margin-top: -20px;

  .sub-container {
    display: flex;
    gap: 20px;
  }

  .tag {
    margin: 0;
    font-family: ${theme.fonts.primary};
    font-size: 14px;
    padding: 6px 0;
    font-weight: ${theme.fontWeights.light};
  }
`

const Container = styled.div`
  width: 700px;
  box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
  padding: 15px;
`

const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .table-header {
    display: flex;
    align-items: center;
  }

  .color {
    width: 20px;
  }

  .column-title {
    width: 140px;
  }

  .column-quota {
    width: 100px;
  }

  .table-content {
    max-height: 400px;
    overflow: auto;
  }
`

const Item = styled.div<{ selected: boolean }>`
  border-top: 1px solid ${theme.colors.grey_light};
  padding-top: 15px;
  padding-bottom: 15px;
  width: 100%;
  display: flex;
  font-weight: ${theme.fontWeights.light};
  cursor: pointer;

  p {
    margin: 0;
    width: 140px;
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${theme.colors.grey_lighter};
    `};

  .color-sample {
    width: 10px;
    height: 10px;
    border-radius: 5px;
  }
`

export { Container, Table, Item, Section, ModalContent }
