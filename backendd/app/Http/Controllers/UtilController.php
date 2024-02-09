<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function GuzzleHttp\json_decode;

class UtilController extends Controller
{
    //

    public function save(Request $request)
    {
        DB::table($request->tablename)->insert($request->except(['tablename']));
        echo json_encode('successful');
    }

    public function saverelease(Request $request){
        DB::table($request->tablename)->insert($request->except(['tablename']));
        echo json_encode('successful');
    DB::table('prisoner')->where('id',$request->prisoner_id)->update(['releavestatus'=>1]);
    echo json_encode('successful');

    }


    public function update(Request $request)
    {
        DB::table($request->tablename)->where('id', $request->id)->update($request->except(['tablename', 'id']));
        echo json_encode('successful');
    }
    public function getAll(Request $request)
    {
        $result = DB::table($request->tablename)->get();
        echo json_encode($result);
    }


    public function getReleasedprisoner(Request $request){
        $result = DB::table($request->tablename)
        ->where('id',$request->id)
        ->get();
        echo json_encode($result);

    }


    public function getprisonerIncome(Request $request){
        $result = DB::table($request->tablename)
        ->join('job','job.id','=','job_assign.job_id')
        ->where('prisoner_id',$request->id)
        ->get();
        echo json_encode($result);
    }


    public function getallattendence(Request $request){
        $result = DB::table($request->tablename) 
        ->get();
        echo json_encode($result);
    }

    public function getallremovedprisoners(Request $request){
        $result = DB::table($request->tablename)
        ->join('releavingremarks','releavingremarks.prisoner_id','=','prisoner.id')
        ->where('releavestatus',1) 
        ->get();
        echo json_encode($result);
    }
    public function getallrequests(Request $request)
    {
        $result = DB::table($request->tablename)
            ->select('*', 'requests.id as rid')
            ->join('jailsuperintendent', 'jailsuperintendent.id', '=', 'requests.userid')
            ->where('requests.requeststatus', 0)
            ->get();
        echo json_encode($result);
    }

    public function getdgprequests(Request $request)
    {
        $result = DB::table($request->tablename)
            ->select('*', 'requests.id as rid')
            ->join('jailsuperintendent', 'jailsuperintendent.id', '=', 'requests.userid')
            ->where('requests.requeststatus', 2)
            ->get();
        echo json_encode($result);
    }

    public function getMessages(Request $request)
    {
        $result = DB::table($request->tablename)
        ->select('message.*','replay.*','replay.id as rid','message.id as mid')
        ->join('replay', $request->tablename.'.id', '=', 'replay.mid','left')
        ->where('message.user_id',$request->user_id)
            ->get();
        echo json_encode($result);
    }
    public function getAdminMessages(Request $request)
    {
        $result = DB::table($request->tablename)
        ->select('message.*','replay.*','replay.id as rid','message.id as mid')
        ->join('replay', $request->tablename.'.id', '=', 'replay.mid','left') 
            ->get();
        echo json_encode($result);
    }

    public function approve(Request $request)
    {
        DB::table('requests')
            ->where('id', $request->rid)
            ->update(['requeststatus' => '1']);
            echo json_encode('success');
    }
    public function handover(Request $request)
    {
        DB::table('requests')
            ->where('id', $request->rid)
            ->update(['requeststatus' => '2']);
            echo json_encode('success');
    }
    

    public function getById(Request $request)
    {
        $result = DB::table($request->tablename)->where('id', $request->id)->first();
        echo json_encode($result);
    }
    public function getByGeneralId(Request $request)
    {
        $result = DB::table($request->tablename)
            ->join('login', 'login.id', '=', 'generalduty.loginid')
            ->where('generalduty.loginid', $request->id)->first();
        echo json_encode($result);
    }
    public function getByData(Request $request)
    {
        $result = DB::table($request->tablename)->where($request->except('tablename'))->get();
        echo json_encode($result);
    }
    public function delete(Request $request)
    {
        DB::table($request->tablename)->where('id', $request->id)->delete();
        echo json_encode('successful');
    }


    public function saveUser(Request $request)
    {
        $id = DB::table('login')->insertGetId($request->only(['email', 'password', 'usertype']));


        $insert_array =  $request->except(['email', 'password', 'usertype', 'tablename']);
        $insert_array['loginid'] = $id;

        DB::table($request->tablename)->insert($insert_array);

        echo json_encode('success');
    }
    public function deleteUser(Request $request)
    {
        DB::table('login')->where('id', $request->id)->delete();
        DB::table($request->tablename)->where('loginid', $request->id)->delete();
        echo json_encode('success');
    }
    public function getUserById(Request $request)
    {
        $result = DB::table('login')->join($request->tablename, 'login.id', '=', "$request->tablename.loginid")->where('loginid', $request->loginid)->first();
        echo json_encode($result);
    }
    public function updateUser(Request $request)
    {
        DB::table('login')->where('id', $request->id)->update($request->only(['email']));
        DB::table($request->tablename)->where('loginid', $request->id)->update($request->except(['email', 'tablename']));
        echo json_encode('success');
    }


    public function Login(Request $request)
    {
        $result = DB::table('login')->where($request->all())->first();

        if ($result) {

            $usertype = $result->usertype;
            $userdata = [];

            if ($usertype == 0) {
                $userdata = $result;
            } else if ($usertype == 1) {
                $userdata = DB::table('login')->join('dig', 'login.id', '=', 'dig.loginid')->where($request->all())->first();
            } else if ($usertype == 2) {
                $userdata = DB::table('login')->join('jailsuperintendent', 'login.id', '=', 'jailsuperintendent.loginid')->where($request->all())->first();
            } else if ($usertype == 3) {
                $userdata = DB::table('login')->join('generalduty', 'login.id', '=', 'generalduty.loginid')->where($request->all())->first();
            } 

            echo json_encode($userdata);
        } else {
            echo json_encode('invalid');
        }
    }

    public function fileupload(Request $request)
    {

        // $request->name;
        $image = $request->file('file');
        $imagename = time() . '_' . $image->getClientOriginalName();
        $image->move('public/img', $imagename);
        echo json_encode($imagename);
    }




    public function getalljobassign(Request $request)
    {
        $result = DB::table($request->tablename)
            ->select('*', 'job_assign.id as assignid')
            ->join('prisoner', 'prisoner.id', '=', 'job_assign.prisoner_id')
            ->join('jails', 'jails.id', '=', 'prisoner.jail_id')
            ->join('job', 'job.id', '=', 'job_assign.job_id')
            ->where('jails.id', $request->jail_id)
            ->get();
        echo json_encode($result);
    }
    public function getGeneralduty(Request $request)
    {
        $result = DB::table($request->tablename)
            ->select('*', 'generalduty.id as gid')
            ->join('login', 'login.id', '=', 'generalduty.loginid')
            ->get();
        echo json_encode($result);
    }



    public function store(Request $request)
{

    foreach ($request->attendance as $prisonerId => $attendance) {
        $data=[
            'prisoner_id' => $prisonerId,
            'date' => $request->date,
            'attendance' => $attendance,
            'jail_id'=>$request->jail_id
        ];
        $inserted = DB::table('attendence')
            ->updateOrInsert([
                'prisoner_id' => $prisonerId,
                'date' => $request->date,
                'jail_id'=>$request->jail_id
            ], $data);
            
    }

    return response()->json(['message' => 'Attendance stored successfully']);
}

public function getattendenceReport(Request $request)
{
$result=DB::table('attendence')
->select('jails.id as jid','jails.*','attendence.*','attendence.id as atid','prisoner.id as pid','prisoner.*')
->join('jails','jails.id','=','attendence.jail_id')
->join('prisoner','prisoner.id','=','attendence.prisoner_id')
->where('date',$request->date)
->get();
echo json_encode($result);
}
public function getJobReport(Request $request)
{
$result=DB::table('job_assign')
->select('jails.id as jid','jails.*','prisoner.id as pid','prisoner.*','job.title','job_assign.*')
->join('job','job.id','job_assign.job_id')
->join('prisoner','prisoner.id','=','job_assign.prisoner_id')
->join('jails','jails.id','=','prisoner.jail_id')
->where('date',$request->date)
->get();
echo json_encode($result);
}



}
