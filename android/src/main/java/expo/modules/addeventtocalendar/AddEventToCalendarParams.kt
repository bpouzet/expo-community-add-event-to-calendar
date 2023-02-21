package expo.modules.addeventtocalendar

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

data class AddEventToCalendarParams(
    @Field
    val allDay: Boolean?,

    @Field
    val description: String?,

    @Field
    val location: String?,

    @Field
    val title: String?,

    @Field
    val endDate: Any?,

    @Field
    val startDate: Any?
) : Record
