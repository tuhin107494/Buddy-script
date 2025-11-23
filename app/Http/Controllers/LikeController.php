<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LikeController extends Controller
{
    // toggle like (for polymorphic likeables)
    public function toggle(Request $request)
    {
        $request->validate([
            'likeable_id' => 'required|integer',
            'likeable_type' => 'required|string'
        ]);

        $likeableType = $request->likeable_type;
        $likeableId = $request->likeable_id;

        // resolve model class if you pass 'post' / 'comment' etc.
        $map = [
            'post' =>Post::class,
            'comment' => Comment::class,
        ];

        if (isset($map[$likeableType])) {
            $modelClass = $map[$likeableType];
        } else {
            // optionally allow a full class
            $modelClass = $likeableType;
        }

        $entity = $modelClass::findOrFail($likeableId);

        $existing = $entity->likes()->where('user_id', $request->user()->id)->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['liked' => false], Response::HTTP_OK);
        } else {
            $entity->likes()->create(['user_id' => $request->user()->id]);
            return response()->json(['liked' => true], Response::HTTP_CREATED);
        }
    }
}
