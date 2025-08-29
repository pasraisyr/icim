// material-ui
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// assets
import { DocumentText, Profile2User, Book } from 'iconsax-react';

// types
import type { ReportViewSelectorProps } from '../api';

// ==============================|| REPORT VIEW SELECTOR ||============================== //

const ReportViewSelector = ({
  currentView,
  onViewChange
}: ReportViewSelectorProps) => {

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: string | null,
  ) => {
    if (newView !== null) {
      onViewChange(newView as 'detailed' | 'summary' | 'overview');
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography variant="h6">View:</Typography>
      <ToggleButtonGroup
        value={currentView}
        exclusive
        onChange={handleViewChange}
        aria-label="report view selector"
      >
        <ToggleButton value="detailed" aria-label="detailed view">
          <Stack direction="row" spacing={1} alignItems="center">
            <DocumentText size={16} />
            <span>Detailed</span>
          </Stack>
        </ToggleButton>
        <ToggleButton value="summary" aria-label="summary view">
          <Stack direction="row" spacing={1} alignItems="center">
            <Profile2User size={16} />
            <span>Summary</span>
          </Stack>
        </ToggleButton>
        <ToggleButton value="overview" aria-label="overview view">
          <Stack direction="row" spacing={1} alignItems="center">
            <Book size={16} />
            <span>Overview</span>
          </Stack>
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default ReportViewSelector;
