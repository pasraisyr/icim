const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';

export interface About {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'inactive';
}

export interface AboutPayload {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'inactive';
}

// Fetch the About element (returns a single object)
export async function fetchAbout(): Promise<About> {
  const res = await fetch(`${BASE_URL}/admin/about/`);
  if (!res.ok) throw new Error('Failed to fetch about');
  return res.json();
}

// Fetch all About elements
export async function fetchAbouts(): Promise<AboutPayload[]> {
  const res = await fetch(`${BASE_URL}/admin/about/`);
  if (!res.ok) throw new Error('Failed to fetch abouts');
  const data = await res.json();
  // If data is an object, wrap it in an array
  return Array.isArray(data) ? data : [data];
}

// Create or update the About element
export async function createOrUpdateAbout(payload: AboutPayload): Promise<{ status: string }> {
  const token = localStorage.getItem('token'); // Or get from context/store
  const res = await fetch(`${BASE_URL}/admin/about/input/`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Add this line
    },
    body: JSON.stringify({
      element: 'About',
      data: payload
    }),
  });
  if (!res.ok) throw new Error('Failed to create/update about');
  return res.json();
}

// Edit the About element
export async function editAbout(payload: AboutPayload): Promise<{ status: string }> {
  const token = localStorage.getItem('token'); // Or get from context/store
  const res = await fetch(`${BASE_URL}/admin/about/edit/`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Add this line
    },
    body: JSON.stringify({
      element: 'About',
      data: payload
    }),
  });
  if (!res.ok) throw new Error('Failed to edit about');
  return res.json();
}

// Delete the About element
export async function deleteAbout(id: number): Promise<{ status: string }> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/about/delete/`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      element: 'About',
      id: id
    }),
  });
  if (!res.ok) throw new Error('Failed to delete about');
  return res.json();
}
