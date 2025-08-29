import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
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
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  styled
} from '@mui/material';

// project imports
import {
  StudentRegistration,
  GuardianDetails,
  StudentDetails,
  initialFormData,
  steps,
  classMethods,
  bankDetails
} from '../types';
import { Bank, DocumentUpload, ScanBarcode, UserAdd } from 'iconsax-react';

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
  // Payment selection state and handler
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const handlePaymentCheckbox = (key: string) => {
    setSelectedPayments(prev =>
      prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
    );
  };

  // fetched classes
  const [classes, setClasses] = useState<{ id: number; name: string; price: number; description: string; level?: string }[]>([]);

  // Map frontend level value to backend class level
  const levelMap: Record<string, string> = {
  'Tahap Rendah': 'Tahap Rendah',
  'Tahap Menengah': 'Tahap Menengah',
  'Kelas Tuisyen': 'Kelas Tuisyen',
  'Aktiviti Kokurikulum': 'Aktiviti Kokurikulum'
  };

  const theme = useTheme();

  useEffect(() => {
    // Fetch classes from backend when dialog opens
    if (open) {
      axios.get('http://localhost:8000/api/Academic/classes/')
        .then(res => {
          setClasses(res.data || []);
        })
        .catch(() => {
          setClasses([]);
        });
    }
  }, [open]);

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<StudentRegistration>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  // --- NEW: centralize payment options and compute total ---
  const paymentOptions = useMemo(() => ([
    { key: 'registration', label: 'Registration', amount: 20 },
    { key: 'depo',         label: 'Depo',         amount: 50 },
    { key: 'modul',        label: 'Modul',        amount: 80 },
    { key: 'class',        label: 'Class',        amount: formData.academic.price || 0 }
  ]), [formData.academic.price]);

  const totalPayment = useMemo(() => {
    const sum = selectedPayments.reduce((sum, key) => {
      const item = paymentOptions.find(p => p.key === key);
      return sum + (item?.amount || 0);
    }, 0);
    return typeof sum === 'number' && !isNaN(sum) ? sum : 0;
  }, [selectedPayments, paymentOptions]);

  const isStepValid = (_step: number): boolean => {
    // Allow all steps to be accessible without validation; only validate on final submission
    return true;
  };

  const isFormComplete = (): boolean => {
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
      formData.payment.receipt &&
      selectedPayments.length > 0 // ensure they actually selected what they’re paying for
    );
  };

  const handleClose = () => {
    onClose();
    setActiveStep(0);
    setFormData(initialFormData);
    setSelectedPayments([]);
    setSubmitted(false);
  };

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleGuardianChange = (field: keyof GuardianDetails, value: string) => {
    setFormData(prev => ({ ...prev, guardian: { ...prev.guardian, [field]: value } }));
  };

  const handleStudentChange = (field: keyof StudentDetails, value: string) => {
    setFormData(prev => ({ ...prev, student: { ...prev.student, [field]: value } }));
  };

  const handleLevelChange = (level: string) => {
    setFormData(prev => ({
      ...prev,
      academic: { level, class: '', price: 0, description: '' }
    }));
    // if "class" payment was selected, unselect it because class changed
    setSelectedPayments(prev => prev.filter(k => k !== 'class'));
  };

  const handleClassChange = (classId: string | number) => {
    const selectedClass = classes.find(cls => String(cls.id) === String(classId));
    setFormData(prev => ({
      ...prev,
      academic: {
        ...prev.academic,
        class: String(classId),
        price: selectedClass?.price || 0,
        description: selectedClass?.description || ''
      }
    }));
    // if user had "class" selected, keep it; if not, leave as-is (they can tick it)
  };

  const handleClassMethodChange = (method: string) => {
    const selectedMethod = classMethods.find(m => m.value === method);
    setFormData(prev => ({
      ...prev,
      classMethod: { type: method, schedule: selectedMethod?.schedule || '' }
    }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData(prev => ({ ...prev, payment: { ...prev.payment, paymentMethod: method } }));
  };

  const handlePaymentReferenceChange = (reference: string) => {
    setFormData(prev => ({ ...prev, payment: { ...prev.payment, reference } }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, payment: { ...prev.payment, receipt: file } }));
    }
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append('guardianName', formData.guardian.fullName);
    form.append('guardianIC', formData.guardian.ic);
    form.append('guardianPhone', formData.guardian.phoneNumber);
    form.append('studentName', formData.student.fullName);
    form.append('studentIC', formData.student.ic);
    form.append('address', formData.student.address);
    form.append('level', formData.academic.level);
    form.append('studentClass', formData.academic.class);
    form.append('class_method', formData.classMethod.type);
    form.append('payment_method', formData.payment.paymentMethod);
    form.append('payment_reference', formData.payment.reference);
    if (formData.payment.receipt) form.append('payment_receipt', formData.payment.receipt);
    form.append('status', 'inactive');

    // (Optional) include detailed breakdown for backend if you want:
    form.append('selected_payments', JSON.stringify(selectedPayments));
    form.append('total_amount', String(totalPayment));

    try {
      await axios.post(
        'http://localhost:8000/api/Frontend/self-registration/',
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setSubmitted(true);
    } catch (error: any) {
      alert('Registration failed: ' + JSON.stringify(error?.response?.data));
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: // Guardian Details
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Maklumat Penjaga</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Semua maklumat diperlukan untuk penyerahan akhir
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nama Penuh"
                value={formData.guardian.fullName}
                onChange={(e) => handleGuardianChange('fullName', e.target.value)}
                required
                helperText="Wajib diisi"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombor IC"
                value={formData.guardian.ic}
                onChange={(e) => handleGuardianChange('ic', e.target.value)}
                placeholder="123456-78-9012"
                required
                helperText="Wajib diisi"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombor Telefon"
                value={formData.guardian.phoneNumber}
                onChange={(e) => handleGuardianChange('phoneNumber', e.target.value)}
                placeholder="+60 12-345 6789"
                required
                helperText="Wajib diisi"
              />
            </Grid>
          </Grid>
        );

      case 1: // Student Details
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Maklumat Pelajar</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Semua maklumat diperlukan untuk penyerahan akhir
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nama Penuh"
                value={formData.student.fullName}
                onChange={(e) => handleStudentChange('fullName', e.target.value)}
                required
                helperText="Wajib diisi"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombor IC"
                value={formData.student.ic}
                onChange={(e) => handleStudentChange('ic', e.target.value)}
                placeholder="123456-78-9012"
                required
                helperText="Wajib diisi"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Alamat"
                value={formData.student.address}
                onChange={(e) => handleStudentChange('address', e.target.value)}
                multiline
                rows={3}
                required
                helperText="Wajib diisi"
              />
            </Grid>
          </Grid>
        );

      case 2: // Academic Information
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Maklumat Akademik</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Sila pilih tahap pendidikan dan kelas pilihan anda
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Tahap Pendidikan</InputLabel>
                <Select
                  value={formData.academic.level}
                  onChange={(e) => handleLevelChange(e.target.value)}
                  label="Tahap Pendidikan"
                >
                  <MenuItem value="Tahap Rendah">Tahap Rendah (Umur 7-12)</MenuItem>
                  <MenuItem value="Tahap Menengah">Tahap Menengah (Umur 13-17)</MenuItem>
                  <MenuItem value="Kelas Tuisyen">Kelas Tuisyen (SPM & STPM)</MenuItem>
                  <MenuItem value="Aktiviti Kokurikulum">Aktiviti Kokurikulum</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {formData.academic.level && (
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Kelas</InputLabel>
                  <Select
                    value={formData.academic.class}
                    onChange={(e) => handleClassChange(e.target.value)}
                    label="Kelas"
                  >
                    {classes
                      .filter(cls => formData.academic.level && cls.level === formData.academic.level)
                      .map((cls) => (
                        <MenuItem key={cls.id} value={String(cls.id)}>
                          {cls.name} {cls.level ? `(${cls.level})` : ''} - RM {cls.price}/bulan
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
                      <Typography variant="h6">Kelas Dipilih</Typography>
                      <Chip label={`RM ${formData.academic.price}/bulan`} color="primary" />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {formData.academic.description}
                    </Typography>
                    <Typography variant="body2" color="primary.main" sx={{ mt: 1 }}>
                      Tahap: {classes.find(cls => String(cls.id) === String(formData.academic.class))?.level || 'N/A'}
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
              <Typography variant="h6" gutterBottom>Kaedah Kelas</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Pilih kaedah pembelajaran pilihan anda
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Pilih Jenis Kelas</FormLabel>
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
                          <Typography variant="body2" color="text.secondary">
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
                        '&:hover': { bgcolor: 'grey.50' }
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
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Please select payment items and provide payment details.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={2}>
                {paymentOptions.map(opt => (
                  <FormControlLabel
                    key={opt.key}
                    control={
                      <Checkbox
                        checked={selectedPayments?.includes(opt.key)}
                        onChange={() => handlePaymentCheckbox(opt.key)}
                        disabled={opt.key === 'class' && !formData.academic.class}
                      />
                    }
                    label={`${opt.label} (RM ${opt.amount})`}
                  />
                ))}
                <Divider />
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600 }}>
                    Total: RM {
                      paymentOptions
                        .filter(opt => selectedPayments?.includes(opt.key))
                        .reduce((sum, opt) => sum + Number(opt.amount || 0), 0)
                        .toFixed(2)
                    }
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 2 }}>
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
                          <Typography variant="body2" color="text.secondary">Bank Name</Typography>
                          <Typography variant="body1">{bankDetails.bankName}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" color="text.secondary">Account Number</Typography>
                          <Typography variant="body1">{bankDetails.accountNumber}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" color="text.secondary">Account Name</Typography>
                          <Typography variant="body1">{bankDetails.accountName}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" color="text.secondary">Amount to Pay</Typography>
                          <Typography variant="body1" fontWeight="bold" color="error.main">
                            RM {(typeof totalPayment === 'number' ? totalPayment : 0).toFixed(2)}
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
                          <Typography variant="body2" color="text.secondary">
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
      PaperProps={{ sx: { minHeight: '600px' } }}
    >
      <DialogTitle>
        {submitted ? 'Pendaftaran Berjaya!' : 'Pendaftaran Pelajar'}
      </DialogTitle>

      <DialogContent>
        {submitted ? (
          <Stack spacing={3} alignItems="center" sx={{ py: 4 }}>
            <UserAdd size={60} color="#4caf50" />
            <Typography variant="h6" textAlign="center">
              Terima kasih atas pendaftaran anda!
            </Typography>
            <Typography variant="body2" textAlign="center" color="text.secondary">
              Kami akan menyemak permohonan anda dan menghubungi anda dalam 3-5 hari bekerja.
            </Typography>
            <Typography variant="body2" textAlign="center">
              Rujukan Pendaftaran: REG-{Date.now()}
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
            Tutup
          </Button>
        ) : (
          <>
            <Button onClick={handleClose}>Batal</Button>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Kembali
            </Button>

            <Box>
              {activeStep === steps.length - 1 ? (
                <>
                  {!isFormComplete() && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      Sila lengkapkan semua maklumat wajib sebelum menghantar pendaftaran anda.
                    </Alert>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!isFormComplete()}
                  >
                    Hantar Pendaftaran
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!isStepValid(activeStep)}
                >
                  Seterusnya
                </Button>
              )}
            </Box>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
