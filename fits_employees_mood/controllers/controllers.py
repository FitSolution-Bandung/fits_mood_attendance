# -*- coding: utf-8 -*-
from odoo import http

# class FitsEmployeesMood(http.Controller):
#     @http.route('/fits_employees_mood/fits_employees_mood/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/fits_employees_mood/fits_employees_mood/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('fits_employees_mood.listing', {
#             'root': '/fits_employees_mood/fits_employees_mood',
#             'objects': http.request.env['fits_employees_mood.fits_employees_mood'].search([]),
#         })

#     @http.route('/fits_employees_mood/fits_employees_mood/objects/<model("fits_employees_mood.fits_employees_mood"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('fits_employees_mood.object', {
#             'object': obj
#         })