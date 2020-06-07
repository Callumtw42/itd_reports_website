import styled from "styled-components";

const Div = styled.div`
  overflow-y: scroll;

  .MuiTableCell-root {
    padding: 0px 8px !important;
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

  .emptyMessage {
    margin: auto;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
`;

export default Div;
