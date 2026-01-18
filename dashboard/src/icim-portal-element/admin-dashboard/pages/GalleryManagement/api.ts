export interface Gallery {
  id: number;
  title: string;
  image: string;
  description?: string;
  order: number;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryFormData {
  title: string;
  description?: string;
  order: number;
  status: boolean;
  image?: File;
}

// Fetch all gallery images
export async function fetchGalleries(): Promise<Gallery[]> {
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/admin/gallery/`);
  if (!res.ok) throw new Error('Failed to fetch galleries');
  return res.json();
}

// Create new gallery
export async function createGallery(formData: FormData): Promise<Gallery> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/admin/gallery/input/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to create gallery');
  return res.json();
}

// Update gallery
export async function updateGallery(id: number, formData: FormData): Promise<Gallery> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/admin/gallery/edit/${id}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to update gallery');
  return res.json();
}

// Delete gallery
export async function deleteGallery(id: number): Promise<void> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/admin/gallery/delete/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  if (!res.ok) throw new Error('Failed to delete gallery');
}
