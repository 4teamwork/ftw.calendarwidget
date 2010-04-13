from Products.Archetypes.Widget import CalendarWidget


class FtwCalendarWidget(CalendarWidget):
    _properties = CalendarWidget._properties.copy()
    _properties.update({
        'macro' : "ftw_calendar",
        'format' : '', # time.strftime string
        'show_hm' : True,
        'show_ymd' : True,
        'starting_year' : None,
        'ending_year' : None,
        'future_years' : None,
        'helper_js': ('ftw_calendar.js'),
        'helper_css': ('jscalendar/calendar-system.css',),
    })

    # def datepicker_javascript(self):
    #     return """/* <![CDATA[ */
    #         jq(function() {
    #             jq("#%(id)s").datepicker({
    #                 showOn: 'button',
    #                 onClose: insert_date,
    #                 buttonImage: '%(buttonImage)s',
    #                 buttonImageOnly: true,
    #                 dateFormat: 'd. MM yy',
    #                 changeMonth: true,
    #                 changeYear: true
    #             });
    #         });
    #         /* ]]> */""" % dict(id=self.id,
    #                             buttonImage='%s/popup_calendar.gif' % self.portal_url())