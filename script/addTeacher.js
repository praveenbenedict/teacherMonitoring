$(document).ready(function () {
    var name;
    $('#addTeacher').click(function () {

        name = $('input[name=teacherName]').val();
        var email = $('input[name=phoneNo').val();
        var password = $('input[name=password]').val();
        if (name.length == 0 && password != '') {
            alert('Check entry details again');
        } else {
            var database = firebase.database();
            var details = {
                name: name,
                mailId: email,
                isBusy: false
            }
            database.ref('/staffDetails/' + name).set(details);
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function (user) {
                    console.log(firebase.auth().currentUser);
                    // user = firebase.auth().currentUser;
                    console.log('Registration Successful');
                    if (user.email == 'hoditstudentaffairs@stjosephs.ac.in') {
                        user.updateProfile({
                            photoURL: 'admin'
                        }).then(function () {
                            console.log('Update Sucessful');
                        }).catch(function () {
                            console.log('Update Unsuccesful');
                        });
                    } else {
                        user.updateProfile({
                            photoURL: 'staff'
                        }).then(function () {
                            console.log(firebase.auth.currentUser);
                            // location.reload();
                            console.log('Update Sucessful');
                        }).catch(function () {
                            console.log(firebase.auth.currentUser);
                            console.log('Update Unsuccesful');
                        });
                    }
                })
                .catch(function (e) {
                    console.log(e);
                });
        }
    });

    // firebase.auth().onAuthStateChanged(function (user) {

    //     console.log(user);
    //     if (user.email == 'hoditstudentaffairs@stjosephs.ac.in') {
    //         user.updateProfile({
    //             photoURL: 'admin'
    //         }).then(function () {
    //             console.log('Update Sucessful');
    //         }).catch(function () {
    //             console.log('Update Unsuccesful');
    //         });
    //     } else {
    //         user.updateProfile({
    //             photoURL: 'staff'
    //         }).then(function () {
    //             console.log(firebase.auth.currentUser);
    //             // location.reload();
    //             console.log('Update Sucessful');
    //         }).catch(function () {
    //             console.log(firebase.auth.currentUser);
    //             console.log('Update Unsuccesful');
    //         });
    //     }
    // });
});


$("#MenuIcon").click(function () {
    open = true;
    console.log("Menu Icon Clicked", open);
    $("#MainMenu").css("left", "0px");

    function showMenu() {
        $("#MainMenu").css("clip-path", "polygon(0 0,100% 0,100% 100%,0% 100%)");
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
