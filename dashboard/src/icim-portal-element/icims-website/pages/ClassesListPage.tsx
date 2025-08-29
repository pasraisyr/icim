
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { fetchClasses, Class } from 'icim-portal-element/academic-manager-dashboard/pages/ClassesManagement/api';

interface ClassesListDialogProps {
    open: boolean;
    onClose: () => void;
    level?: string | null;
}

export function ClassesListDialog({ open, onClose, level }: ClassesListDialogProps) {
    const [classes, setClasses] = useState<Class[]>([]);

    useEffect(() => {
        if (open) {
            fetchClasses().then(setClasses).catch(console.error);
        }
    }, [open]);

    // Filter classes by level if provided
    const filteredClasses = level ? classes.filter(cls => {
        // Normalize for matching
        if (!cls.level || !level) return false;
        return cls.level.toLowerCase().includes(level.toLowerCase());
    }) : classes;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Kelas Tersedia {level ? `- ${level}` : ''}</span>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={3}>
                        {filteredClasses.length === 0 ? (
                            <Typography variant="body2" color="textSecondary" sx={{ m: 2 }}>
                                Tiada kelas tersedia untuk tahap ini.
                            </Typography>
                        ) : filteredClasses.map(cls => (
                        <Grid item xs={12} md={6} key={cls.id}>
                            <Card>
                                <CardContent>
                                        <Typography variant="h5" color="primary">{cls.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Tahap: {cls.level}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Subjek: {Array.isArray(cls.subjects) ? cls.subjects.map(sub => sub.name || sub).join(', ') : cls.subjects}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Jadual: {cls.scheduleDay}, {cls.startTime} - {cls.endTime}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Harga: RM{cls.price}
                                        </Typography>
                                    {/* You can add more details or actions here */}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
}
