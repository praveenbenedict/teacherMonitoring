$(document).ready(function () {

    $('#addTeacher').click(function () {

        var name = $('input[name=teacherName]').val();
        var phoneNo = $('input[name=phoneNo').val();

        if (name.length != 0 && phoneNo.length != 10) {
            alert('Check entry details again');
        } else {
            var database = firebase.database();
            var details = {
                name: name,
                phoneNo: phoneNo,
                isBusy: false
            }
            database.ref('/staffDetails/' + name).set(details);
        }
        const messaging = firebase.messaging();
        messaging.requestPermission()
            .then(function() {
                console.log('Permission Available');
                return messaging.getToken();
            })
            .then(function(token) {
                console.log(token);
            })
            .catch(function(err) {
                console.log(err);
            });


    });

});