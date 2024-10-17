import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HalamanUtama } from './screens/HalamanUtama.tsx'
import LoginPage from './screens/LoginPage.tsx'
import { UnderMaintanance1 } from './screens/Maintenance.tsx'
import { LayananPengaduanScreen } from './screens/LayananPengaduanScreen.tsx'
import ProfilePage from './screens/ProfilePage.tsx'
// import { Dashboard } from './dasboard-konten/Screen/Dashboard.tsx'
import { ProtectedRoute } from './ProtectedRoute.tsx'; // Import ProtectedRoute
import { DocumentPage } from './screens/DocumentPage.tsx'
import { BeritaPage } from './screens/BeritaPage.tsx'
import DashboardNew from './DASHBOARD-NEW/screen/DashboardNewScreen.tsx'
import { Announcement } from './screens/Announcement.tsx'
import { MediaScreen } from './screens/MediaScreen.tsx'
import { PostDetailScreen } from './screens/DetailPostScreen.tsx'
import './index.css'; 





const router = createBrowserRouter([
  {
    path: "/",
    element: <HalamanUtama />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/maintenance",
    element: <UnderMaintanance1 />
  },
  {
    path: "/berita",
    element: <BeritaPage />
  },
  {
    path: "/berita/post/:postId",
    element: <PostDetailScreen />
  },
  {
    path: "/pengaduan",
    element: <LayananPengaduanScreen />
  },
  {
    path: "/profile",
    element: <ProfilePage />
  },
   {
    path: "/menu/*",
    element: (
      <ProtectedRoute>
        <DashboardNew />
      </ProtectedRoute>
    ),
  },
  // {
  //   path: "/dashboard/",
  //   element: (
  //     <ProtectedRoute>
  //       <Dashboard />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "/document",
    element: <DocumentPage />
  },
  {
    path: "/document/:type",
    element: <DocumentPage />
  },
  {
    path: "/announcement",
    element: <Announcement />
  },
  {
    path: "/media",
    element: <MediaScreen/>
  },
  {
    path: "/media/:type",
    element: <MediaScreen/>
  },
  {
    path: "/berita/type/:type",
    element: <BeritaPage/>
  },
  // {
  //   path: "/menu/*",
  //   element: <DashboardNew />
  // }
  
  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)