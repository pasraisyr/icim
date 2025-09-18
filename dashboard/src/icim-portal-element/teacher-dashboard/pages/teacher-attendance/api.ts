import axios from 'axios';

// Base API configuration
const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add this to your api.ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or wherever you store your token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types for API responses
export interface AttendanceRecord {
  id: number;
  student_id: number;
  student_name?: string;
  teacher_id?: number;
  teacher_name?: string;
  classroom_id: number;
  classroom_name?: string;
  status: string;
  date: string; // <-- Add this line
  updated_at: string;
}

export interface AttendanceInputPayload {
  student_id: number;
  classroom_id: number;
  status: string;
  date: string; // <-- Add this line
}

export interface AttendanceEditPayload {
  id: number;
  status?: string;
  classroom_id?: number;
  date?: string; // <-- Add this line
}

// API functions
export const attendanceAPI = {
  // Get all attendance records for the logged-in teacher
  getMyAttendance: async (): Promise<AttendanceRecord[]> => {
    const response = await api.get('/teacher/attendance/');
    return response.data;
  },

  // Get all attendance records (admin only)
  getAllAttendance: async (): Promise<AttendanceRecord[]> => {
    const response = await api.get('/teacher/attendance/all/');
    return response.data;
  },

  // Input (create) a new attendance record
  inputAttendance: async (payload: AttendanceInputPayload): Promise<AttendanceRecord> => {
    const response = await api.post('/teacher/attendance/input/', payload);
    return response.data;
  },

  // Edit an attendance record
  editAttendance: async (payload: AttendanceEditPayload): Promise<AttendanceRecord> => {
    const response = await api.put('/teacher/attendance/edit/', payload);
    return response.data;
  },

  // Delete an attendance record
  deleteAttendance: async (attendanceId: number): Promise<{ message: string }> => {
    const response = await api.delete(`/teacher/attendance/delete/${attendanceId}/`);
    return response.data;
  },


  // Get all classes for the teacher
  getTeacherClasses: async (): Promise<{id: number, name: string, level: string}[]> => {
    const response = await api.get('/teacher/classes/');
    return response.data;
  },

  // Get all students in a selected class
  getStudentsInClass: async (classroomId: number): Promise<{id: number, studentName: string, studentIC: string, email: string}[]> => {
    const response = await api.get(`/teacher/class/${classroomId}/students/`);
    return response.data;
  },
};

export default attendanceAPI;
