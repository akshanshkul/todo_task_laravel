const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// function to add a new task to the list
async function addTask() {
    const title = document.getElementById("taskInput").value.trim();

    if (!title) {
        alert("Task title cannot be empty!");
        return;
    }

    try {
        const response = await fetch("/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrf,
                "Accept": "application/json"
            },
            body: JSON.stringify({
                title
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.errors && errorData.errors.title) {
                alert(errorData.errors.title[0]);
            } else {
                alert("Something went wrong");
            }
            return;
        }

        document.getElementById("taskInput").value = "";
        fetchTasks();

    } catch (error) {
        alert("Error: " + error.message);
    }
}

// get time 
function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + " year" + (interval > 1 ? "s" : "") + " ago";

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + " month" + (interval > 1 ? "s" : "") + " ago";

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + " day" + (interval > 1 ? "s" : "") + " ago";

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + " hour" + (interval > 1 ? "s" : "") + " ago";

    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + " minute" + (interval > 1 ? "s" : "") + " ago";

    return "a few seconds ago";
}



//  fetch data from db and filter accoding checkbox
function fetchTasks(showAll = false) {
    fetch("/task")
        .then(res => res.json())
        .then(tasks => {
            console.log(tasks.created_at);
            const tbody = document.querySelector("#taskTable tbody");
            tbody.innerHTML = "";

            const filteredTasks = showAll ? tasks : tasks.filter(task => !task.is_completed);
            document.getElementById("taskCount").innerText = filteredTasks.length;

            filteredTasks.forEach(task => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td style="width:38px;text-align: center;">
                        <input type="checkbox" class="form-check-input" onchange="markComplete(${task.id})" ${task.is_completed ? "checked disabled" : ""}>
                    </td>
                    <td class="w-75">
                        <span style="text-decoration: ${task.is_completed ? "line-through" : ""}">${task.title} </span>        <small class="text-muted time-text ">${timeSince(task.created_at)}</small>

                    </td>
                    <td class="text-start">
                        <i class="fas fa-user-circle me-3" style="font-size: 24px; vertical-align: middle; color: #6c757d;"></i>
                    </td>
                    <td class="text-end" style="width:16px;color:grey;padding:2px;">
                        <button class="btn btn-sm" onclick="deleteTask(${task.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        });
}


// update task as complated
function markComplete(id) {
    fetch(`/task/${id}/complete`, {
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": csrf
        }
    })
        .then(res => res.json())
        .then(() => fetchTasks());
}

// Delete Task (with confirm)
function deleteTask(id) {
    if (!confirm("Are you sure to delete this task?")) return;

    fetch(`/task/${id}`, {
        method: "DELETE",
        headers: {
            "X-CSRF-TOKEN": csrf
        }
    })
        .then(res => res.json())
        .then(() => fetchTasks());
}

let showAll = false;

function toggleShowAllTasks(checkbox) {
    showAll = checkbox.checked;
    fetchTasks(showAll);
}


fetchTasks(showAll);