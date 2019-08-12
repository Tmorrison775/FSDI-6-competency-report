//report: save list to backend and pull it when needed



var serverUrl = "http://restclass.azurewebsites.net/API2/Todos";

var todos = [];
//JS to change the text on a text field
function createNew() {
    var text = $("#txtTest").val();
    var list = $("#todos");
    list.append('<li class="list-group-item">' + text + '</li>');

    //clear the text

    $("#txtTest").val("").focus;

    //create an object
    var todo = {
        text: text,
        user: "Travis",
        state: 0
    }
    console.log(todo);
    displayTodo(todo);

    //send object to backend
    $.ajax({
        url: serverUrl,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(todo),
        success: function (res) {
            console.log("Server says:", res);
        },
        error: function (error) {
            console.error("Error saving", error);
        }
    })
};
function remove(id){
    console.log("Item remove", id);

 

    $("#" + id).remove();

    // find on the todos array the one with the id = id

    
            $.ajax({
                url: serverUrl,
                type: "DELETE",
                contentType: "application/json",
                data: JSON.stringify(id),
                success: function (res) {
                    console.log("Server says:", res);
                },
                error: function (error) {
                    console.error("Error saving", error);
                }
            })
        }
    


function displayTodo(todo) {

    if (todo.state == 0) {
        var list = $("#todos");
        list.append(`<li class="list-group-item" id="${todo.id}">' ${todo.text} '<button type="button" onclick="markDone(${todo.id});" class="btn btn-outline-primary float-right"> Done</button></li>`);
    } else {
        var list = $("#doneTodos");
        list.append(`<li class="list-group-item ${todo.id}">' ${todo.text} '<button type="button" onclick="remove(${todo.id});" class="btn btn-outline-primary float-right">Remove</button></li>`)
    }
};

function markDone(id){
     console.log("Item done", id);

 

    $("#" + id).remove();

    // find on the todos array the one with the id = id

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {

            todos[i].state = 1;

            displayTodo(todos[i]);
            $.ajax({
                url: serverUrl,
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify(todos[i]),
                success: function (res) {
                    console.log("Server says:", res);
                },
                error: function (error) {
                    console.error("Error saving", error);
                }
            })
        }
    }
};


function loadData() {
    //load data from backend
    $.ajax({
        url: serverUrl,
        type: "GET",
        success: function (res) {
            console.log("Server says:", res);
            for (let i = 0; i < res.length; i++) {
                if (res[i].user == "Travis") {
                    todos.push(res[i]);
                    displayTodo(res[i]);
                }
            }

        },
        error: function (error) {
            console.error("Error saving", error);
        }
    })
    //display the data
};
/*function init() {
    var txt = document.getElementById("txtTest");
    console.log(txt.value);
    txt.value = "Last";
    //assign a function to click event of button
    var btn = document.getElementById('btnAdd');
    btn.onclick = createNew;
}*/
function init2() {
    //change the text on the field
    //event binding
    $("#txtTest").keypress(function (args) {
        if (args.key == "Enter")
            createNew();
    })
    $("#btnAdd").click(createNew);
    loadData();
    
}
//window.onload = init; //this will load a function when the document is loaded. This will help cause less faults in the code.
$(document).ready(init2);