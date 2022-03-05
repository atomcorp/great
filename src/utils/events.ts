export const refreshAppEntries = (el: HTMLElement) => {
  const event = new Event('app--refresh-entries', {
    bubbles: true,
    composed: true,
  });
  el.dispatchEvent(event);
};
