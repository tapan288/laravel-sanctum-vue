<?php

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\StudentController;

Route::get('/user', function (Request $request) {
    return UserResource::make($request->user());
})->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::apiResource('students', StudentController::class);

    Route::get('classes', ClassController::class);
    Route::get('sections', SectionController::class);
});
