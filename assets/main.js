var toDo = document.querySelector('.todo'),
    listItem = toDo.querySelector('.todo-item'),
    input = document.querySelector('input'),
    filterA = document.querySelector('.filter-all'),
    filterC = document.querySelector('.filter-complete'),
    filterIC = document.querySelector('.filter-incomplete'),
    id = 0,
    numberOfTasks = 0,
    // containers for ToDo items
    toDoList = [];

// object constructor to match <li> ToDo items
function ToDoItem(content, id) {
    this.content = content;
    this.id = id;
    this.complete = false;
    this.hidden = false;
}

function updateCount (up) {
    if (up === 'up') {
        numberOfTasks++;
    } else {
        numberOfTasks--;
    }
    document.querySelector('span').textContent = numberOfTasks + ' task(s)';
}

input.addEventListener('keypress', function (event) {
    var li = document.createElement('li'),
        remove = document.createElement('button');
    if (13 === event.keyCode) {

        // create and append typed content into new <li>
        li.textContent = input.value;
        li.classList.add('todo-item');
        li.id = 'td' + id++;
        toDo.appendChild(li);

        // create new ToDo item object and store in Incomplete array
        toDoList.push(new ToDoItem(input.value, li.id));

        // create and add remove/delete button
        remove.textContent = 'X';
        remove.classList.add('remove');
        li.appendChild(remove);

        // reset text input to empty
        input.value = '';

        // increment total number of incomplete tasks
        updateCount('up');
    }
});

// click to complete functionality
toDo.addEventListener('click', function (e) {
    if (e.target.matches('.todo-item')) {

        // toggle complete property
        toDoList.forEach(function (value) {
            if (value.id === e.target.id) {
                value.complete = !value.complete;
            }
        });

        // add complete class
        e.target.classList.toggle('complete');

        // de-increment total number of incomplete tasks
        updateCount('down');
    }
});

// delete button functionality
toDo.addEventListener('click', function (e) {
    if (e.target.matches('.remove')) {

        // remove from HTML structure
        let id = e.target.parentElement.id,
            goAway = document.querySelector('#' + id);
        document.querySelector('#' + id).parentElement.removeChild(goAway);

        // remove from array
        let index = toDoList.findIndex((value) => value.id === id)
        toDoList.splice(index, 1);

        // de-increment total number of incomplete tasks
        updateCount('down');
    }
});

// filter function
function repopulate(value) {
    var li = document.createElement('li'),
        remove = document.createElement('button');

    //recreate list item
    li.textContent = value.content;
    li.classList.add('todo-item');
    li.id = value.id;
    toDo.appendChild(li);

    // create 'remove' button
    remove.textContent = 'X';
    remove.classList.add('remove');
    li.appendChild(remove);
}

// event listener for filter/show All
filterA.addEventListener('click', function () {

    // now manipulates the array instead of the css
    toDoList.forEach(function (value) {
        if (value.hidden) {
            repopulate(value);
            value.hidden = false;
        }
    });
});

// event listener for filter/show only Complete
filterC.addEventListener('click', function () {

    // now manipulates the array instead of the css
    toDoList.forEach(function (value) {
        let item = toDo.querySelector('#' + value.id);

        if (value.complete && value.hidden) {
            repopulate(value);
            value.hidden = false;
        } else if (!value.complete && !value.hidden) {
            item.parentElement.removeChild(item);
            value.hidden = true;
        }
    });

});

// event listener for filter/show only Incomplete
filterIC.addEventListener('click', function () {

    // now manipulates the array instead of the css
    toDoList.forEach(function (value) {
        let item = toDo.querySelector('#' + value.id);

        if (!value.complete && value.hidden) {
            repopulate(value);
            value.hidden = false;
        } else if (value.complete && !value.hidden) {
            item.parentElement.removeChild(item);
            value.hidden = true;
        }
    });
});
