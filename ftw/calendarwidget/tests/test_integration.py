from ftw.calendarwidget.testing import FTW_CALENDARWIDGET_INTEGRATION_TESTING
from plone.app.testing import TEST_USER_NAME, TEST_USER_PASSWORD, TEST_USER_ID
from plone.testing.z2 import Browser
from unittest2 import TestCase
from Products.CMFCore.utils import getToolByName
from Products.Archetypes import atapi
from ftw.calendarwidget.browser.widgets import FtwCalendarWidget
from plone.app.testing import login
from plone.app.testing import setRoles
import transaction


class TestCalendarwidget(TestCase):

    layer = FTW_CALENDARWIDGET_INTEGRATION_TESTING

    def setUp(self):
        super(TestCalendarwidget, self).setUp()

        self.portal = self.layer['portal']
        self.portal_url = self.portal.portal_url()
        self.browser = Browser(self.layer['app'])
        self.browser.handleErrors = False

        setRoles(self.portal, TEST_USER_ID, ['Manager'])

        login(self.portal, TEST_USER_NAME)
        self.doc = self.portal.get(
            self.portal.invokeFactory('Document', 'document'))
        transaction.commit()

    def test_js_installed(self):
        jsregistry = getToolByName(self.portal, 'portal_javascripts')

        self.assertTrue('++resource++ftw.calendarwidget/ftw_calendar.js' in jsregistry.getResourceIds())

    def test_widget_config(self):
        schema = atapi.Schema((
            atapi.DateTimeField(
            name='mydate',
            widget=FtwCalendarWidget(label='My Date')),
        ))
        widget = schema['mydate'].widget
        self.assertEquals(widget.helper_js, 'ftw_calendar.js')
        self.assertEquals(widget.helper_css, ('jscalendar/calendar-system.css', ))


    def test_widget_rendering(self):
        self.browser.addHeader('Authorization', 'Basic %s:%s' % (
                TEST_USER_NAME, TEST_USER_PASSWORD, ))
        self.browser.open(self.doc.absolute_url() + '/edit')

        # The test setup patches the ExtensibleMetadata schema

        # Check if there is a label
        self.assertIn('MyDate', self.browser.contents)


    def tearDown(self):
        super(TestCalendarwidget, self).tearDown()
        self.doc.wl_clearLocks()
        self.portal.manage_delObjects(['document', ])
        transaction.commit()
