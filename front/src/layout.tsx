import { Head } from './header';
import { Outlet } from 'react-router-dom';
import { Panel } from './panel';

export const Layout = () => {
  return (
    <>
      <Head />
      <div className='main_container'>
        <Panel />
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </>
  )
}