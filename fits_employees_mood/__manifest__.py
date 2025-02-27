# -*- coding: utf-8 -*-
{
    'name': "fits_employees_mood",

    'summary': """
        Addon Odoo yang mengintegrasikan absensi karyawan dengan pelacakan suasana hati (mood tracking) 
        untuk meningkatkan pemahaman terhadap kesejahteraan dan produktivitas tenaga kerja""",

    'description': """
        Long description of module's purpose
    """,

    'author': "PT Fujicon Priangan Perdana",
    'website': "https://erp.fujicon-japan.com/",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/12.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Human Resource',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'hr_attendance','hr'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        #'views/employee_moods_view.xml',
        'views/inherit_attendance_view.xml',
        'views/attendance_inherit_view.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'qweb': [
        'static/src/xml/attendance_inherit.xml',
    ],
}
