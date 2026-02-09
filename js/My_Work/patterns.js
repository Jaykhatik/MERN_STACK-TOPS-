/*
pattern-1 ;     * 
                * * 
                * * * 
                * * * * 
                * * * * * 
*/
//1
for (let i = 1; i <= 5; i++) {
    console.log("* ".repeat(i));
}


//2
for (let i = 1; i <= 5; i++) {
    let row = "";

    for (let j = 1; j <= i; j++) {
        row += "* ";
    }

    console.log(row);
}



/*
pattern-2 ;     * * * * *
                * * * *
                * * *
                * *
                *

*/

//1
for (let i = 5; i >= 1; i--) {
    console.log("* ".repeat(i));
}


//2
for (let i = 5; i >= 1; i--) {
    let row = ""
    for (let j = 1; j <= i; j++) {
        row += "* "
    }
    console.log(row)
}
