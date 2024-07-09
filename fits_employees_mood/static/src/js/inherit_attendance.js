odoo.define('fits_employees_mood.inherit_attendance', function (require) {
    "use strict";

    var core = require('web.core'),
        Widget = require('web.Widget'),
        QWeb = core.qweb,
        hr_attendance = require('hr_attendance.my_attendances');


    var HrAttendanceInherited = hr_attendance.include({
        start: function () {
            var self = this;

            this._super.apply(this, arguments);

            if (!this.$el) {
                return;
            }

            this.selection_list = [];
            this.selected_mood = '';
            this.selected_mood_in = '';

            this._rpc({
                model: 'hr.employee',
                method: 'search_read',
                args: [[['user_id', '=', this.getSession().uid]], ['attendance_state', 'name']],
            }).then(function (res) {
                self.employee = res.length && res[0];
                self._rpc({
                    model: 'hr.attendance',
                    method: 'get_attendance_mood',
                    args: [[self.getSession().uid]],
                }).then(function (res) {
                    self.selection_list = res;

                    $('#mood_type').empty();
                    $('#mood_type_in').empty(); // Menambahkan mood_type_in

                    self.selection_list.forEach(function(mood) {
                        $('#mood_type').append($('<option>', {
                            value: mood.id,
                            text: mood.label
                        }));
                        $('#mood_type_in').append($('<option>', {
                            value: mood.id,
                            text: mood.label
                        }));
                    });

                    self.$el.html(QWeb.render("HrAttendanceMyMainMenu", {
                        widget: self,
                        selection_list: self.selection_list,
                    }));

                    $('.mood-button').on('click', function () {
                        var selectedMood = $(this).attr('data-value'); // Mendapatkan nilai mood dari atribut data-value
                        var moodType = $(this).attr('data-type'); // Mendapatkan jenis mood dari atribut data-type

                        if (moodType === 'mood_type') {
                            self.selected_mood = selectedMood; // Menyimpan mood yang dipilih untuk mood_type
                        } else if (moodType === 'mood_type_in') {
                            self.selected_mood_in = selectedMood; // Menyimpan mood yang dipilih untuk mood_type_in
                        }

                        self.update_attendance(); // Memperbarui kehadiran saat mood dipilih
                    });

                    $('#mood_type').autocomplete({
                        source: function (request, response) {
                            response(self.selection_list);
                        },
                        minLength: 0,
                        scroll: true,
                        select: function (event, ui) {
                            self.selected_mood = ui.item.id;
                        },
                    }).focus(function () {
                        $('#mood_type').autocomplete("search", "");
                    });

                    $('#mood_type_in').autocomplete({ // Autocomplete untuk mood_type_in
                        source: function (request, response) {
                            response(self.selection_list);
                        },
                        minLength: 0,
                        scroll: true,
                        select: function (event, ui) {
                            self.selected_mood_in = ui.item.id;
                        },
                    }).focus(function () {
                        $('#mood_type_in').autocomplete("search", "");
                    });
                }).then(undefined, function (error) {
                    console.error("Gagal mengambil mood kehadiran:", error);
                });
            }).then(undefined, function (error) {
                console.error("Gagal mengambil data karyawan:", error);
            });
        },

        update_attendance: function () {
            var self = this,
                mood_type = this.selected_mood,
                mood_type_in = this.selected_mood_in; // Menambahkan mood_type_in

            if (!mood_type && $('#selectedMoodText').length) {
                $('#mood_type').css('border', '1px solid red');
                // Tampilkan pesan notifikasi
                this.do_warn("Warning", "Please select a mood.");
                return; // Menghentikan eksekusi fungsi jika mood belum dipilih
            } else {
                self._rpc({
                    model: 'hr.employee',
                    method: 'attendance_manual_with_type',
                    args: [[self.employee.id], 'hr_attendance.hr_attendance_action_my_attendances', mood_type, mood_type_in], // Menambahkan mood_type_in
                }).then(function (result) {
                    if (result.action) {
                        self.do_action(result.action);
                    } else if (result.warning) {
                        self.do_warn(result.warning);
                    }
                }).then(undefined, function (error) {
                    console.error("Gagal memperbarui kehadiran:", error);
                });
            }
        },

    });
    return HrAttendanceInherited;
});




//KODINGAN RUNNING//
//odoo.define('fits_employees_mood.inherit_attendance', function (require) {
//    "use strict";
//
//    var core = require('web.core'),
//        Widget = require('web.Widget'),
//        QWeb = core.qweb,
//        hr_attendance = require('hr_attendance.my_attendances');
//
//
//    var HrAttendanceInherited = hr_attendance.include({
//        start: function () {
//            var self = this;
//
//            this._super.apply(this, arguments);
//
//            if (!this.$el) {
//                return;
//            }
//
//            this.selection_list = [];
//            this.selected_mood = '';
//
//            this._rpc({
//                model: 'hr.employee',
//                method: 'search_read',
//                args: [[['user_id', '=', this.getSession().uid]], ['attendance_state', 'name']],
//            }).then(function (res) {
//                self.employee = res.length && res[0];
//                self._rpc({
//                    model: 'hr.attendance',
//                    method: 'get_attendance_mood',
//                    args: [[self.getSession().uid]],
//                }).then(function (res) {
//                    self.selection_list = res;
//
//                    $('#mood_type').empty();
//
//                    self.selection_list.forEach(function(mood) {
//                        $('#mood_type').append($('<option>', {
//                            value: mood.id,
//                            text: mood.label
//                        }));
//                    });
//
//                    self.$el.html(QWeb.render("HrAttendanceMyMainMenu", {
//                        widget: self,
//                        selection_list: self.selection_list,
//                    }));
//
//                    $('.mood-button').on('click', function () {
//                        var selectedMood = $(this).attr('data-value'); // Mendapatkan nilai mood dari atribut data-value
//                        self.selected_mood = selectedMood; // Menyimpan mood yang dipilih
//                        self.update_attendance(); // Memperbarui kehadiran saat mood dipilih
//                    });
//
//                    $('#mood_type').autocomplete({
//                        source: function (request, response) {
//                            response(self.selection_list);
//                        },
//                        minLength: 0,
//                        scroll: true,
//                        select: function (event, ui) {
//                            self.selected_mood = ui.item.id;
//                        },
//                    }).focus(function () {
//                        $('#mood_type').autocomplete("search", "");
//                    });
//                }).then(undefined, function (error) {
//                    console.error("Gagal mengambil mood kehadiran:", error);
//                });
//            }).then(undefined, function (error) {
//                console.error("Gagal mengambil data karyawan:", error);
//            });
//        },
//
//        update_attendance: function () {
//            var self = this,
//                mood_type = this.selected_mood;
//
////            if (!mood_type && $('#selectedMoodText').length) {
////                $('#mood_type').css('border', '1px solid red');
////                 Tampilkan pesan notifikasi
////               this.do_warn("Warning", "Please select a mood.");
////               return; // Menghentikan eksekusi fungsi jika mood belum dipilih
////            }
////            else {
//                self._rpc({
//                    model: 'hr.employee',
//                    method: 'attendance_manual_with_type',
//                    args: [[self.employee.id], 'hr_attendance.hr_attendance_action_my_attendances', mood_type],
//                }).then(function (result) {
//                    if (result.action) {
//                        self.do_action(result.action);
//                    } else if (result.warning) {
//                        self.do_warn(result.warning);
//                    }
//                }).then(undefined, function (error) {
//                    console.error("Gagal memperbarui kehadiran:", error);
//                });
//           //}
//        },
//
//    });
//    return HrAttendanceInherited;
//});
