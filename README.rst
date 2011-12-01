ftw.calendarwidget
==================

``ftw.calendarwidget`` provides an archetypes calendar widget using the jQuery UI datepicker.


Usage
-----

- Add ``ftw.calendarwidget`` to your buildout configuration:

::

    [instance]
    eggs +=
        ...
        ftw.calendarwidget


- Import the generic setup profile for ``ftw.calendarwidget``

- Use it in your archetypes schema:

::

    from Products.Archetypes import atapi
    from ftw.calendarwidget.browser.widgets import FtwCalendarWidget

    MySchema = atapi.Schema((

        atapi.DateTimeField(
            name='mydate',
            widget=FtwCalendarWidget(label='My Date')
        ),

    ))


Links
-----

- Main github project repository: https://github.com/4teamwork/ftw.calendarwidget
- Issue tracker: https://github.com/4teamwork/ftw.calendarwidget/issues
- Package on pypi: http://pypi.python.org/pypi/ftw.calendarwidget


Maintainer
----------

This package is produced and maintained by `4teamwork <http://www.4teamwork.ch/>`_ company.
