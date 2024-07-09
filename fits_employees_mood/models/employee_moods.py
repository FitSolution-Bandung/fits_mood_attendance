from odoo import models, fields, api

class HrMood(models.Model):
    _name = 'hr.mood'
    _description = 'Employee Moods'
    _rec_name = 'mood_value'

    mood_value = fields.Char(string='Mood Name/Value', required=True)
    mood_icon = fields.Char(string='Mood Icon')



