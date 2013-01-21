from setuptools import setup, find_packages
import os


version = '1.1.5'

tests_require = [
    'unittest2',
    'plone.testing',
    'plone.app.testing',
    'Products.ATContentTypes',
    'Products.Archetypes',
    'Products.CMFCore',
    'transaction',
    'zope.configuration',
    ]

setup(name='ftw.calendarwidget',
      version=version,
      description='A plone widget for archetypes using the ' + \
          'jQuery UI calendar widget',
      long_description=open('README.rst').read() + '\n' + \
          open(os.path.join('docs', 'HISTORY.txt')).read(),

      # Get more strings from
      # http://pypi.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
        'Framework :: Plone',
        'Framework :: Plone :: 4.1',
        'Framework :: Plone :: 4.2',
        'License :: OSI Approved :: GNU General Public License (GPL)',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.6',
        'Topic :: Software Development :: Libraries :: Python Modules',
        ],

      keywords='ftw calendar widget archetypes plone',
      author='4teamwork GmbH',
      author_email='mailto:info@4teamwork.ch',
      url='https://github.com/4teamwork/ftw.calendarwidget',
      license='GPL2',

      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['ftw'],
      include_package_data=True,
      zip_safe=False,

      install_requires=[
        'setuptools',
        'collective.js.jqueryui',
        'Products.Archetypes',
        ],
      tests_require=tests_require,
      extras_require=dict(tests=tests_require),

      entry_points='''
      # -*- Entry points: -*-
      [z3c.autoinclude.plugin]
      target = plone
      ''',
      )
