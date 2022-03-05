import {css} from 'lit';

const viewStyles = css`
  .view {
    height: 100%;
    display: grid;
    grid-template-rows: auto max-content;
  }

  main {
    overflow: auto;
    padding: 10px;
    scroll-behavior: smooth;
    order: 1;
  }

  footer {
    padding: 10px;
    order: 2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default viewStyles;
