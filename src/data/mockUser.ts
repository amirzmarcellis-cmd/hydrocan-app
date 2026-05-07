// Mock user state — synthesised plausible 30-day series so charts and
// scores have something to render before live wearable sync is wired.

export interface MockUser {
  name: string;
  age: number;
  sex: 'male' | 'female' | 'other';
  dayN: number;
  baselineConfident: boolean;
  goalCansPerDay: number;
  hrv: number[];
  rhr: number[];
  sleepHrs: number[];
  sleepEff: number[];
  respRate: number[];
  steps: number[];
  cans: number[];
  energy: number[];
  mood: number[];
  todayCheckedIn: boolean;
}

export const USER: MockUser = {
  name: 'Marcus',
  age: 34,
  sex: 'male',
  dayN: 9,
  baselineConfident: false,
  goalCansPerDay: 3,
  hrv: [42, 44, 41, 46, 48, 45, 47, 49, 46, 48, 52, 50, 49, 53, 51, 55, 52, 54, 56, 53, 57, 55, 58, 56, 59, 57, 60, 58, 61, 62],
  rhr: [58, 57, 59, 57, 56, 58, 56, 57, 55, 56, 55, 54, 55, 53, 54, 52, 53, 51, 52, 53, 51, 52, 50, 51, 49, 50, 48, 49, 48, 47],
  sleepHrs: [6.2, 6.5, 6.1, 6.8, 7.1, 6.4, 6.9, 7.0, 6.7, 7.2, 7.3, 6.9, 7.4, 7.1, 7.5, 7.2, 7.6, 7.4, 7.5, 7.3, 7.7, 7.5, 7.8, 7.6, 7.9, 7.7, 8.0, 7.8, 7.9, 7.7],
  sleepEff: [82, 84, 80, 85, 86, 83, 85, 87, 84, 86, 88, 86, 89, 87, 90, 88, 90, 89, 91, 89, 91, 90, 92, 91, 92, 91, 93, 92, 93, 92],
  respRate: [15.4, 15.2, 15.6, 15.1, 14.9, 15.3, 15.0, 14.8, 15.1, 14.9, 14.6, 14.8, 14.5, 14.7, 14.4, 14.6, 14.3, 14.5, 14.2, 14.4, 14.1, 14.3, 14.0, 14.2, 13.9, 14.1, 13.8, 14.0, 13.8, 13.7],
  steps: [6800, 8200, 7400, 9100, 5800, 8800, 7200, 9400, 8100, 7600, 10200, 8400, 7800, 9600, 8200, 8800, 7900, 9200, 8400, 8600, 9100, 8000, 9400, 8500, 9300, 8800, 9700, 9200, 9500, 9100],
  cans: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3],
  energy: [3, 3, 2, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 3, 2, 3, 3, 4, 3, 4, 4, 3, 4, 4, 4, 4, 5, 4, 4, 4],
  mood: [3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4],
  todayCheckedIn: false,
};
