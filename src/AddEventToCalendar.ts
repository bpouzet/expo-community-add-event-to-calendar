import { UnavailabilityError } from 'expo-modules-core';

import ExpoAddEventToCalendar from './ExpoAddEventToCalendar';

export type Event = {
  /**
   * Visible name of the event.
   */
  title: string;

  /**
   * Date object or string representing the time when the event starts.
   */
  startDate: number | Date;

  /**
   * Date object or string representing the time when the event ends.
   */
  endDate: number | Date;

  /**
   * Location field of the event.
   */
  location: string;

  /**
   * Whether the event is displayed as an all-day event on the calendar
   */
  allDay: boolean;

  /**
   * Description of the event.
   */
  description: string;
};

export interface AddEventToCalendarResult {
  /**
   * Result code returned by the activity.
   */
  resultCode: ResultCode;
  /**
   * Optional data URI that can be returned by the activity.
   */
  data?: string;
}

export enum ResultCode {
  /**
   * Indicates that the activity operation succeeded.
   */
  Success = -1,
  /**
   * Means that the activity was canceled, e.g. by tapping on the back button.
   */
  Canceled = 0,
  /**
   * First custom, user-defined value that can be returned by the activity.
   */
  FirstUser = 1,
}

/**
 * Starts the specified activity. The method will return a promise which resolves when the user
 * returns to the app.
 * @param params An object of intent parameters.
 * @return A promise which fulfils with `AddEventToCalendarResult` object.
 */
export async function startAddEventToCalendarAsync(
  params: Partial<Event>
): Promise<AddEventToCalendarResult> {
  if (!ExpoAddEventToCalendar.startAddEventToCalendar) {
    throw new UnavailabilityError('AddEventToCalendar', 'startAddEventToCalendarAsync');
  }
  if (!params.startDate) {
    throw new Error('startAddEventToCalendarAsync requires a startDate (Date)');
  }
  if (!params.endDate) {
    throw new Error('startAddEventToCalendarAsync requires an endDate (Date)');
  }
  return ExpoAddEventToCalendar.startAddEventToCalendar(stringifyDateValues(params));
}

function stringifyIfDate(date: any): any {
  return date instanceof Date ? date.toISOString() : date;
}

function stringifyDateValues(obj: object): object {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    if (value != null && typeof value === 'object' && !(value instanceof Date)) {
      if (Array.isArray(value)) {
        return { ...acc, [key]: value.map(stringifyDateValues) };
      }
      return { ...acc, [key]: stringifyDateValues(value) };
    }
    acc[key] = stringifyIfDate(value);
    return acc;
  }, {});
}
