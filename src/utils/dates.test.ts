import {todaysDate} from './dates';

jest.useFakeTimers();

const JAN_01_2022_IN_SECS = 1640995200000;
const Jul_01_2022_IN_SECS = 1656630000000;

describe('Testing timezone', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
  it('should be in UK timezone', () => {
    expect(new Date(2022, 0, 3).toISOString()).toBe('2022-01-03T00:00:00.000Z');
    expect(new Date(2022, 6, 1).toISOString()).toBe('2022-06-30T23:00:00.000Z');
  });
});

describe('todaysDate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
  it('should get date with no timezone offset', () => {
    jest.setSystemTime(JAN_01_2022_IN_SECS);
    expect(todaysDate()).toBe('2022-01-01');
  });

  it('should get date when in DST (-1hr)', () => {
    jest.setSystemTime(Jul_01_2022_IN_SECS);
    expect(todaysDate()).toBe('2022-06-30');
  });
});
