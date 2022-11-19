import 'antd/dist/antd.css';
import { Route, Routes } from 'react-router-dom';
import HangBanTraLai from './components/hang-ban-tra-lai/HangBanTraLai';
import AdminLayout from './components/layout/AdminLayout';


function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<AdminLayout />} />
      </Route>
    </Routes>
  );
}

export default App;
