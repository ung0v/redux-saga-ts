import React, { useEffect } from 'react';
import cityApi from 'api/cityApi';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LoginPage } from 'features/auth/pages/LoginPage';
import { AdminLayout } from 'components/Layout';
import { NotFound } from 'components/Common';

function App() {
  const getAllCity = async () => {
    const cities = await cityApi.getAll();
    console.log(cities);
  };
  useEffect(() => {
    getAllCity();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
