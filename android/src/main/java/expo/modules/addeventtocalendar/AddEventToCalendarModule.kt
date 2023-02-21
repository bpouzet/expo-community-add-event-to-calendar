package expo.modules.addeventtocalendar

import android.content.Intent
import android.provider.CalendarContract
import android.util.Log
import expo.modules.addeventtocalendar.exceptions.ActivityAlreadyStartedException
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.text.SimpleDateFormat
import java.util.TimeZone

private const val ADD_EVENT_REQUEST_CODE = 11

class AddEventToCalendarModule : Module() {
  private val currentActivity
    get() = appContext.currentActivity ?: throw Exceptions.MissingActivity()
  private var pendingPromise: Promise? = null

  private val sdf = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").apply {
    timeZone = TimeZone.getTimeZone("GMT")
  }

  override fun definition() = ModuleDefinition {
    Name("ExpoAddEventToCalendar")

    AsyncFunction("startAddEventToCalendar") { params: AddEventToCalendarParams, promise: Promise ->
      if (pendingPromise != null) {
        throw ActivityAlreadyStartedException()
      }
      val intent = Intent(Intent.ACTION_INSERT)
              .setData(CalendarContract.Events.CONTENT_URI)

      if (params.startDate != null) {
        when (val startDate = params.startDate) {
          is String -> {
            val parsedDate = sdf.parse(startDate)
            if (parsedDate != null) {
              intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, parsedDate.time)
            } else {
              Log.e(TAG, "Parsed date is null")
            }
          }
          is Number -> {
            intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, startDate.toLong())
          }
          else -> {
            Log.e(TAG, "startDate has unsupported type")
          }
        }
      }

      if (params.endDate != null) {
        when (val endDate = params.endDate) {
          is String -> {
            val parsedDate = sdf.parse(endDate)
            if (parsedDate != null) {
              intent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME, parsedDate.time)
            } else {
              Log.e(TAG, "Parsed date is null")
            }
          }
          is Number -> {
            intent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME, endDate.toLong())
          }
          else -> {
            Log.e(TAG, "endDate has unsupported type")
          }
        }
      }

      if (params.allDay != null) {
        intent.putExtra(CalendarContract.EXTRA_EVENT_ALL_DAY, params.allDay)
      }

      if (params.description != null) {
        intent.putExtra(CalendarContract.Events.DESCRIPTION, params.description)
      }

      if (params.location != null) {
        intent.putExtra(CalendarContract.Events.EVENT_LOCATION, params.location)
      }

      if (params.title != null) {
        intent.putExtra(CalendarContract.Events.TITLE, params.title)
      }

      pendingPromise = promise
      currentActivity.startActivityForResult(intent, ADD_EVENT_REQUEST_CODE)
    }

    OnActivityResult { _, payload ->
      if (payload.requestCode != ADD_EVENT_REQUEST_CODE) {
        return@OnActivityResult
      }

      pendingPromise?.resolve(true)
      pendingPromise = null
    }
  }

  companion object {
    internal val TAG = AddEventToCalendarModule::class.java.simpleName
  }
}
