import styled from "styled-components";

const Div = styled.div`
  .MuiTableCell-root {
    padding: 0px 8px !important;
    font-size: 2em;
  }

  .MuiToolbar-root {
    display: none;
  }

  .MuiTable-root {
    margin: 100px 0 0 0;
  }

  .emptyMessage {
    margin: 25vh;
  }

  .sort-message {
    display: none;
  }

  @media (min-width: 64em) {
    .MuiTableCell-root {
      font-size: 1em;
      margin: 0px 0px;
      font-size: 12px;
      max-width: 3vw;
      min-width: 0;
      word-wrap: break-word;
    }

    .MuiTable-root {
      margin: 0;
    }
  }
`;

export default Div