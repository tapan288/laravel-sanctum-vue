<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;
use App\Http\Resources\SectionResource;

class SectionController extends Controller
{
    public function __invoke(Request $request)
    {
        $sections = Section::where('class_id', $request->class_id)->get();

        return SectionResource::collection($sections);
    }
}
