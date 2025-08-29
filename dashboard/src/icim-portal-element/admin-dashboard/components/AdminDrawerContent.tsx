// material-ui
// project-imports
// import NavUser from 'layout/Dashboard/Drawer/DrawerContent/NavUser';
import AdminNavigation from './AdminNavigation';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| ADMIN - DRAWER CONTENT ||============================== //

export default function AdminDrawerContent() {
  return (
    <>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
        <AdminNavigation />
      </SimpleBar>
      {/* <NavUser /> */}
    </>
  );
}
