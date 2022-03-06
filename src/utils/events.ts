import {ViewType} from '../controllers/AppController';

export const refreshAppEntries = (el: HTMLElement) => {
  const event = new CustomEvent('app--refresh-entries', {
    bubbles: true,
    composed: true,
  });
  el.dispatchEvent(event);
};

export const setView = (el: HTMLElement, view: ViewType) => {
  const event = new CustomEvent('app--set-view', {
    detail: {view},
    bubbles: true,
    composed: true,
  });
  el.dispatchEvent(event);
};

export const setCurrentEntry = (
  el: HTMLElement,
  date: string,
  entry: string
) => {
  const event = new CustomEvent('app--set-current-entry', {
    detail: {date, entry},
    bubbles: true,
    composed: true,
  });
  el.dispatchEvent(event);
};

export const saveCurrentEntry = (
  el: HTMLElement,
  date: string,
  entry: string
) => {
  const event = new CustomEvent('app--save-current-entry', {
    detail: {date, entry},
    bubbles: true,
    composed: true,
  });
  el.dispatchEvent(event);
};

export const uploadedNewData = (el: HTMLElement) => {
  const event = new CustomEvent('app--uploaded-new-data', {
    bubbles: true,
    composed: true,
  });
  el.dispatchEvent(event);
};
