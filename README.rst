ftw.calendarwidget
==================

``ftw.calendarwidget`` provides an archetypes calendar widget using
the `jQuery UI datepicker <http://jqueryui.com/demos/datepicker/>`_.

.. figure:: http://onegov.ch/approved.png/image
   :align: right
   :target: http://onegov.ch/community/zertifizierte-module/ftw.calendarwidget

   Certified: 01/2013


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

    >>> from Products.Archetypes import atapi
    >>> from ftw.calendarwidget.browser.widgets import FtwCalendarWidget

    >>> MySchema = atapi.Schema((
    ...
    ...     atapi.DateTimeField(
    ...         name='mydate',
    ...         widget=FtwCalendarWidget(label='My Date')
    ...     ),
    ...
    ... ))


Screenshot
----------

.. image:: https://github.com/4teamwork/ftw.calendarwidget/raw/master/docs/screenshot.png


Links
-----

- Github project repository: https://github.com/4teamwork/ftw.calendarwidget
- Issue tracker: https://github.com/4teamwork/ftw.calendarwidget/issues
- Package on pypi: http://pypi.python.org/pypi/ftw.calendarwidget
- Continuous integration: https://jenkins.4teamwork.ch/search?q=ftw.calendarwidget


Copyright
---------

This package is copyright by `4teamwork <http://www.4teamwork.ch/>`_.

``ftw.calendarwidget`` is licensed under GNU General Public License, version 2.
