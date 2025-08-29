// API utility for SubjectsManagement
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface About {
  id: number;
  title: string;
  description: string;
  created_at: string;
  status: 'active' | 'inactive';
}

export interface AboutPayload {
  title: string;
  description: string;
  status: 'active' | 'inactive';
}

export async function fetchAbouts(): Promise<About[]> {
  const res = await fetch(`${BASE_URL}/api/Admin/about/`);
  if (!res.ok) throw new Error('Failed to fetch abouts');
  return res.json();
}

export async function createAbout(payload: AboutPayload): Promise<About> {
  const res = await fetch(`${BASE_URL}/api/Admin/about/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create about');
  return res.json();
}

export async function updateAbout(id: number, payload: AboutPayload): Promise<About> {
  const res = await fetch(`${BASE_URL}/api/Admin/about/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update about');
  return res.json();
}

export async function deleteAbout(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/Admin/about/${id}/`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete about');
}
