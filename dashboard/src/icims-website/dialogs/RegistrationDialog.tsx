import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Checkbox,
  FormGroup,
  Card,
  CardContent,
  Alert,
  Divider,
  InputLabel,
  Box
} from '@mui/material';
import { UserAdd, Card as CardIcon, Money, Bank } from 'iconsax-react';

// project imports
import { 
  StudentRegistration, 
  PaymentInformation,
  initialFormData, 
  steps, 
  malaysianStates, 
  gradeLevels, 
  programs,
  paymentMethods
} from '../types';

interface RegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function RegistrationDialog({ open, onClose }: RegistrationDialogProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<StudentRegistration>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0: // Personal Information
        return !!(formData.fullName && formData.icNumber && formData.dateOfBirth && formData.gender);
      case 1: // Contact Details
        return !!(formData.address && formData.city && formData.state && formData.postcode && formData.phone && formData.email);
      case 2: // Academic Information
        return !!(formData.gradeLevel && formData.programInterest);
      case 3: // Parent/Guardian Details
        return !!(formData.parentName && formData.parentIC && formData.parentPhone && formData.emergencyContact && formData.emergencyPhone);
      case 4: // Payment Information
        if (!formData.payment.paymentMethod) return false;
        if (formData.payment.paymentMethod === 'card') {
          return !!(formData.payment.cardName && formData.payment.cardNumber && formData.payment.expiryDate && formData.payment.cvv);
        }
        if (formData.payment.paymentMethod === 'paypal') {
          return !!formData.payment.paypalEmail;
        }
        return true;
      default:
        return true;
    }
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

  const handleChange = (field: keyof StudentRegistration, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePaymentChange = (field: keyof PaymentInformation, value: string) => {
    let formattedValue = value;
    
    // Format card number with spaces
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      formattedValue = formattedValue.substring(0, 19); // Limit to 16 digits + 3 spaces
    }
    
    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
    }
    
    // Format CVV to numbers only
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    setFormData({ 
      ...formData, 
      payment: { ...formData.payment, [field]: formattedValue }
    });
  };

  const handleSubmit = () => {
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info">
                Choose your preferred payment method for the program fees.
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Payment Method</FormLabel>
                <RadioGroup
                  value={formData.payment.paymentMethod}
                  onChange={(e) => handlePaymentChange('paymentMethod', e.target.value)}
                >
                  {paymentMethods.map((method) => (
                    <FormControlLabel
                      key={method.value}
                      value={method.value}
                      control={<Radio />}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="subtitle1">{method.label}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {method.description}
                          </Typography>
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            {formData.payment.paymentMethod === 'card' && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CardIcon size={20} />
                    <Typography variant="h6">
                      Credit/Debit Card Information
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Cardholder Name"
                    fullWidth
                    required
                    value={formData.payment.cardName}
                    onChange={(e) => handlePaymentChange('cardName', e.target.value)}
                    placeholder="Name as shown on card"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Card Number"
                    fullWidth
                    required
                    value={formData.payment.cardNumber}
                    onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    inputProps={{ maxLength: 19 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Expiry Date"
                    fullWidth
                    required
                    value={formData.payment.expiryDate}
                    onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    inputProps={{ maxLength: 5 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="CVV"
                    fullWidth
                    required
                    value={formData.payment.cvv}
                    onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                    placeholder="123"
                    inputProps={{ maxLength: 4 }}
                  />
                </Grid>
              </>
            )}

            {formData.payment.paymentMethod === 'paypal' && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    PayPal Information
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="PayPal Email"
                    type="email"
                    fullWidth
                    required
                    value={formData.payment.paypalEmail}
                    onChange={(e) => handlePaymentChange('paypalEmail', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </Grid>
              </>
            )}

            {(formData.payment.paymentMethod === 'bank_transfer' || formData.payment.paymentMethod === 'installment') && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Payment Schedule
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Preferred Payment Date"
                    type="date"
                    fullWidth
                    value={formData.payment.preferredPaymentDate}
                    onChange={(e) => handlePaymentChange('preferredPaymentDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    helperText={formData.payment.paymentMethod === 'installment' ? 'Monthly payment date' : 'One-time payment date'}
                  />
                </Grid>
              </>
            )}
          </Grid>
        );

      case 5:
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
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Payment Information</Typography>
                    <Typography variant="body2">
                      Payment Method: {paymentMethods.find(m => m.value === formData.payment.paymentMethod)?.label || 'Not selected'}
                    </Typography>
                    {formData.payment.paymentMethod === 'card' && (
                      <>
                        <Typography variant="body2">Cardholder: {formData.payment.cardName}</Typography>
                        <Typography variant="body2">
                          Card: **** **** **** {formData.payment.cardNumber?.slice(-4)}
                        </Typography>
                      </>
                    )}
                    {formData.payment.paymentMethod === 'paypal' && (
                      <Typography variant="body2">PayPal: {formData.payment.paypalEmail}</Typography>
                    )}
                    {formData.payment.preferredPaymentDate && (
                      <Typography variant="body2">Payment Date: {formData.payment.preferredPaymentDate}</Typography>
                    )}
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

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          '& .MuiDialogTitle-root': {
            px: 4,
            py: 3
          },
          '& .MuiDialogContent-root': {
            px: 4,
            py: 0
          },
          '& .MuiDialogActions-root': {
            px: 4,
            py: 3
          }
        }
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
          <Stack spacing={3} sx={{ py: 3 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            <Typography variant="h6">{steps[activeStep]}</Typography>
            
            {renderStepContent(activeStep)}
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
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
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
