package expo.modules.addeventtocalendar.exceptions

import expo.modules.core.errors.CodedException

class ActivityAlreadyStartedException :
        CodedException("AddEventToCalendar activity is already started. You need to wait for its result before starting another activity.") {
    override fun getCode(): String {
        return "E_ACTIVITY_ALREADY_STARTED"
    }
}
