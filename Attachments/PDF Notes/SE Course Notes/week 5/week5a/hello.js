var msg = "hello";
/* console.log(msg);
 alert(msg); */
// document.write(msg);


function run() {
    var p_elem = document.getElementById("msg1");
    p_elem.innerText = msg;

}
document.addEventListener( "DOMContentLoaded", run);
