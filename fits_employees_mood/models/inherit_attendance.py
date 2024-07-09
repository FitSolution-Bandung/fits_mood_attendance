import select
from odoo import models, fields, api
from suds import null



class HrAttendance(models.Model):
    _inherit = 'hr.attendance'

    def get_mood_type(self):
        # Mengembalikan daftar semua tipe mood
        return [
            ('senang', 'Happy'),
            ('netral', 'Neutral'),
            ('sedih', 'Sad'),
        ]



    mood_type = fields.Selection(get_mood_type, string='Employee Mood Out')
    mood_type_in = fields.Selection(get_mood_type, string='Employee Mood In')
    def get_attendance_mood(self):
        return [{
            'id': mood[0],
            'value': mood[1],
            'label': mood[1],
        } for mood in self.get_mood_type()]








