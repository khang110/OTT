<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupDetail;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct(Group $group, GroupDetail $group_details)
    {
        $this->group = $group;
        $this->group_details = $group_details;
    }

    public function index()
    {
        $allgroup = Group::all();
        return $allgroup;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->group->name_group = $request->name;
        $this->group->id_creator = Auth::id();
        $this->group->description = $request->description;
        $this->group->save();
        $members = $request->members;
        $members = (explode(",",$members));
        foreach ($members as $value) {
            $group_detail = new GroupDetail();
            $group_detail->id_user = (int)$value;
            $group_detail->id_group = $this->group->id;
            $group_detail->id_creator = Auth::id();
            $group_detail->save();
        }
        return true;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function show(Group $group)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function edit(Group $group)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Group $group)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function destroy(Group $group)
    {
        //
    }
}
