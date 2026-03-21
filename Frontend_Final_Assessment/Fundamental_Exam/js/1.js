 //1)Find Area And Circumference of Circle in javascript.

        //Formula :- area=πr2 , Circumference=2πr
        let radius = prompt("Enter radius of circle:");

        radius = Number(radius); 

        let area = Math.PI * radius * radius;
        let circumference = 2 * Math.PI * radius;

        document.writeln("Area of Circle: " + area+"<br>");
        document.writeln("Circumference of Circle: " + circumference);