<!DOCTYPE html>
<html>

<head>
    <title>Todo List - WebReinvent</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
 
</head>

<body>


    <div class="container py-5 d-flex">
        <div class="col-12">
            <div class="card p-4 shadow">
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="showAllTasks"
                        onchange="toggleShowAllTasks(this)">
                    <label class="form-check-label" for="showAllTasks">Show All Tasks</label>
                </div>
                <div class="input-group mb-4">
                    <span class="input-group-text">
                        <i class="fas fa-user-circle me-3"
                            style="font-size: 24px; vertical-align: middle; color: #6c757d;"></i>

                        <span id="taskCount">0</span>
                    </span>
                    <input type="text" id="taskInput" class="form-control" placeholder="Project # To Do">
                    <button class="btn btn-success" onclick="addTask()">Add</button>
                </div>
                <table id="taskTable" class="table table-bordered w-100">
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>


 <script src="{{ asset('js/custom.js') }}"></script>


</body>

</html>
