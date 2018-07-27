$(document).ready(function() {


    var database = firebase.database();
    database.ref('/staffDetails/').once('value', function(data) {
        console.log(data.val());
    });


});