var open = false;

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
            lastDate: lastDate,
            eventName: eventName,
            mailId: ''
        };

        
        database.ref('/staffDetails/'+staffName).once('value', function(data){
            data = data.val();
            console.log(data.mailId);
            assign.mailId = data.mailId;
            queryString = `sendMail?mail=${data.mailId}&eventName=${eventName}&lastDate=${lastDate}` 
            $.get('https://sheltered-ravine-63268.herokuapp.com/' + queryString).done(function(data) {
                console.log(data);
            });
            database.ref('/currentlyAssigned/'+ staffName).set(assign);
            database.ref('/staffDetails/' + staffName).update({
                isBusy: true
            });
        });

        
    });

    $("#MenuIcon").click(function () {
        open = true;
        console.log("Menu Icon Clicked", open);
        $("#MainMenu").css("left", "0px");

        function showMenu() {
            $("#MainMenu").css("-webkit-clip-path", "polygon(0 0,100% 0,100% 100%,0% 100%)");
            $("#MenuIcon").animate({
                right: '-100'
            }, 300);
        }
        setTimeout(showMenu, 100);
        $("#MenuIcon").hide();
    });

    $("#close").click(function () {
        open = false;
        $("#MainMenu").css("clip-path", "polygon(0 0,0% 0,100% 100%,0% 100%)");

        function hideMenu() {
            $("#MainMenu").css("left", "-300px");
            $("#MenuIcon").animate({
                right: '50'
            }, 300);
        }
        setTimeout(hideMenu, 300);

        function originalLayout() {
        $("#MenuIcon").show();            
        $("#MainMenu").css("clip-path", "polygon(0 0,100% 0,0% 100%,0% 100%)");
        }
        setTimeout(originalLayout, 600);
    });
    




});