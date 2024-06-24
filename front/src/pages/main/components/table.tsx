import { useState } from "react";
import { data } from '../../../interfaces'
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { RootState, TypedDispatch } from '../../../redux'
import { useNavigate } from "react-router-dom";
import { edit_user } from "../../../Slice";
import yeas from "./images/true.png"
import no from "./images/false.png"
import show from './images/show.png'
import edit from './images/edit.png'
import change_password from './images/change_password.png'
import ips from './images/ips.png'
import files from './images/files.png'
import referrals from './images/refferals.png'
import toggle_block from './images/toggle_block.png'

interface props {
    data: Array<data>
}
interface for_keying {
    child_key: string
}

export const Table = (props: props) => {


    const typedSelector: TypedUseSelectorHook<RootState> = useSelector
    const end = (typedSelector(state => state.global_store.page) - 1) * 20
    const useTypedDispatch = () => useDispatch<TypedDispatch>()
    const dispatch = useTypedDispatch()
    const Header = ['Internal ID',
        'Created At',
        'Customer Name',
        'Email',
        'Country',
        'City',
        'Group',
        'Verified',
        'Card verified',
        'Activated',
        'Blocked',
        'Action']
        .map((head) => <th key={head}>{head}</th>)
    const Action = (props: for_keying) => {
        const [click, setClick] = useState(false);
        const navigate = useNavigate()
        const images=[show, edit, change_password, ips, ips, ips, files, referrals, toggle_block]
        const actions =
            <ul>
                {['Show',
                    'Edit',
                    'Change password',
                    'Accounts',
                    'Transfers',
                    'Ips',
                    'Filter',
                    'Referrals',
                    'Toggle block']
                    .map((li, ind) =>
                        <li className="drop" key={li + props.child_key} onClick={() => { dispatch(edit_user(props.child_key)) }}>
                            <img style={{height:'20px'}} src={images[ind]}/>
                            <p key={li + 'a' + props.child_key} onClick={() => navigate(li)}>
                                {li}
                            </p>
                        </li>)}
            </ul>
        return (
            <div className="Action">
                <button key={props.child_key + 'div'} onClick={() => setClick(!click)}>
                    {'Action\u25BC'}
                </button>
                <div className="dropdown">
                    {click && actions}
                </div>
            </div>)

    }
    const Body = props.data.slice(end,
        props.data.length > end + 20 ?
            end + 20 :
            props.data.length - 1)
        .map((row) => {
            const keys = row[Object.keys(row)[0] as keyof typeof row]
            return <tr key={keys + '-'}>
                {Object.keys(row).map((key) => {
                    const contain = row[key as keyof typeof row]
                    return typeof (contain) === 'string' ?
                        <td key={contain.toString()}>
                            {contain}
                        </td> :
                        <td key={contain.toString() + keys + key} className="bol_container">
                            <img src={contain ? yeas : no} className="true_or_false" />
                        </td>
                })}
                <td key={keys + 'a'}>
                    <Action key={keys + 'act'} child_key={keys.toString()} />
                </td>
            </tr>
        })
    return (

        <table>
            <thead>
                <tr key={'head'}>{Header}</tr>
            </thead>
            <tbody>{Body}</tbody>
        </table>

    )
}
