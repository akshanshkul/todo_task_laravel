<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TodoTask;
use Illuminate\Validation\ValidationException;
class TodoTaskController extends Controller
{

    public function index()
    {
        return TodoTask::orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255|unique:todo_tasks,title',
            ]);
        } catch (ValidationException $e) {
            // Return validation errors as JSON with 422 status
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        $task = TodoTask::create([
            'title' => $validatedData['title'],
            'is_completed' => false,
        ]);

        return response()->json($task, 201); // 201 Created
    }



    public function markComplete($id)
    {
        $task = TodoTask::findOrFail($id);
        $task->is_completed = true;
        $task->save();
        return $task;
    }

    public function delete($id)
    {
        $task = TodoTask::findOrFail($id);
        $task->delete();
        return $task;
    }
}
