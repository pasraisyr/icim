import { Box, Container, Typography } from '@mui/material';
import MainCard from 'components/MainCard';

export default function ProgramsSection() {
  return (
    <>
      {/* Primary Education */}
      <Box id="primary-education" sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <MainCard title="Primary Education">
            <Typography variant="body1">
              Our primary education program focuses on building strong foundations in Islamic studies, 
              Arabic language, and core academic subjects through interactive and engaging methods.
            </Typography>
          </MainCard>
        </Container>
      </Box>

      {/* Secondary Education */}
      <Box id="secondary-education" sx={{ py: 6 }}>
        <Container maxWidth="xl">
          <MainCard title="Secondary Education">
            <Typography variant="body1">
              Advanced Islamic studies, science, mathematics, and preparation for national examinations 
              while maintaining strong Islamic values and character development.
            </Typography>
          </MainCard>
        </Container>
      </Box>

      {/* Tuition Classes */}
      <Box id="tuition-classes" sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <MainCard title="Tuition Classes">
            <Typography variant="body1">
              Specialized tuition programs for SPM, STPM, and other examinations with experienced 
              instructors and proven track record of excellent results.
            </Typography>
          </MainCard>
        </Container>
      </Box>

      {/* Extracurricular */}
      <Box id="extracurricular" sx={{ py: 6 }}>
        <Container maxWidth="xl">
          <MainCard title="Extracurricular Activities">
            <Typography variant="body1">
              Various clubs and activities including Quran recitation, sports, debate, and community 
              service to develop well-rounded students.
            </Typography>
          </MainCard>
        </Container>
      </Box>

      {/* Admission Process */}
      <Box id="admission-process" sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <MainCard title="Admission Process">
            <Typography variant="body1">
              Our streamlined admission process ensures easy enrollment. Submit your application online 
              and our admissions team will guide you through each step.
            </Typography>
          </MainCard>
        </Container>
      </Box>

      {/* Requirements */}
      <Box id="requirements" sx={{ py: 6 }}>
        <Container maxWidth="xl">
          <MainCard title="Admission Requirements">
            <Typography variant="body1">
              Basic requirements include academic transcripts, medical records, and parent/guardian 
              information. Specific requirements may vary by program level.
            </Typography>
          </MainCard>
        </Container>
      </Box>

      {/* Fees */}
      <Box id="fees" sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <MainCard title="Fee Structure">
            <Typography variant="body1">
              Competitive and affordable fee structure with various payment plans available. 
              Scholarships and financial aid options are available for qualifying students.
            </Typography>
          </MainCard>
        </Container>
      </Box>
    </>
  );
}
