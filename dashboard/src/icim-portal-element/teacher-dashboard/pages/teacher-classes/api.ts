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
export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  joinDate: string;
}

export interface Subject {
  id: number;
  name: string;
  status: string;
}

export interface ClassInfo {
  id: number;
  name: string;
  level: string;
  scheduleDay: string;
  startTime: string;
  endTime: string;
  price: string;
  status: string;
  subjects: string[];
  students_count: number;
}

export interface TeacherAllocation {
  id: number;
  teacher: {
    id: number;
    name: string;
  };
  class_obj: ClassInfo;
  teacher_subjects: string[];
}

export interface TeacherClassesResponse {
  teacher: Teacher;
  classes: TeacherAllocation[];
}

// API functions
export const teacherAPI = {
  // Get all classes for a specific teacher
  getTeacherClasses: async (teacherId: number): Promise<TeacherAllocation[]> => {
    try {
      const response = await api.get(`/Teacher/${teacherId}/classes/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching teacher classes:', error);
      throw error;
    }
  },

  // Get specific class details for a teacher
  getTeacherClassDetail: async (teacherId: number, classId: number): Promise<TeacherAllocation> => {
    try {
      const response = await api.get(`/Teacher/${teacherId}/classes/${classId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching teacher class detail:', error);
      throw error;
    }
  },

  // Get students for a teacher and class (verifies teacher allocation)
  getTeacherClassStudents: async (teacherId: number, classId: number): Promise<any> => {
    try {
      const response = await api.get(`/Teacher/${teacherId}/class/${classId}/students/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching students for teacher and class:', error);
      throw error;
    }
  },

  // Get all teachers (for selection)
  getAllTeachers: async (): Promise<Teacher[]> => {
    try {
      const response = await api.get('/Academic/teachers/');
      return response.data;
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }
  },
};

export default api;
