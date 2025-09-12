import { ReactNode } from 'react';

// Layout types
export interface IcimsWebsiteLayoutProps {
  children: ReactNode;
}

// types
export interface GuardianDetails {
  fullName: string;
  ic: string;
  phone_number: string;
}

export interface StudentDetails {
  first_name: string;
  last_name: string;
  ic: string;
  address: string;
}

export interface AcademicInfo {
  level: string;
  class: string;
  price: number;
  description: string;
}

export interface ClassMethod {
  type: string;
  schedule: string;
}

export interface PaymentInformation {
  paymentMethod: string;
  reference: string;
  receipt: File | null;
}

export interface StudentRegistration {
  guardian: GuardianDetails;
  student: StudentDetails;
  academic: AcademicInfo;
  classMethod: ClassMethod;
  payment: PaymentInformation;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const initialFormData: StudentRegistration = {
  guardian: {
    fullName: '',
    ic: '',
    phone_number: ''
  },
  student: {
    first_name: '',
    last_name: '',
    ic: '',
    address: ''
  },
  academic: {
    level: '',
    class: '',
    price: 0,
    description: ''
  },
  classMethod: {
    type: '',
    schedule: ''
  },
  payment: {
    paymentMethod: '',
    reference: '',
    receipt: null
  }
};

export const initialContactForm: ContactForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

export const steps = ['Maklumat Penjaga', 'Maklumat Pelajar', 'Maklumat Akademik', 'Kaedah Kelas', 'Pembayaran'];

export const academicLevels = {
  primary: {
    name: 'Primary Level',
    classes: [
      { id: 'primary-1', name: 'Standard 1', price: 150, description: 'Basic Islamic studies and Arabic fundamentals' },
      { id: 'primary-2', name: 'Standard 2', price: 150, description: 'Continued Islamic education with Quran recitation' },
      { id: 'primary-3', name: 'Standard 3', price: 160, description: 'Advanced primary Islamic studies' },
      { id: 'primary-4', name: 'Standard 4', price: 160, description: 'Islamic history and culture introduction' },
      { id: 'primary-5', name: 'Standard 5', price: 170, description: 'Comprehensive Islamic education' },
      { id: 'primary-6', name: 'Standard 6', price: 170, description: 'UPSR preparation with Islamic focus' },
    ]
  },
  secondary: {
    name: 'Secondary Level',
    classes: [
      { id: 'form-1', name: 'Form 1', price: 200, description: 'Introduction to advanced Islamic studies' },
      { id: 'form-2', name: 'Form 2', price: 200, description: 'Islamic jurisprudence basics' },
      { id: 'form-3', name: 'Form 3', price: 210, description: 'PMR preparation with Islamic subjects' },
      { id: 'form-4', name: 'Form 4', price: 220, description: 'SPM Islamic studies preparation' },
      { id: 'form-5', name: 'Form 5', price: 220, description: 'Final SPM preparation and Islamic philosophy' },
    ]
  },
  tuition: {
    name: 'Tuition Classes',
    classes: [
      { id: 'spm-prep', name: 'SPM Preparation', price: 250, description: 'Comprehensive SPM subjects with Islamic perspective' },
      { id: 'stpm-prep', name: 'STPM Preparation', price: 300, description: 'Advanced level preparation for university entrance' },
      { id: 'arabic-intensive', name: 'Arabic Intensive', price: 180, description: 'Intensive Arabic language course' },
      { id: 'quran-tajweed', name: 'Quran & Tajweed', price: 120, description: 'Quran recitation and Tajweed rules' },
    ]
  }
};

export const classMethods = [
  { value: 'physical', label: 'Physical Classes', schedule: 'Monday to Friday, 8:00 AM - 12:00 PM' },
  { value: 'online', label: 'Online Classes', schedule: 'Flexible timing with recorded sessions' },
  { value: 'hybrid', label: 'Hybrid Classes', schedule: 'Combination of physical and online sessions' },
  { value: 'weekend', label: 'Weekend Classes', schedule: 'Saturday & Sunday, 9:00 AM - 1:00 PM' },
];

export const bankDetails = {
  bankName: 'Maybank',
  accountNumber: '1234 5678 9012',
  accountName: 'ICIMS Education Center',
  swiftCode: 'MBBEMYKL'
};
