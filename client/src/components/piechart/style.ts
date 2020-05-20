import styled from "styled-components";

const Div = styled.div`
  .legendItem {
    overflow-x: hidden;
    display: flex;
    flex-direction: row;
    padding: 0 1em;
    float: left;
    clear: left;
  }

  .scroll-bar-wrap {
    display: flex;
    flex-direction: row;
    float: left;
    clear: left;
    position: relative;
    margin: 4em auto;
    margin: 0;
  }

  .scroll-bar-wrap > ul {
    display: flex;
    flex-direction: row;
  }

  .cover-bar {
    position: absolute;
    background: rgb(255, 255, 255);
    height: 100%;
    top: 0;
    right: 0;
    width: 0.4em;
    opacity: 0;
  }

  .legend:hover .cover-bar {
    opacity: 1;
  }

  .wrapper {
    position: relative;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: left;
  }

  .legend {
    margin: 0 0 0 0px;
    position: relative;
    align-content: left;
    overflow-y: hidden;
    overflow-x: scroll;
    scrollbar-width: thin;
  }

  .dot {
    overflow-x: hidden;
    clear: left;
    height: 3em;
    width: 3em;
    border-radius: 50%;
    display: inline-block;
    margin: auto 0;
  }

  .label {
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 3em;
  }
  .chartjs-render-monitor {
    width: 100;
  }

  @media (min-width: 64em) {
    .dot {
      height: 1em;
      width: 1em;
    }

    .label {
      font-size: 1em;
    }

    .legendItem {
      padding: 0 0.25em;
    }

    .scroll-bar-wrap > ul {
      flex-direction: column;
    }

    .wrapper {
      flex-direction: row;
      justify-content: center;
      max-height: 45vh;
    }

    .chart > canvas {
      min-width: 45vh;
      min-width: 45vh;
      max-height: 45vh;
      max-width: 45vh;
    }

    .legend {
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }
`;
export default Div;
