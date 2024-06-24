import { Form, redirect, useNavigate } from "react-router-dom"
import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from '../redux'
import { form_result } from "../interfaces";

interface newdata {
    id: string
    username: string
    email: string
    country: string
    city: string
}

export const Edit_page = () => {
    const navigate = useNavigate()
    const typedSelector: TypedUseSelectorHook<RootState> = useSelector
    const user_id = typedSelector(state => state.global_store.user_id)
    const data = typedSelector(state => state.global_store.db)
    const id = data.findIndex(x => x.id === user_id)
    return (
        <>
            <Form action="/Edit" method="post">
                <div className="form">
                    <ul>
                        <input name="id" defaultValue={id} style={{ display: 'none' }} />
                        <li>
                            <p>{'Custom name: '}</p>
                            <input type="text" name="name" defaultValue={data[id].username} />
                        </li>
                        <li>
                            <p>{'Email: '}</p>
                            <input type="text" name="email" defaultValue={data[id].email} />
                        </li>
                        <li>
                            <p>{'Country: '}</p>
                            <input type="text" name="country" defaultValue={data[id].country} />
                        </li>
                        <li>
                            <p>{'City: '}</p>
                            <input type="text" name="city" defaultValue={data[id].city} />
                        </li>
                    </ul>
                    <input type="submit" />
                </div>
            </Form>
            <button onClick={() => navigate(-1)} className="back">go back</button>
        </>)
}

export const change = async ({ request }: form_result) => {
    const changes = await request.formData()
    const newdata: newdata = {
        id: changes.get('id') as string,
        username: changes.get('name') as string,
        email: changes.get('email') as string,
        country: changes.get('country') as string,
        city: changes.get('city') as string
    }
    fetch('http://127.0.0.1:8000/users', {
        method: "POST",
        body: JSON.stringify(newdata)
    });
    return redirect('/')
}
