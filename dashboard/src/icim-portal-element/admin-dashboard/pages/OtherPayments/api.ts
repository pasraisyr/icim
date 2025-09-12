// API utility for SubjectsManagement
const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';

export interface OtherPayment{
  id: number;
  name: string;
  price: number;
  status: boolean;
  updated_at: string;
}

export interface OtherPaymentPayload {
  id: number;
  name: string;
  price: number;
  status: boolean;
}

export async function fetchOtherPayment(): Promise<OtherPayment[]> {
  const res = await fetch(`${BASE_URL}/admin/other_payments/`);
  if (!res.ok) throw new Error('Failed to fetch other payments');
  return res.json();
}

export async function createOtherPayment(payload: OtherPaymentPayload): Promise<OtherPayment> {
  const token = localStorage.getItem('token'); // Or get from context/store
  const res = await fetch(`${BASE_URL}/admin/other_payments/input/`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create subject');
  return res.json();
}

export async function updateOtherPayment(payload: OtherPaymentPayload): Promise<OtherPayment> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/other_payments/edit/`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload), 
  });
  if (!res.ok) throw new Error('Failed to edit subject');
  return res.json();
}

export async function deleteOtherPayment(id: number): Promise<void> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/other_payments/delete/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id }) // send id in body
  });
  if (!res.ok) throw new Error('Failed to delete subject');
}
