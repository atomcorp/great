import './components/calendar';
import './components/upload';

(() => {
  const dates = ['2022-02-17', '2022-02-16', '2022-02-15', '2022-02-14'];
  localStorage.setItem('data', JSON.stringify(dates));

  const calendarCollection =
    document.getElementsByTagName('calendar-component');
  [...calendarCollection].forEach((calendarEl) => {
    const data = localStorage.getItem('data');
    if (data) {
      calendarEl.dates = JSON.parse(data);
    }
  });
})();
