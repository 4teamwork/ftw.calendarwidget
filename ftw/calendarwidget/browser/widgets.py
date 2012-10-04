from Products.Archetypes.Widget import CalendarWidget


class FtwCalendarWidget(CalendarWidget):
    _properties = CalendarWidget._properties.copy()
    _properties.update({
            'macro': "ftw_calendar",
            'format': '',  # time.strftime string
            'show_ymd': True,
            'show_hm': True,
            'starting_year': None,
            'ending_year': None,
            'future_years': None,
            # XXX: helper_js does not make sense to me, because the js is
            # registered in jsregistry
            'helper_js': ('ftw_calendar.js'),
            'helper_css': ('jscalendar/calendar-system.css',),
            })
