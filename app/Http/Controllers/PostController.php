<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PostController extends Controller
{
    public function index()
    {
        // simple feed: latest public posts with user & counts
        $posts = Post::with(['user', 'comments', 'likes'])
            ->where('is_public', true)
            ->latest()
            ->paginate(15);

        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'body' => 'nullable|string',
            'image_path' => 'nullable|string',
            'is_public' => 'boolean',
        ]);

        $post = Post::create(array_merge(
            $request->only(['body', 'image_path', 'is_public']),
            ['user_id' => $request->user()->id]
        ));

        return response()->json($post->load('user'), Response::HTTP_CREATED);
    }

    public function show(Post $post)
    {
        $post->load(['user', 'comments.user', 'likes']);
        return response()->json($post);
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post); // optional: add policy

        $request->validate([
            'body' => 'nullable|string',
            'image_path' => 'nullable|string',
            'is_public' => 'boolean',
        ]);

        $post->update($request->only(['body', 'image_path', 'is_public']));

        return response()->json($post);
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post); // optional
        $post->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
