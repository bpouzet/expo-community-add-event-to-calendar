import { UnavailabilityError } from 'expo-modules-core';
import ExpoAddEventToCalendar from './ExpoAddEventToCalendar';
export var ResultCode;
(function (ResultCode) {
    /**
     * Indicates that the activity operation succeeded.
     */
    ResultCode[ResultCode["Success"] = -1] = "Success";
    /**
     * Means that the activity was canceled, e.g. by tapping on the back button.
     */
    ResultCode[ResultCode["Canceled"] = 0] = "Canceled";
    /**
     * First custom, user-defined value that can be returned by the activity.
     */
    ResultCode[ResultCode["FirstUser"] = 1] = "FirstUser";
})(ResultCode || (ResultCode = {}));
/**
 * Starts the specified activity. The method will return a promise which resolves when the user
 * returns to the app.
 * @param params An object of intent parameters.
 * @return A promise which fulfils with `AddEventToCalendarResult` object.
 */
export async function startAddEventToCalendarAsync(params) {
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
function stringifyIfDate(date) {
    return date instanceof Date ? date.toISOString() : date;
}
function stringifyDateValues(obj) {
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
//# sourceMappingURL=AddEventToCalendar.js.map