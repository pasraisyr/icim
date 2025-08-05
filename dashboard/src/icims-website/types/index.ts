import { ReactNode } from 'react';

// Layout types
export interface IcimsWebsiteLayoutProps {
  children: ReactNode;
}

// types
export interface PaymentInformation {
  paymentMethod: string;
  cardName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  paypalEmail?: string;
  preferredPaymentDate?: string;
}

export interface StudentRegistration {
  fullName: string;
  icNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  religion: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  currentSchool: string;
  gradeLevel: string;
  programInterest: string;
  parentName: string;
  parentIC: string;
  parentPhone: string;
  parentEmail: string;
  parentOccupation: string;
  previousIslamic: boolean;
  specialNeeds: string;
  emergencyContact: string;
  emergencyPhone: string;
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
  fullName: '',
  icNumber: '',
  dateOfBirth: '',
  gender: '',
  nationality: 'Malaysian',
  religion: 'Islam',
  address: '',
  city: '',
  state: '',
  postcode: '',
  phone: '',
  email: '',
  currentSchool: '',
  gradeLevel: '',
  programInterest: '',
  parentName: '',
  parentIC: '',
  parentPhone: '',
  parentEmail: '',
  parentOccupation: '',
  previousIslamic: false,
  specialNeeds: '',
  emergencyContact: '',
  emergencyPhone: '',
  payment: {
    paymentMethod: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paypalEmail: '',
    preferredPaymentDate: ''
  }
};

export const initialContactForm: ContactForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

export const steps = ['Personal Information', 'Contact Details', 'Academic Information', 'Parent/Guardian Details', 'Payment Information', 'Review & Submit'];

export const malaysianStates = [
  'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Malacca', 'Negeri Sembilan',
  'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'
];

export const gradeLevels = [
  'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6',
  'Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Form 6'
];

export const programs = [
  'Primary Islamic Education',
  'Secondary Islamic Education', 
  'Tuition Classes (SPM)',
  'Tuition Classes (STPM)',
  'Hafez Program',
  'Arabic Language Course'
];

export const paymentMethods = [
  { value: 'card', label: 'Credit/Debit Card', description: 'Secure payment with Visa, MasterCard' },
  { value: 'paypal', label: 'PayPal', description: 'Pay with your PayPal account' },
  { value: 'bank_transfer', label: 'Bank Transfer', description: 'Direct bank transfer' },
  { value: 'installment', label: 'Monthly Installment', description: 'Pay in monthly installments' }
];
