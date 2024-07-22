<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use Illuminate\Http\Request;
use App\Http\Resources\ClassResource;

class ClassController extends Controller
{
    public function __invoke()
    {
        return ClassResource::collection(Classes::all());
    }
}
