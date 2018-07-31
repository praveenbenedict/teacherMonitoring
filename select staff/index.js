
function loadData() {
    const dbref = firebase.database().ref().child("staff");
    var data;
    dbref.on('value', snap => {
        data = snap.val();
        addData(data);
    });
    console.log("out");

}

function addData(data) {
    var ele = document.getElementById("selector");
    for (var obj in data) {
        if (data[obj].isBusy === false) {
            var opt = document.createElement("option");
            opt.text = data[obj].name;
            ele.add(opt);
        }
    }
}

var submit = document.addEventListener("click", function () {
    var name = document.getElementById("d");
});

window.onload = loadData();