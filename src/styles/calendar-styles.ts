import {css} from 'lit';

const calendarStyles = css`
  .entries {
    display: grid;
    grid-template-columns: 40px 1fr;
  }
  .entry {
    text-align: initial;
    background: initial;
    border: initial;
    padding: 0;
    margin: 0 0 30px;
  }
  .date {
    font-size: 1.2rem;
    margin: 0 0 10px;
  }
  .text {
    white-space: pre-wrap;
  }
  .line {
    position: relative;
  }
  .line:before {
    position: absolute;
    content: '';
    height: 12px;
    width: 12px;
    border-radius: 50%;
    top: 13px;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: grey;
  }
  .line:after {
    position: absolute;
    content: '';
    height: 100%;
    width: 3px;
    left: 50%;
    transform: translateX(-50%);
    background-color: grey;
  }
  .line:first-child::after {
    height: calc(100% - 13px);
    top: 13px;
  }
  .line:nth-last-child(2)::after {
    height: 13px;
  }
`;

export default calendarStyles;
