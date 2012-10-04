# Patch effectiveDate, so our FtwCalendarwidget is used

from Products.Archetypes.ExtensibleMetadata import ExtensibleMetadata
from ftw.calendarwidget.browser.widgets import FtwCalendarWidget
from App.class_init import InitializeClass


ExtensibleMetadata.schema['effectiveDate'].widget = FtwCalendarWidget(
        label='MyDate'
    )

InitializeClass(ExtensibleMetadata)
