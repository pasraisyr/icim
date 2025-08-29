// ...existing code...
import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for API responses
export interface AttendanceSession {
  id: number;
  teacher: number;
  class_obj: number;
  date: string;
  start_time: string;
  end_time?: string;
  status: 'active' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
}

export interface AttendanceRecord {
  id: number;
  session: number;
  student: number;
  status: 'present' | 'absent' | 'late' | 'excused';
  time_marked?: string;
  notes?: string;
  marked_by: number;
}

export interface StudentForAttendance {
  id: number;
  name: string;
  ic: string;
  guardian_name: string;
  guardian_phone: string;
  status: string;
  enrollment_date: string;
  allocated_date: string;
  address: string;
}

export interface ClassForAttendance {
  id: number;
  name: string;
  room: string;
  schedule: string;
}



// API functions
export const attendanceAPI = {
  // Submit attendance for a class (used by AttendanceForm)
  submitAttendance: async (payload: {
    teacher_id: number;
    class_id: number;
    date: string;
    attendance: { student_id: number; status: string }[];
  }): Promise<any> => {
    try {
      const response = await api.post('/Teacher/attendance/submit/', payload);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },


  // Get teacher classes (for class selection)
  getTeacherClasses: async (teacherId: number): Promise<any[]> => {
    try {
      const response = await api.get(`/Teacher/${teacherId}/classes/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching teacher classes:', error);
      throw error;
    }
  },

  // Get students for a teacher and class (verifies teacher allocation)
  getTeacherClassStudents: async (teacherId: number, classId: number): Promise<StudentForAttendance[]> => {
    try {
      const response = await api.get(`/Teacher/${teacherId}/class/${classId}/students/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching students for teacher and class:', error);
      throw error;
    }
  },

  // Get all teachers (for teacher selection)
  getAllTeachers: async (): Promise<any[]> => {
    try {
      const response = await api.get('/Academic/teachers/');
      return response.data;
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }
  },
};

// Simple API for attendance form
export const simpleAttendanceAPI = {
  getTeachers: async () => {
    return await attendanceAPI.getAllTeachers();
  },
  getTeacherClasses: async (teacherId: string) => {
    return await attendanceAPI.getTeacherClasses(Number(teacherId));
  },
  getClassStudents: async (teacherId: string, classId: string) => {
    const res = await attendanceAPI.getTeacherClassStudents(Number(teacherId), Number(classId));
    if (Array.isArray(res)) {
      return res;
    } else if (res && typeof res === 'object' && 'students' in res) {
      return (res as any).students || [];
    }
    return [];
  },
  submitAttendance: async (payload: {
    teacher_id: number;
    class_id: number;
    date: string;
    attendance: { student_id: number; status: string }[];
  }) => {
    return await attendanceAPI.submitAttendance(payload);
  },
  getSubmittedAttendance: async (teacherId?: string | number) => {
    // Fetch attendance records for a specific teacher
    if (!teacherId) return [];
    const response = await api.get(`/Teacher/${teacherId}/attendance/list/`);
    return response.data;
  },
};

export default attendanceAPI;
