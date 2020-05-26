import styled from "styled-components";
import { DisplayVars } from "./logic";

const Div = styled.div<{ display: DisplayVars }>`
  #stock {
    display: ${(props) => props.display.stock};
  }

  #salesByHour {
    display: ${(props) => props.display.salesByHour};
  }

  #salesByCategory {
    display: ${(props) => props.display.salesByCategory};
  }

  body {
    margin: 0;
    padding: 0;
  }

  .App {
    padding: 0px;
    margin: 0;
    display: grid;
    grid-template-rows: 65px 1fr;
    grid-template-areas:
      "Navbar"
      "content";
  }

  .navbar {
    grid-area: Navbar;
  }

  @media (min-width: 64em) {
    #stock {
      display: block;
      grid-area: stock;
    }

    .paper {
      overflow-y: hidden;
    }

    #salesByHour {
      display: block;
      grid-area: hour;
    }

    #salesByCategory {
      display: block;
      grid-area: cat;
    }

    .content {
      margin: 5% 5%;
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "cat cat"
        "stock hour "
        ". .";
    }
  }
`;

export default Div;
