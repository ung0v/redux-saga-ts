import { Routes, Route } from 'react-router-dom';
import { LoginPage } from 'features/auth/pages/LoginPage';
import { AdminLayout } from 'components/Layout';
import { NotFound, PrivateRoute } from 'components/Common';

import Dashboard from 'features/dashboard';
import Student from 'features/student';
import AddEditPage from 'features/student/AddEditPage';
import ListPage from 'features/student/ListPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Student />}>
            <Route index element={<ListPage />} />
            <Route path="add" element={<AddEditPage />} />
            <Route path=":studentId" element={<AddEditPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
