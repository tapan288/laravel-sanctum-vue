<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Resources\StudentResource;
use App\Http\Requests\StoreStudentRequest;

class StudentController extends Controller
{
    public function index()
    {
        $studentsQuery = Student::query();

        return StudentResource::collection(
            $studentsQuery->paginate(10)
        );
    }

    public function store(StoreStudentRequest $request)
    {
        $student = Student::create($request->validated());

        return StudentResource::make($student);
    }
}
