import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main id="main" className="site-main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
