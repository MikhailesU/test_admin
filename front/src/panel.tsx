import head from './images/head.png'
import dushboard from './images/dushboard.png'
import customers from './images/customers.png'
import accounts from './images/accounts.png'
import transaction from './images/transactions.png'
import payments_methods from './images/payments_methods.png'
import admins from './images/admins.png'
import settings from './images/settings.png'
import reports from './images/reports.png'
import groups from './images/groups.png'
import excel_scripts from './images/excel_scripts.png'
import file_uploads from './images/file_uploads.png'

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Customers_drop = () => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate()
  const images = [customers, groups, file_uploads, excel_scripts]
  const src = ['lead', 'groups', 'files', 'excel']
  const pages =
    <ul>
      <li className='main_panels_inside_element' key={'customers'} onClick={() => navigate("/customers")}>
        <img src={customers} className='panel_image' />
        <p>{'Customers'}</p>
      </li>
      {[
        'Lead',
        'Groups',
        'File Uploads',
        'Excel Sript']
        .map((li, ind) =>
          <li className='panels_inside_element' key={li + 'li'} onClick={() => navigate(src[ind])}>
            <img src={images[ind]} className='panel_image' key={li + 'img'} />
            <p key={li + 'a'}>{li}</p>
          </li>)}
    </ul>
  return (
    <div className="panel_drop">
      <li key={'dives'} onClick={() => setClick(!click)} className={click ? 'active_panels_element' : 'panels_element'}>
        <div className='name_container'>
          <img src={customers} className='panel_image' />
          <p>{'Customers'}</p>
        </div>
        <p>{'\u2228'}</p>
      </li>
      {click && pages}
    </div>)

}
export const Panel = () => {
  const navigate = useNavigate()
  const images = [accounts, transaction, payments_methods, admins, settings, reports]
  return (
    <>
      <div className="sidebar">
        <img src={head} />
        <nav>
          <ul>
            <li className='panels_element' onClick={() => navigate('/')}>
              <div className='name_container'>
                <img src={dushboard} className='panel_image' />
                <p>{'Dashboard'}</p>
              </div>
            </li>
            <Customers_drop />
            {['Accounts',
              'Transactions',
              'Payments Methods',
              'Admins',
              'Settings',
              'Reports']
              .map((li, ind) =>
                <li className='panels_element' key={li + 'li'}>
                  <div className='name_container' key={li + 'div'}>
                    <img src={images[ind]} className='panel_image' key={li + 'img'} />
                    <p key={li + 'p'}>{li}</p>
                  </div>
                  <p key={li + 'pp'}>{'\u2228'}</p>
                </li>
              )}
          </ul>
        </nav>
      </div>
    </>
  )
}