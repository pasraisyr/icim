import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import { Book } from 'iconsax-react';
import { Class, StudentAllocation } from '../api';

interface ClassSelectionProps {
  classes: Class[];
  selectedClassId: number | null;
  allocations: StudentAllocation[];
  onClassSelect: (classId: number) => void;
}

const ClassSelection = ({ classes, selectedClassId, allocations, onClassSelect }: ClassSelectionProps) => {
  // Get allocated student count for a class
  const getAllocatedCount = (classId: number): number => {
    return allocations.filter(alloc => alloc.class_obj.id === classId).length;
  };

  // Get selected class details
  const selectedClass = classes.find(c => c.id === selectedClassId);

  return (
    <Stack spacing={2}>
      <Typography variant="body2" color="textSecondary">
        Click on any class below to start allocating students
      </Typography>
      
      <Grid container spacing={2}>
        {classes.filter(c => c.statuse === 'active').map((classItem) => {
          const isSelected = selectedClassId === classItem.id;
          const currentEnrolled = getAllocatedCount(classItem.id);
          const capacity = 30; // Default capacity, you can add this to Class interface
          const remainingSpots = capacity - currentEnrolled;
          const isFull = currentEnrolled >= capacity;
          
          return (
            <Grid item xs={12} sm={6} md={4} key={classItem.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  border: isSelected ? 2 : 1,
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  bgcolor: isSelected ? 'primary.lighter' : 'background.paper',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: 2
                  }
                }}
                onClick={() => onClassSelect(classItem.id)}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Book size={24} color={isSelected ? 'var(--mui-palette-primary-main)' : undefined} />
                      <Typography variant="h6" color={isSelected ? 'primary' : 'text.primary'}>
                        {classItem.name}
                      </Typography>
                    </Stack>
                    
                    <Stack spacing={1}>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Level:</strong> {classItem.level}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Schedule:</strong> {classItem.scheduleDay} {classItem.startTime}-{classItem.endTime}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Price:</strong> RM{classItem.price}/month
                      </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack>
                        <Typography variant="body2" fontWeight="bold">
                          Enrollment
                        </Typography>
                        <Typography variant="h6" color={isFull ? 'error.main' : 'success.main'}>
                          {currentEnrolled}/{capacity}
                        </Typography>
                      </Stack>
                      
                      <Stack spacing={1}>
                        <Chip 
                          label={isFull ? 'Full' : `${remainingSpots} spots left`}
                          size="small"
                          color={isFull ? 'error' : remainingSpots <= 5 ? 'warning' : 'success'}
                        />
                        {isSelected && (
                          <Chip 
                            label="Selected"
                            size="small"
                            color="primary"
                            variant="filled"
                          />
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {selectedClass && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>{selectedClass.name}</strong> selected
            <br />
            Currently enrolled: {getAllocatedCount(selectedClass.id)} students
            <br />
            Available spots: {30 - getAllocatedCount(selectedClass.id)} students
          </Typography>
        </Alert>
      )}
    </Stack>
  );
};

export default ClassSelection;
