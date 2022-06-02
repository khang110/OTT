<?php

namespace App\Http\Controllers\Whatsapp;

use App\Http\Controllers\Controller;
use App\Events\SendWossopMessage;
use App\Events\SendPrivateWossopMessage;
use App\Models\WossopMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\FileAttempt;


class WossopMessageController extends Controller
{

    /**
     * Send new WossopMessage
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function sendMessage(Request $request)
    {
            $new_message = new WossopMessage();
            $new_message->receiver = $request->receiver_id;
            $new_message->sender = $sender = Auth::id();
            $new_message->is_group= $request->is_group;
            $new_message->is_read = 0;

        /*Thanh*/
        if ($request->hasFile('file')) {
            $new_message->message = $this->saveFile($request);
            $new_message->is_file = 1;
        }
        else {
            $new_message->message = $request->message;
            $new_message->is_file=0;
        }
            $new_message->save();
    }

    public function saveFile(Request $request)
    {
        
            $file = $request->file('file');
            $origin_name = $file->getClientOriginalName();
            $extension = $file->extension();
            $stored_path =  explode("/", $file->store('public'));
            $content_type = $file->getClientMimeType();

            $file_attempt = new FileAttempt();

            $file_attempt->origin_name = $origin_name;
            $file_attempt->extension = $extension;
            $file_attempt->stored_path = $stored_path[1];
            $file_attempt->content_type= $content_type;
            $file_attempt->save();

            return $file_attempt->id;
    }


    /**
     * Fetch messages sent and received by authenticated user from a particular user
     * @param user_id the id of the user in the chatlist
     * @return WossopMessage
     */
    public function fetchUserMessages($user_id,$is_group=0)
    {
            $auth_user_id = Auth::id();

            // If message sent to authenticated user is clicked, set 'is_read' to 1
            WossopMessage::where(['sender' => $user_id, 'receiver' => $auth_user_id])->update(['is_read' => 1]);

            return WossopMessage::where(function ($query) use ($user_id, $auth_user_id, $is_group) {
                $query->where('sender', $user_id)->where('receiver', $auth_user_id)->where('is_group', $is_group);
            })->orWhere(function ($query) use ($user_id, $auth_user_id, $is_group) {
                $query->where('sender', $auth_user_id)->where('receiver', $user_id)->where('is_group', $is_group);
            })->get();
    }

    public function fetchFile($id)
    {       
            $file_info = FileAttempt::find($id);
            if($file_info!=null)
            return response()->download(storage_path('app/public/'.$file_info->stored_path));
    }

    public function fetchFileInfo($id)
    {       
            return     $file_info = FileAttempt::find($id);
    }

    public function fetchNewMess()
    {       
        $auth_user_id = Auth::id();
        return WossopMessage::where('receiver',$auth_user_id)->where('is_read',0)->get();
    }
}
