export type Event = {
    /**
     * Visible name of the event.
     */
    title: string;
    /**
     * Date object or string representing the time when the event starts.
     */
    startDate: string | Date;
    /**
     * Date object or string representing the time when the event ends.
     */
    endDate: string | Date;
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
    /**
     * Optional extras object that can be returned by the activity.
     */
    extra?: object;
}
export declare enum ResultCode {
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
    FirstUser = 1
}
/**
 * Starts the specified activity. The method will return a promise which resolves when the user
 * returns to the app.
 * @param params An object of intent parameters.
 * @return A promise which fulfils with `AddEventToCalendarResult` object.
 */
export declare function startAddEventToCalendarAsync(params: Partial<Event>): Promise<AddEventToCalendarResult>;
//# sourceMappingURL=AddEventToCalendar.d.ts.map