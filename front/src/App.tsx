import './App.sass';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, defer } from 'react-router-dom';
import { Edit_page, change } from './pages/Edit';
import { Form_of_Authorization, log_in } from "./pages/Authorization"
import { Body } from './pages/main/main';
import { Suspense } from 'react';
import { IsAuth } from './isAuth';
import { Layout } from './layout';
import { Authorizator } from './process/authorizated';
import { Customers } from './pseudopages/customers';
import { Lead } from './pseudopages/lead';
import { Groups } from './pseudopages/groups';
import { Files } from './pseudopages/file_uploads';
import { Excel } from './pseudopages/excel_scripts';
import { Accounts } from './pseudopages/accounts';
import { Filter } from './pseudopages/filter';
import { Referrals } from './pseudopages/referrals';
import { Transfers } from './pseudopages/transfers';
import { Ips } from './pseudopages/ips';
import { Toggle_block } from './pseudopages/toggle_block';
import { Change_password } from './pseudopages/change_password';
import { Show } from './pseudopages/show';

function App() {
  const req = async () => JSON.parse(await (await fetch('http://127.0.0.1:8000/users', { method: "GET" })).json())
  const loading = async () => { return defer({ database: req() }) }
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<IsAuth><Layout /></IsAuth>}>
        <Route index loader={loading} element={
          <Suspense fallback={<h1>Is loading, please wait...</h1>} >
            <Body />
          </Suspense>} />
        <Route path='Edit' element={<Edit_page />} action={change} />
        <Route path='Customers' element={Customers(100)}></Route>
        <Route path='Lead' element={Lead(100)}></Route>
        <Route path='Groups' element={Groups(10)}></Route>
        <Route path='Files' element={Files(10)}></Route>
        <Route path='excel' element={Excel(10)}></Route>
        <Route path='Edit' element={<Edit_page />} action={change} />
        <Route path='Accounts' element={Accounts(100)}></Route>
        <Route path='Filter' element={Filter(100)}></Route>
        <Route path='Referrals' element={Referrals(10)}></Route>
        <Route path='Transfers' element={Transfers(10)}></Route>
        <Route path='Ips' element={Ips(10)}></Route>
        <Route path='Toggle block' element={Toggle_block(10)}></Route>
        <Route path='Change password' element={Change_password(10)}></Route>
        <Route path='Show' element={Show(10)}></Route>
      </Route>
      <Route path='/authorization' element={<Form_of_Authorization failed={false}/>} action={log_in} />
      <Route path='/auth_failed' element={<Form_of_Authorization failed={true}/>} action={log_in} />
      <Route path='/auth' element={<Authorizator authed={true}/>} />
      <Route path='/auth_escape' element={<Authorizator authed={false}/>} />
    </>
  ))
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
