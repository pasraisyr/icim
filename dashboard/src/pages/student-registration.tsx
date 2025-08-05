import { useState } from 'react';

// material-ui
import {
  Container,
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Box,
  Alert,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup
} from '@mui/material';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { UserAdd, Profile2User, Book1, Call } from 'iconsax-react';

// types
interface StudentRegistration {
  // Personal Information
  fullName: string;
  icNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  religion: string;
  
  // Contact Information
  address: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  
  // Academic Information
  currentSchool: string;
  gradeLevel: string;
  programInterest: string;
  
  // Parent/Guardian Information
  parentName: string;
  parentIC: string;
  parentPhone: string;
  parentEmail: string;
  parentOccupation: string;
  
  // Additional Information
  previousIslamic: boolean;
  specialNeeds: string;
  emergencyContact: string;
  emergencyPhone: string;
}

const initialFormData: StudentRegistration = {
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
  emergencyPhone: ''
};

const steps = ['Personal Information', 'Contact Details', 'Academic Information', 'Parent/Guardian Details', 'Review & Submit'];

const malaysianStates = [
  'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Malacca', 'Negeri Sembilan',
  'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'
];

const gradeLevels = [
  'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6',
  'Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Form 6'
];

const programs = [
  'Primary Islamic Education',
  'Secondary Islamic Education', 
  'Tuition Classes (SPM)',
  'Tuition Classes (STPM)',
  'Hafez Program',
  'Arabic Language Course'
];

// ==============================|| STUDENT REGISTRATION ||============================== //

export default function StudentRegistration() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<StudentRegistration>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (field: keyof StudentRegistration, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Registration data:', formData);
    setSubmitted(true);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Full Name"
                fullWidth
                required
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="IC Number / Passport"
                fullWidth
                required
                value={formData.icNumber}
                onChange={(e) => handleChange('icNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date of Birth"
                type="date"
                fullWidth
                required
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nationality"
                fullWidth
                value={formData.nationality}
                onChange={(e) => handleChange('nationality', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Religion"
                fullWidth
                value={formData.religion}
                onChange={(e) => handleChange('religion', e.target.value)}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Address"
                fullWidth
                multiline
                rows={3}
                required
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="City"
                fullWidth
                required
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="State"
                select
                fullWidth
                required
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
              >
                {malaysianStates.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Postcode"
                fullWidth
                required
                value={formData.postcode}
                onChange={(e) => handleChange('postcode', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone Number"
                fullWidth
                required
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Current School"
                fullWidth
                value={formData.currentSchool}
                onChange={(e) => handleChange('currentSchool', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Grade Level"
                select
                fullWidth
                required
                value={formData.gradeLevel}
                onChange={(e) => handleChange('gradeLevel', e.target.value)}
              >
                {gradeLevels.map((grade) => (
                  <MenuItem key={grade} value={grade}>
                    {grade}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Program of Interest"
                select
                fullWidth
                required
                value={formData.programInterest}
                onChange={(e) => handleChange('programInterest', e.target.value)}
              >
                {programs.map((program) => (
                  <MenuItem key={program} value={program}>
                    {program}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.previousIslamic}
                      onChange={(e) => handleChange('previousIslamic', e.target.checked)}
                    />
                  }
                  label="Has previous Islamic education background"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Special Needs / Additional Information"
                fullWidth
                multiline
                rows={3}
                value={formData.specialNeeds}
                onChange={(e) => handleChange('specialNeeds', e.target.value)}
                placeholder="Please specify any special needs or additional information..."
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Parent/Guardian Name"
                fullWidth
                required
                value={formData.parentName}
                onChange={(e) => handleChange('parentName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Parent/Guardian IC"
                fullWidth
                required
                value={formData.parentIC}
                onChange={(e) => handleChange('parentIC', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Parent Phone"
                fullWidth
                required
                value={formData.parentPhone}
                onChange={(e) => handleChange('parentPhone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Parent Email"
                type="email"
                fullWidth
                value={formData.parentEmail}
                onChange={(e) => handleChange('parentEmail', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Parent Occupation"
                fullWidth
                value={formData.parentOccupation}
                onChange={(e) => handleChange('parentOccupation', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Emergency Contact Name"
                fullWidth
                required
                value={formData.emergencyContact}
                onChange={(e) => handleChange('emergencyContact', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Emergency Contact Phone"
                fullWidth
                required
                value={formData.emergencyPhone}
                onChange={(e) => handleChange('emergencyPhone', e.target.value)}
              />
            </Grid>
          </Grid>
        );

      case 4:
        return (
          <Stack spacing={3}>
            <Alert severity="info">
              Please review your information before submitting your registration.
            </Alert>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Personal Information</Typography>
                    <Typography variant="body2">Name: {formData.fullName}</Typography>
                    <Typography variant="body2">IC: {formData.icNumber}</Typography>
                    <Typography variant="body2">Date of Birth: {formData.dateOfBirth}</Typography>
                    <Typography variant="body2">Gender: {formData.gender}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Academic Information</Typography>
                    <Typography variant="body2">Grade Level: {formData.gradeLevel}</Typography>
                    <Typography variant="body2">Program: {formData.programInterest}</Typography>
                    <Typography variant="body2">Current School: {formData.currentSchool}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Contact Information</Typography>
                    <Typography variant="body2">Phone: {formData.phone}</Typography>
                    <Typography variant="body2">Email: {formData.email}</Typography>
                    <Typography variant="body2">Address: {formData.address}, {formData.city}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Parent/Guardian</Typography>
                    <Typography variant="body2">Name: {formData.parentName}</Typography>
                    <Typography variant="body2">Phone: {formData.parentPhone}</Typography>
                    <Typography variant="body2">Email: {formData.parentEmail}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        );

      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <MainCard>
          <Stack spacing={3} alignItems="center">
            <UserAdd size={60} color="#4caf50" />
            <Typography variant="h4" color="primary" textAlign="center">
              Registration Submitted Successfully!
            </Typography>
            <Typography variant="body1" textAlign="center" color="textSecondary">
              Thank you for your registration. We will review your application and contact you within 3-5 business days.
            </Typography>
            <Typography variant="body2" textAlign="center">
              Registration Reference: REG-{Date.now()}
            </Typography>
            <Button variant="contained" onClick={() => window.history.back()}>
              Back to ICIMS Website
            </Button>
          </Stack>
        </MainCard>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={4}>
        {/* Header */}
        <MainCard>
          <Stack alignItems="center" spacing={2}>
            <UserAdd size={50} color="#1976d2" />
            <Typography variant="h3" color="primary">
              Student Registration
            </Typography>
            <Typography variant="body1" textAlign="center" color="textSecondary">
              Join ICIMS and begin your journey towards academic and spiritual excellence
            </Typography>
          </Stack>
        </MainCard>

        {/* Stepper */}
        <Card>
          <CardContent>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>

        {/* Form Content */}
        <MainCard>
          <Stack spacing={4}>
            <Typography variant="h5" color="primary">
              {steps[activeStep]}
            </Typography>
            
            {renderStepContent(activeStep)}
            
            {/* Navigation Buttons */}
            <Stack direction="row" justifyContent="space-between">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  startIcon={<UserAdd />}
                >
                  Submit Registration
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Stack>
          </Stack>
        </MainCard>
      </Stack>
    </Container>
  );
}
