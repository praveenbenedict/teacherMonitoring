$(document).ready(function () {
    $('.signUp').click(function () {

        var email = $('.email').val();
        var pass = $('.pass').val();
        console.log(email);
        console.log(pass);
        firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
            console.log(error.message);
        });
    });

    $('.logIn').click(function () {

        var email = $('.email').val();
        var pass = $('.pass').val();
        console.log(email);
        console.log(pass);

        if( email === "hoditstudentaffairs@stjosephs.ac.in"){//Email is lily
        
            window.location("./assignStaff.html");
        }
        else {
            firebase.auth().signInWithEmailAndPassword(email, pass).then(function(user) {
                var df = document.createDocumentFragment();
                var ele = document.createElement("div");
                ele.id = "username";
                ele.setAttribute("name",email);
                df.appendChild(ele);
                document.getElementById("body").appendChild(df);
                database
        }).catch((e) => {
                    console.log(e);
            });
        }
        

    });

    $('.logout').click(function() {
        firebase.auth().signOut().then(function () {

        }).catch(function(err) {
            console.log(e);
        })
    });

    firebase.auth().onAuthStateChanged(function (user) {

        if (user.email == 'jbapraveen@hotmail.com') {
            user.updateProfile({
                photoURL: 'admin'
            }).then(function () {
                console.log('Update succesfull');
            });
        } else {

            user.updateProfile({
                photoURL: ''
            }).then(function () {
                console.log('Update Successful');
            }).catch(function () {
                console.log('Update Error');
            });;
        }

    });
});
