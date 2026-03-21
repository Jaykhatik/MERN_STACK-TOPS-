//13)Left Half Diamond Star Pattern in javascript.

let n = 4;
for (let i = 1; i <= n; i++) {
    document.writeln("*".repeat(i) + "<br>");
}
for (let i = n - 1; i >= 1; i--) {
    document.writeln("*".repeat(i) + "<br>")
}