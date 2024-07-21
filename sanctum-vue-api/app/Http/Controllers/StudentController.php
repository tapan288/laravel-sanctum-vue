<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Resources\StudentResource;

class StudentController extends Controller
{
    public function index()
    {
        $studentsQuery = Student::query();

        return StudentResource::collection(
            $studentsQuery->paginate(10)
        );
    }
}
