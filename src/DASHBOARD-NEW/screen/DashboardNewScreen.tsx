import { Routes, Route } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Dashboard from '../components/maindashboard';
import PostDashboard from '../components/PostDashboard';
import DocumentDashboard from '../components/documentDashboard';
import MediaDashboard from '../components/mediaDashboard';
import AnnouncementDashboard from '../components/announcementDashboard';

function DashboardNew() {
  return (
      <div className="App">
          <Header />
          <div style={{ display: 'flex', height: '100vh' }}> {/* Flex container for sidebar and content */}
              <Sidebar />
              <main style={{ flex: 1, overflowY: 'auto' }}> {/* Main content area */}
                  <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/post" element={<PostDashboard />} />
                      <Route path="/dokumen" element={<DocumentDashboard />} />
                      <Route path="/media" element={<MediaDashboard />} />
                      <Route path="/announcementt" element={<AnnouncementDashboard />} />
                      {/* More routes can be added here */}
                  </Routes>
              </main>
          </div>
      </div>
  );
}

export default DashboardNew;