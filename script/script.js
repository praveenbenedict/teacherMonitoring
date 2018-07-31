$(document).ready(function () {


    var database = firebase.database();
    database.ref('/staffDetails/').once('value', function (data) {
        data = data.val();
        console.log(data);
        var freeStaffs = [];
        $.each(data, function (key, value) {
            if (value.isBusy === false) {
                freeStaffs.push(value);
                $('#select-box').append('<option value="' + value.name + '">' + value.name + "</option>");

            }

        });
        console.log(freeStaffs);
    });

    $('#submitButton').click(function() {
        var staffName = $('#select-box option:selected').val();
        var lastDate = $('input[name=date]').val();
        var eventName = $('input[name=eventName]').val();

        var assign = {
            name: staffName,
            lastDate: date,
            eventName: eventName
        };

        database.ref('/currentlyAssigned/'+ staffName).set(assign);
        database.ref('/staffDetails/' + staffName).update({
            isBusy: true
        });
        database.ref('/staffDetails/'+staffName).once('value', function(data){
            data = data.val();
            console.log(data.mailId);


            queryString = `sendMail?mail=${data.mailId}&eventName=${eventName}&lastDate=${lastDate}` 
            $.get('http://localhost:3000/' + queryString).done(function(data) {
                console.log(data);
            });
        });
        

    });



});