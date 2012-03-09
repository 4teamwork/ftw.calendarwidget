from Products.Archetypes.Widget import CalendarWidget


class FtwCalendarWidget(CalendarWidget):
    _properties = CalendarWidget._properties.copy()
    _properties.update({
            'macro': "ftw_calendar",
            'format': '',  # time.strftime string
            'show_hm': True,
            'show_ymd': True,
            'starting_year': None,
            'ending_year': None,
            'future_years': None,
            'helper_js': ('ftw_calendar.js'),
            'helper_css': ('jscalendar/calendar-system.css',),
            })
