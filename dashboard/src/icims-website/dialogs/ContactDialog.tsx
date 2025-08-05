import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  Alert
} from '@mui/material';
import { Send } from 'iconsax-react';

// project imports
import { ContactForm, initialContactForm } from '../types';

interface ContactDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactDialog({ open, onClose }: ContactDialogProps) {
  const [contactForm, setContactForm] = useState<ContactForm>(initialContactForm);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    onClose();
    setContactForm(initialContactForm);
    setSubmitted(false);
  };

  const handleChange = (field: keyof ContactForm, value: string) => {
    setContactForm({ ...contactForm, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form data:', contactForm);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      handleClose();
    }, 3000);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Contact Us</DialogTitle>
      <DialogContent>
        {submitted ? (
          <Alert severity="success" sx={{ mt: 2 }}>
            Thank you for your message! We'll get back to you soon.
          </Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="Full Name"
                fullWidth
                required
                value={contactForm.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                required
                value={contactForm.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              <TextField
                label="Phone Number"
                fullWidth
                value={contactForm.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              <TextField
                label="Subject"
                fullWidth
                required
                value={contactForm.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
              />
              <TextField
                label="Message"
                multiline
                rows={4}
                fullWidth
                required
                value={contactForm.message}
                onChange={(e) => handleChange('message', e.target.value)}
              />
            </Stack>
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          {submitted ? 'Close' : 'Cancel'}
        </Button>
        {!submitted && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<Send />}
            disabled={!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message}
          >
            Send Message
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
