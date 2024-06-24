import { Navigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import type { TypedDispatch } from '../redux'
import { set_auth, user_login } from '../Slice';

interface props {
    authed: boolean
}
export const Authorizator = (props: props) => {
    const useTypedDispatch = () => useDispatch<TypedDispatch>()
    const dispatch = useTypedDispatch()
    dispatch(set_auth(props.authed))
    if (!props.authed) dispatch(user_login(''));
    return <Navigate to='/' />
}