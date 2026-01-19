import { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Stack,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Alert
} from '@mui/material';
import { Add, Edit, Delete, CloudUpload } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import { Gallery, GalleryFormData, fetchGalleries, createGallery, updateGallery, deleteGallery } from './api';

const initialFormData: GalleryFormData = {
  title: '',
  description: '',
  order: 0,
  status: true
};

export default function GalleryManagement() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentGallery, setCurrentGallery] = useState<GalleryFormData>(initialFormData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    loadGalleries();
  }, []);

  const loadGalleries = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGalleries();
      setGalleries(data);
    } catch (e) {
      setError('Failed to fetch galleries');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentGallery(initialFormData);
    setImagePreview(null);
    setImageFile(null);
  };

  const handleEdit = (gallery: Gallery) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(gallery.id);
    setCurrentGallery({
      title: gallery.title,
      description: gallery.description || '',
      order: gallery.order,
      status: gallery.status
    });
    setImagePreview(gallery.image);
    setImageFile(null);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentGallery(initialFormData);
    setEditingId(null);
    setImagePreview(null);
    setImageFile(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setError(null);
    try {
      const formData = new FormData();
      formData.append('title', currentGallery.title);
      formData.append('description', currentGallery.description || '');
      formData.append('order', currentGallery.order.toString());
      formData.append('status', currentGallery.status.toString());
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (editMode && editingId !== null) {
        await updateGallery(editingId, formData);
      } else {
        if (!imageFile) {
          setError('Please select an image');
          return;
        }
        await createGallery(formData);
      }
      
      await loadGalleries();
      handleClose();
    } catch (e) {
      setError('Failed to save gallery');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      setError(null);
      try {
        await deleteGallery(id);
        await loadGalleries();
      } catch (e) {
        setError('Failed to delete gallery');
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4">Gallery Management</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleOpen}
            >
              Add Photo
            </Button>
          </Stack>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Grid container spacing={3}>
            {galleries.map((gallery) => (
              <Grid item xs={12} sm={6} md={4} key={gallery.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={gallery.image}
                    alt={gallery.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {gallery.title}
                    </Typography>
                    {gallery.description && (
                      <Typography variant="body2" color="text.secondary">
                        {gallery.description}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                      Order: {gallery.order} | Status: {gallery.status ? 'Active' : 'Inactive'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton size="small" color="primary" onClick={() => handleEdit(gallery)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(gallery.id)}>
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {galleries.length === 0 && !loading && (
            <Box textAlign="center" py={4}>
              <Typography color="text.secondary">No gallery photos yet. Add your first photo!</Typography>
            </Box>
          )}
        </MainCard>
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Photo' : 'Add New Photo'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Title"
              fullWidth
              value={currentGallery.title}
              onChange={(e) => setCurrentGallery({ ...currentGallery, title: e.target.value })}
              required
            />
            
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={currentGallery.description}
              onChange={(e) => setCurrentGallery({ ...currentGallery, description: e.target.value })}
            />

            <TextField
              label="Order"
              type="number"
              fullWidth
              value={currentGallery.order}
              onChange={(e) => setCurrentGallery({ ...currentGallery, order: parseInt(e.target.value) || 0 })}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={currentGallery.status}
                  onChange={(e) => setCurrentGallery({ ...currentGallery, status: e.target.checked })}
                />
              }
              label="Active"
            />

            <Box>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUpload />}
                fullWidth
              >
                {imageFile ? 'Change Image' : 'Upload Image'}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </Box>

            {imagePreview && (
              <Box mt={2}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
                />
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
