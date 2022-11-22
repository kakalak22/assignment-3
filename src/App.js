// import 'antd/dist/antd.css';
import 'antd/dist/antd.variable.min.css';
import { Route, Routes } from 'react-router-dom';
import HangBanTraLai from './components/hang-ban-tra-lai/HangBanTraLai';
import AdminLayout from './components/layout/AdminLayout';
import { ConfigProvider } from 'antd';

ConfigProvider.config({
  theme: {
    primaryColor: '#871400',
    processingColor: "#871400"
  },
});

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
