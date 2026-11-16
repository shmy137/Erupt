import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import ServiceDetail from './pages/ServiceDetail'
import WorkDetail from './pages/WorkDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services/:id" element={<ServiceDetail />} />
        <Route path="work/:slug" element={<WorkDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
