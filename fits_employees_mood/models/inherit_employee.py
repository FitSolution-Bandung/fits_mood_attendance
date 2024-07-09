from odoo import models, fields, api


class HrEmployee(models.Model):
    _inherit = 'hr.employee'


    # @api.multi
    # def attendance_manual_with_type(self, next_action, mood_type):
    #     return self.with_context(mood_type=mood_type).attendance_manual(next_action)
    @api.multi
    def attendance_manual_with_type(self, next_action, mood_type, mood_type_in):  # Menambahkan mood_type_in
        return self.with_context(mood_type=mood_type, mood_type_in=mood_type_in).attendance_manual(next_action)

    # @api.multi
    # def attendance_action_change(self):
    #     att = super(HrEmployee, self).attendance_action_change()
    #
    #     att_type = self._context.get('mood_type')
    #     if att_type and (not att.mood_type or att.mood_type != att_type):
    #         att.mood_type = att_type
    #     return att
    @api.multi
    def attendance_action_change(self):
        att = super(HrEmployee, self).attendance_action_change()

        att_type = self._context.get('mood_type')
        if att_type and (not att.mood_type or att.mood_type != att_type):
            att.mood_type = att_type

        att_type_in = self._context.get('mood_type_in')  # Menambahkan mood_type_in
        if att_type_in and (not att.mood_type_in or att.mood_type_in != att_type_in):  # Menambahkan mood_type_in
            att.mood_type_in = att_type_in  # Menambahkan mood_type_in

        return att
