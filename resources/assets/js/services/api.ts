import axios from 'axios';
import { authFetch } from '../auth';
import { User, Post, Story } from '../types';

export async function getPosts(_currentUser?: User): Promise<Post[]> {
  try {
    const res = await authFetch('/posts');
    return res.data?.data ?? res.data ?? [];
  } catch (e) {
    console.warn('getPosts failed, returning empty list', e);
    return [];
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const res = await authFetch('/users');
    return res.data?.data ?? res.data ?? [];
  } catch (e) {
    console.warn('getAllUsers failed, returning empty list', e);
    return [];
  }
}

export async function getStories(): Promise<Story[]> {
  try {
    const res = await authFetch('/stories');
    return res.data?.data ?? res.data ?? [];
  } catch (e) {
    console.warn('getStories failed, returning empty list', e);
    return [];
  }
}

export async function createPost(payload: { body?: string; imageUrl?: string; privacy?: string; user?: User }) {
  

    payload.body = payload?.content || payload?.body ;
    
  try {
    const res = await authFetch('/posts', { method: 'post', data: payload });
    return res.data;
  } catch (e) {
    console.warn('createPost failed (mock)', e);
    return null;
  }
}

export async function toggleLikePost(postId: string, userId: string) {
  try {
    const res = await authFetch(`/posts/${postId}/like`, { method: 'post' });
    return res.data;
  } catch (e) {
    console.warn('toggleLikePost failed (mock)', e);
    return null;
  }
}

export async function addComment(postId: string, user: User, text: string, parentId?: string) {
  try {
    const res = await authFetch(`/posts/${postId}/comments`, { method: 'post', data: { content: text, parent_id: parentId } });
    return res.data;
  } catch (e) {
    console.warn('addComment failed (mock)', e);
    return null;
  }
}

export async function createStory(user: User, imageData: string) {
  try {
    const res = await authFetch('/stories', { method: 'post', data: { image: imageData } });
    return res.data;
  } catch (e) {
    console.warn('createStory failed (mock)', e);
    return null;
  }
}

export default { getPosts, getAllUsers, getStories, createPost, toggleLikePost, addComment, createStory };
