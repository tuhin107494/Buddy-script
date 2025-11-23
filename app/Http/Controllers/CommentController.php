<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'body' => 'required|string',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        $comment = $post->comments()->create([
            'user_id' => $request->user()->id,
            'body' => $request->body,
            'parent_id' => $request->parent_id,
        ]);

        return response()->json($comment->load('user'), Response::HTTP_CREATED);
    }

    public function update(Request $request, Comment $comment)
    {
        $this->authorize('update', $comment);

        $request->validate(['body' => 'required|string']);

        $comment->update(['body' => $request->body]);

        return response()->json($comment);
    }

    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);
        $comment->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
