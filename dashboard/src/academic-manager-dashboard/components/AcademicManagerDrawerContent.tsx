// material-ui
// project-imports
import NavUser from 'layout/Dashboard/Drawer/DrawerContent/NavUser';
import AcademicManagerNavigation from './AcademicManagerNavigation';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| ACADEMIC MANAGER DASHBOARD - DRAWER CONTENT ||============================== //

export default function AcademicManagerDrawerContent() {
  return (
    <>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
        <AcademicManagerNavigation />
      </SimpleBar>
      <NavUser />
    </>
  );
}
