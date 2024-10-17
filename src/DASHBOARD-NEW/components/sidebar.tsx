import { Link } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';




import { useLocation, } from 'react-router-dom';


const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "activeClicked" : "";

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar
        textColor="#fff"
        backgroundColor="#333"
        className="custom-sidebar"
        breakpoint={"md" as any}
        toggled={false}
        minWidth="80px"
        maxWidth="250px"
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <Link to="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            <div>Control</div>
            <div>Dashboard</div>
          </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <div style={({fontSize: '14px', })}>
            <CDBSidebarMenu >
              <Link to="/menu" className={isActive("/")}>
                <CDBSidebarMenuItem icon="dashboard">Dashboard</CDBSidebarMenuItem>
              </Link>
              <Link to="/menu/post" className={isActive("/tables")}>
                <CDBSidebarMenuItem icon="table">Postingan</CDBSidebarMenuItem>
              </Link>
              <Link to="/menu/dokumen" className={isActive("/profile")}>
                <CDBSidebarMenuItem icon="sticky-note">Dokumen</CDBSidebarMenuItem>
              </Link>
              <Link to="/menu/media" className={isActive("/analytics")}>
                <CDBSidebarMenuItem icon="chart-line">Media</CDBSidebarMenuItem>
              </Link>
              <Link to="/menu/announcementt" className={isActive("/analytics")}>
                <CDBSidebarMenuItem icon="share">Pengumuman</CDBSidebarMenuItem>
              </Link>
            </CDBSidebarMenu>
          </div>
        </CDBSidebarContent>


        <CDBSidebarFooter>
          <div style={{ textAlign: 'center' }}>
            <div style={{ padding: '20px 5px' }}>
              DLH-Tanggamus Dashboard
            </div>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
