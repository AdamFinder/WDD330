function summation() {
    let n1 = document.getElementById("num1").value;
    let out = 0;
    for (i = 1; i <= n1; i++){
        out += i;
    }
    document.getElementById("output").innerHTML = out;
}

function addition() {
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);
    let out = n1 + n2;
    document.getElementById("output").innerHTML = out;
}

function subtraction() {
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);
    let out = n1 - n2;
    document.getElementById("output").innerHTML = out;
}

function multiplication() {
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);
    let out = n1 * n2;
    document.getElementById("output").innerHTML = out;
}

function division() {
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);
    let out = n1 / n2;
    document.getElementById("output").innerHTML = out;
}