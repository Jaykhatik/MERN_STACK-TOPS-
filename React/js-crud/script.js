
var selectedRow = null;

function onFormSubmit() {
    var formData = readFormdata();
    if (selectedRow == null)
        insertNewRecord(formData);
    else
        updateRecord(formData)
    resetForm();
}

//for fetching data from form
function readFormdata() {
    var formData = {}
    formData["fullname"] = document.getElementById("fullname").value;
    formData["empcode"] = document.getElementById("empcode").value;
    formData["salary"] = document.getElementById("salary").value;
    formData["city"] = document.getElementById("city").value;

    return formData;
}
//inserting new record
function insertNewRecord(data) {
    var table = document.getElementById("emplist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullname;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empcode;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.salary;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<button onClick="onEdit(this)" style="background-color:green; color:white;  cursor:pointer">Edit</button>
                       <button onClick="onDelete(this)" style="background-color:red; color:white;  cursor:pointer">Delete</button>`;
}

//resetform data 
function resetForm() {
    document.getElementById("fullname").value = "";
    document.getElementById("empcode").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";

    selectedRow = null;
}

//edit

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullname").value = selectedRow.cells[0].innerHTML;
    document.getElementById("empcode").value = selectedRow.cells[1].innerHTML;
    document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}


function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullname;
    selectedRow.cells[1].innerHTML = formData.empcode;
    selectedRow.cells[2].innerHTML = formData.salary;
    selectedRow.cells[3].innerHTML = formData.city;
}


//delete

function onDelete(td){
    if(confirm("Are you sure delete this record?")){
        row=td.parentElement.parentElement;
        document.getElementById("emplist").deleteRow(row.rowIndex);
        resetForm();
    }
}