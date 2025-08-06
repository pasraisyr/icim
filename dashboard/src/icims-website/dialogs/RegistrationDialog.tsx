import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Divider,
  Chip,
  Stack,
  useTheme,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DocumentUpload, Bank, ScanBarcode, TickCircle, UserAdd } from 'iconsax-react';

// project imports
import { 
  StudentRegistration, 
  GuardianDetails,
  StudentDetails,
  AcademicInfo,
  ClassMethod,
  PaymentInformation,
  initialFormData, 
  steps, 
  academicLevels,
  classMethods,
  bankDetails
} from '../types';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface RegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function RegistrationDialog({ open, onClose }: RegistrationDialogProps) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<StudentRegistration>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const isStepValid = (step: number): boolean => {
    // Allow all steps to be accessible without validation
    // Only validate on final submission
    return true;
  };

  const isFormComplete = (): boolean => {
    // Check if all required fields are filled for final submission
    return !!(
      formData.guardian.fullName && 
      formData.guardian.ic && 
      formData.guardian.phoneNumber &&
      formData.student.fullName && 
      formData.student.ic && 
      formData.student.address &&
      formData.academic.level && 
      formData.academic.class &&
      formData.classMethod.type &&
      formData.payment.paymentMethod && 
      formData.payment.reference &&
      formData.payment.receipt
    );
  };

  const handleClose = () => {
    onClose();
    setActiveStep(0);
    setFormData(initialFormData);
    setSubmitted(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleGuardianChange = (field: keyof GuardianDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      guardian: { ...prev.guardian, [field]: value }
    }));
  };

  const handleStudentChange = (field: keyof StudentDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      student: { ...prev.student, [field]: value }
    }));
  };

  const handleLevelChange = (level: string) => {
    setFormData(prev => ({
      ...prev,
      academic: {
        level,
        class: '',
        price: 0,
        description: ''
      }
    }));
  };

  const handleClassChange = (classId: string) => {
    const selectedLevel = academicLevels[formData.academic.level as keyof typeof academicLevels];
    const selectedClass = selectedLevel?.classes.find(cls => cls.id === classId);
    if (selectedClass) {
      setFormData(prev => ({
        ...prev,
        academic: {
          ...prev.academic,
          class: classId,
          price: selectedClass.price,
          description: selectedClass.description
        }
      }));
    }
  };

  const handleClassMethodChange = (method: string) => {
    const selectedMethod = classMethods.find(m => m.value === method);
    setFormData(prev => ({
      ...prev,
      classMethod: {
        type: method,
        schedule: selectedMethod?.schedule || ''
      }
    }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData(prev => ({
      ...prev,
      payment: { ...prev.payment, paymentMethod: method }
    }));
  };

  const handlePaymentReferenceChange = (reference: string) => {
    setFormData(prev => ({
      ...prev,
      payment: { ...prev.payment, reference }
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        payment: { ...prev.payment, receipt: file }
      }));
    }
  };

  const handleSubmit = () => {
    console.log('Registration data:', formData);
    setSubmitted(true);
  };
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: // Guardian Details
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Guardian Information</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                All fields are required for final submission
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.guardian.fullName}
                onChange={(e) => handleGuardianChange('fullName', e.target.value)}
                required
                helperText="Required field"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="IC Number"
                value={formData.guardian.ic}
                onChange={(e) => handleGuardianChange('ic', e.target.value)}
                placeholder="123456-78-9012"
                required
                helperText="Required field"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.guardian.phoneNumber}
                onChange={(e) => handleGuardianChange('phoneNumber', e.target.value)}
                placeholder="+60 12-345 6789"
                required
                helperText="Required field"
              />
            </Grid>
          </Grid>
        );

      case 1: // Student Details
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Student Information</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                All fields are required for final submission
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.student.fullName}
                onChange={(e) => handleStudentChange('fullName', e.target.value)}
                required
                helperText="Required field"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="IC Number"
                value={formData.student.ic}
                onChange={(e) => handleStudentChange('ic', e.target.value)}
                placeholder="123456-78-9012"
                required
                helperText="Required field"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={formData.student.address}
                onChange={(e) => handleStudentChange('address', e.target.value)}
                multiline
                rows={3}
                required
                helperText="Required field"
              />
            </Grid>
          </Grid>
        );

      case 2: // Academic Information
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Academic Information</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Please select your education level and preferred class
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Education Level</InputLabel>
                <Select
                  value={formData.academic.level}
                  onChange={(e) => handleLevelChange(e.target.value)}
                  label="Education Level"
                >
                  <MenuItem value="primary">Primary Level (Ages 7-12)</MenuItem>
                  <MenuItem value="secondary">Secondary Level (Ages 13-17)</MenuItem>
                  <MenuItem value="tuition">Tuition Classes (SPM & STPM)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {formData.academic.level && (
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Class</InputLabel>
                  <Select
                    value={formData.academic.class}
                    onChange={(e) => handleClassChange(e.target.value)}
                    label="Class"
                  >
                    {academicLevels[formData.academic.level as keyof typeof academicLevels]?.classes.map((cls) => (
                      <MenuItem key={cls.id} value={cls.id}>
                        {cls.name} - RM {cls.price}/month
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {formData.academic.class && (
              <Grid item xs={12}>
                <Card sx={{ bgcolor: 'primary.lighter' }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="h6">Selected Class</Typography>
                      <Chip label={`RM ${formData.academic.price}/month`} color="primary" />
                    </Stack>
                    <Typography variant="body2" color="textSecondary">
                      {formData.academic.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        );

      case 3: // Class Method
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Class Method</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Choose your preferred learning method
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Select Class Type</FormLabel>
                <RadioGroup
                  value={formData.classMethod.type}
                  onChange={(e) => handleClassMethodChange(e.target.value)}
                  sx={{ mt: 2 }}
                >
                  {classMethods.map((method) => (
                    <FormControlLabel
                      key={method.value}
                      value={method.value}
                      control={<Radio />}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {method.label}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {method.schedule}
                          </Typography>
                        </Box>
                      }
                      sx={{ 
                        mb: 2, 
                        p: 2, 
                        border: '1px solid',
                        borderColor: formData.classMethod.type === method.value ? 'primary.main' : 'grey.300',
                        borderRadius: 1,
                        bgcolor: formData.classMethod.type === method.value ? 'primary.lighter' : 'transparent',
                        '&:hover': {
                          bgcolor: 'grey.50'
                        }
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 4: // Payment Information
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Payment Information</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Complete your payment and upload receipt for verification
              </Typography>
            </Grid>
            
            {/* Payment Summary */}
            <Grid item xs={12}>
              <Card sx={{ bgcolor: 'success.lighter', border: '1px solid', borderColor: 'success.main' }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6" color="success.dark">Payment Summary</Typography>
                      <Typography variant="body2" color="success.dark">
                        {formData.academic.class ? 
                          academicLevels[formData.academic.level as keyof typeof academicLevels]?.classes.find(cls => cls.id === formData.academic.class)?.name 
                          : 'No class selected'}
                      </Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography variant="h4" color="success.dark" fontWeight="bold">
                        RM {formData.academic.price || 0}
                      </Typography>
                      <Typography variant="body2" color="success.dark">
                        /month
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={formData.payment.paymentMethod}
                  onChange={(e) => handlePaymentMethodChange(e.target.value)}
                  label="Payment Method"
                >
                  <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                  <MenuItem value="qr_payment">QR Code Payment</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {formData.payment.paymentMethod && (
              <Grid item xs={12}>
                <Card sx={{ p: 2 }}>
                  <CardContent>
                    <Stack spacing={3}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Bank size={24} color={theme.palette.primary.main} />
                        <Typography variant="h6">Bank Account Details</Typography>
                      </Box>
                      <Divider />
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" color="textSecondary">Bank Name</Typography>
                          <Typography variant="body1">{bankDetails.bankName}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" color="textSecondary">Account Number</Typography>
                          <Typography variant="body1">{bankDetails.accountNumber}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" color="textSecondary">Account Name</Typography>
                          <Typography variant="body1">{bankDetails.accountName}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" color="textSecondary">Amount to Pay</Typography>
                          <Typography variant="body1" fontWeight="bold" color="error.main">
                            RM {formData.academic.price || 0}
                          </Typography>
                        </Grid>
                      </Grid>
                      
                      <Divider />
                      
                      <Box display="flex" alignItems="center" gap={1}>
                        <ScanBarcode size={24} color={theme.palette.primary.main} />
                        <Typography variant="h6">QR Code Payment</Typography>
                      </Box>
                      
                      <Box textAlign="center">
                        <Box 
                          sx={{ 
                            width: 200, 
                            height: 200, 
                            bgcolor: 'grey.100', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            mx: 'auto',
                            border: '2px dashed',
                            borderColor: 'grey.300'
                          }}
                        >
                          <Typography variant="body2" color="textSecondary">
                            QR Code<br />
                            (Scan with banking app)
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Divider />
                      
                      <Typography variant="h6">Payment Reference</Typography>
                      <TextField
                        fullWidth
                        label="Payment Reference"
                        value={formData.payment.reference}
                        onChange={(e) => handlePaymentReferenceChange(e.target.value)}
                        placeholder="Enter payment reference (e.g., transaction ID, reference number)"
                        helperText="Please provide the reference number from your payment transaction"
                        required
                      />
                      
                      <Typography variant="h6">Upload Payment Receipt</Typography>
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<DocumentUpload />}
                        fullWidth
                      >
                        {formData.payment.receipt ? formData.payment.receipt.name : 'Upload Receipt'}
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileUpload}
                        />
                      </Button>
                      
                      {formData.payment.receipt && (
                        <Alert severity="success">
                          Receipt uploaded successfully: {formData.payment.receipt.name}
                        </Alert>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { minHeight: '600px' }
      }}
    >
      <DialogTitle>
        {submitted ? 'Registration Successful!' : 'Student Registration'}
      </DialogTitle>
      
      <DialogContent>
        {submitted ? (
          <Stack spacing={3} alignItems="center" sx={{ py: 4 }}>
            <UserAdd size={60} color="#4caf50" />
            <Typography variant="h6" textAlign="center">
              Thank you for your registration!
            </Typography>
            <Typography variant="body2" textAlign="center" color="textSecondary">
              We will review your application and contact you within 3-5 business days.
            </Typography>
            <Typography variant="body2" textAlign="center">
              Registration Reference: REG-{Date.now()}
            </Typography>
          </Stack>
        ) : (
          <>
            <Box sx={{ mb: 4 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              {renderStepContent(activeStep)}
            </Box>
          </>
        )}
      </DialogContent>
      
      <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
        {submitted ? (
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        ) : (
          <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            
            <Box>
              {activeStep === steps.length - 1 ? (
                <>
                  {!isFormComplete() && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      Please complete all required fields before submitting your registration.
                    </Alert>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!isFormComplete()}
                  >
                    Submit Registration
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!isStepValid(activeStep)}
                >
                  Next
                </Button>
              )}
            </Box>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
