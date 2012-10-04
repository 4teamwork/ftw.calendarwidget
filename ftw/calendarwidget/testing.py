from plone.app.testing import PloneSandboxLayer
from plone.app.testing import applyProfile
from plone.app.testing import PLONE_FIXTURE
from plone.app.testing import IntegrationTesting
from plone.testing import z2
from zope.configuration import xmlconfig

import ftw.calendarwidget
import collective.js.jqueryui


class FtwCalendarWidgetLayer(PloneSandboxLayer):

    defaultBases = (PLONE_FIXTURE, )

    def setUpZope(self, app, configurationContext):

        # Patch effectiveDate, so our FtwCalendarwidget is used
        from ftw.calendarwidget.browser.widgets import FtwCalendarWidget
        from Products.ATContentTypes.content.base import registerATCT
        from Products.ATContentTypes.content.document import ATDocument
        from Products.ATContentTypes.content.document import PROJECTNAME

        ATDocument.schema['effectiveDate'].widget = FtwCalendarWidget(
                label='MyDate'
            )

        registerATCT(ATDocument, PROJECTNAME)


        # Load ZCML

        xmlconfig.file('configure.zcml',
            ftw.calendarwidget,
            context=configurationContext)
        xmlconfig.file('configure.zcml',
            collective.js.jqueryui,
            context=configurationContext)

        # installProduct() is *only* necessary for packages outside
        # the Products.* namespace which are also declared as Zope 2 products,
        # using <five:registerPackage /> in ZCML.
        z2.installProduct(app, 'ftw.calendarwidget')
        z2.installProduct(app, 'collective.js.jqueryui')

    def setUpPloneSite(self, portal):
        # Install into Plone site using portal_setup
        applyProfile(portal, 'ftw.calendarwidget:default')

FTW_CALENDARWIDGET_FIXTURE = FtwCalendarWidgetLayer()
FTW_CALENDARWIDGET_INTEGRATION_TESTING = IntegrationTesting(
    bases=(FTW_CALENDARWIDGET_FIXTURE, ),
    name="ftw.calendarwidget:Integration")
