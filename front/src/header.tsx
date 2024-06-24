import { useState } from "react";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { RootState, TypedDispatch } from './redux'
import { change_filter_body } from "./Slice";
import lines from './images/lines.png'
import userlogo from './images/user.png'
import { useNavigate } from "react-router-dom"
import { filter_parametrs } from "./interfaces";

let search: filter_parametrs = {
    filter_param: 'CUSTOMER NAME',
    key: 'none',
    filter_type: 'contains',
    filter_body: 'My',
    filter_id: 0
}

export const Head = () => {
    const redirect = useNavigate()
    const typedSelector: TypedUseSelectorHook<RootState> = useSelector
    const user = typedSelector(state => state.global_store.user)

    const useTypedDispatch = () => useDispatch<TypedDispatch>()
    const dispatch = useTypedDispatch()


    const [isLog_Out_opened, setOpen] = useState(false)
    const [presis, setPresis] = useState(false)
    const Log_out = () => {
        return (
            <div className="atten">
                <p>Do you really want log out?</p>
                <div>
                    <button onClick={() => redirect('/auth_escape')}>yes</button>
                    <button onClick={() => setOpen(false)}>no</button>
                </div>
            </div>
        )
    }

    const [time, setTime] = useState((new Date).toLocaleString().split(','))
    setTimeout(() => setTime((new Date).toLocaleString().split(',')), 1000)
    return (
        <div className="time">
            <img src={lines} style={{ height: '30px' }} />
            <input type="text"
                placeholder="Search"
                onChange={(e) => {
                    search['filter_body'] = e.target.value;
                    dispatch(change_filter_body(search))
                }} />
            <p style={{ fontSize: '30px' }}>{'Server time: ' + time[0].split('.').reverse().join('-') + ' ' + time[1]}</p>
            <div className="logOut_button">
                <img src={userlogo} style={{ height: '30px' }} />
                <div>
                    <p onClick={() => setPresis(true)}>{user + '\u25BC'}</p>
                    {presis && <li style={{ color: 'red' }} className="dropdown" onClick={() => { setOpen(true); setPresis(false) }}>LOG OUT</li>}
                </div>
            </div>
            {isLog_Out_opened && Log_out()}
        </div>)
}