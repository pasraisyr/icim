// material-ui
// project-imports
// import NavUser from 'layout/Dashboard/Drawer/DrawerContent/NavUser';
import TeacherNavigation from './TeacherNavigation';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| TEACHER DASHBOARD - DRAWER CONTENT ||============================== //

export default function TeacherDrawerContent() {
  return (
    <>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
        <TeacherNavigation />
      </SimpleBar>
      {/* <NavUser /> */}
    </>
  );
}
