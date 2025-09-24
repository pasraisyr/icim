import { Student } from "../StudentsManagement/api";
import { Class } from "../ClassesManagement/api";


// API utility for StudentAllocation
const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';


export interface StudentAllocation {
  id: number;
  student: {
    id: number;
    first_name: string;
    last_name: string;
    guardianName: string;
    guardianPhone: string;
    // will add other field when its needed
  };
  classroom_id: {
    id: number;
    name: string;
    level: string;
   // will add other field when its needed
  };
  allocatedDate: string;
}

export interface StudentAllocationPayload {
  student_id: number;
  classroom_id: number; // <-- update this field name
}

// API Functions
export async function fetchStudents(): Promise<Student[]> {
  const res = await fetch(`${BASE_URL}/admin/clients/`);
  if (!res.ok) throw new Error('Failed to fetch students');
  return res.json();
}

export async function fetchClasses(): Promise<Class[]> {
  const res = await fetch(`${BASE_URL}/admin/classrooms/`);
  if (!res.ok) throw new Error('Failed to fetch classes');
  return res.json();
}

export async function fetchStudentAllocations(classId?: number): Promise<StudentAllocation[]> {
  const url = classId
    ? `${BASE_URL}/admin/student_allocations/?class_id=${classId}`
    : `${BASE_URL}/admin/student_allocations/`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch student allocations');
  const data = await res.json();

  // Map flat API response to expected structure
  return data.map((item: any) => ({
    id: item.id,
    student: {
      id: item.student_id,
      first_name: item.student_name,
      email: item.student_email,
      // add other fields if needed
    },
    classroom_id: {
      id: item.classroom_id,
      name: item.classroom_name,
      // add other fields if needed
    },
    allocatedDate: item.updated_at,
  }));
}


export async function createStudentAllocation(payload: StudentAllocationPayload): Promise<StudentAllocation> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/student_allocation/input/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create student allocation');
  return res.json();
}

export async function updateStudentAllocation(payload: StudentAllocationPayload): Promise<StudentAllocation> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/student_allocation/edit/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update student allocation');
  return res.json();
}

export async function deleteStudentAllocation(id: number): Promise<void> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/student_allocation/delete/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('Failed to delete student allocation');
}

export type {Student,Class}

// Alias functions for easier importing
export const getStudents = fetchStudents;
export const getClasses = fetchClasses;
export const getStudentAllocations = fetchStudentAllocations;
export const allocateStudent = createStudentAllocation;
export const deallocateStudent = deleteStudentAllocation;