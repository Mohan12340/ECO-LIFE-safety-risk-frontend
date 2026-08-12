//program to create an array of names and print them using foreach
let name = "Jyothi";
let names=[];
names.push("Jyothi");
names.push("Ravi");
names.push("Anil");
names.push("Sita");
function showNames1() {
    names.forEach(function(name) {
        name.toUpperCase();
        console.log("Hello", name);
    });
}

showNames1();

console.log("Using foreach loop to print names");
function showNames2() {
    names.forEach(function(name) {
        name.toLowerCase();
        console.log("Hello", name);
    });
}

showNames2();
