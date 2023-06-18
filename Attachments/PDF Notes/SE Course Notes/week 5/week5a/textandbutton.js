function handleButton1Click() {
    var textbox1 = document.getElementById("textbox1");
    var span1 = document.getElementById("span1");
    span1.innerHTML = textbox1.value;
}

function run() {
    var button1 = document.getElementById("button1");
    button1.addEventListener("click", handleButton1Click); 
}

document.addEventListener( "DOMContentLoaded", run);
