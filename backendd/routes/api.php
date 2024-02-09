<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UtilController; 
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// UtilController
 
Route::post('save',[UtilController::class,'save']);
Route::post('saverelease',[UtilController::class,'saverelease']);


Route::post('getallrequests',[UtilController::class,'getallrequests']);
Route::post('getdgprequests',[UtilController::class,'getdgprequests']);
Route::post('getMessages',[UtilController::class,'getMessages']);
Route::post('getadminMessages',[UtilController::class,'getAdminMessages']);
Route::post('attendance',[UtilController::class,'store']);
Route::post('getattendenceReport',[UtilController::class,'getattendenceReport']);
Route::post('getallremovedprisoners',[UtilController::class,'getallremovedprisoners']);


Route::post('getjobreport',[UtilController::class,'getJobReport']);






Route::post('approve',[UtilController::class,'approve']);
Route::post('handover',[UtilController::class,'handover']);



Route::post('saveuser',[UtilController::class,'saveuser']);
Route::post('update',[UtilController::class,'update']);
Route::post('getall',[UtilController::class,'getAll']);
Route::post('getallattendence',[UtilController::class,'getallattendence']);
Route::post('getReleasedprisoner',[UtilController::class,'getReleasedprisoner']);
Route::post('getprisonerIncome',[UtilController::class,'getprisonerIncome']);



Route::post('getGeneralduty',[UtilController::class,'getGeneralduty']);

Route::post('getalljobassign',[UtilController::class,'getalljobassign']);
Route::post('getbyid',[UtilController::class,'getById']);
Route::post('getByGeneralId',[UtilController::class,'getByGeneralId']);



Route::post('getbydata',[UtilController::class,'getByData']);
Route::post('delete',[UtilController::class,'delete']);
Route::post('deleteuser',[UtilController::class,'deleteUser']);
Route::post('getuserbyid',[UtilController::class,'getUserById']);
Route::post('updateuser',[UtilController::class,'updateUser']);
Route::post('login',[UtilController::class,'Login']);
Route::post('fileupload',[UtilController::class,'fileupload']);



//TeacherController

Route::post('getteachers',[TeacherController::class,'getTeacherData']);
Route::post('teacherviewstudents',[TeacherController::class,'getStudentsByTeacherCourse']);

//StudentController

Route::post('getstudents',[StudentController::class,'getStudentData']); 