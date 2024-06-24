import { Form, redirect } from "react-router-dom"
import { useDispatch } from "react-redux";
import type { TypedDispatch } from '../redux'
import { user_login } from "../Slice";
import { form_result } from "../interfaces";

export interface request {
  login: string
  password: string
}

interface props {
  failed: boolean
}

const Form_of_Authorization = (props: props) => {
  const useTypedDispatch = () => useDispatch<TypedDispatch>()
  const dispatch = useTypedDispatch()
  return (
    <>
      <Form action="/authorization" method="post">
        <div className="form">
          <ul>
            <li>
              <p>{'Login: '}</p>
              <input type="text" name="login" onChange={(e) => dispatch(user_login(e.target.value))} />
            </li>
            <li>
              <p>{'Password: '}</p>
              <input type="text" name="password" />
            </li>
          </ul>
          {props.failed&&<p style={{color: 'red'}}>incorrect login or password</p>}
          <input type="submit" />
        </div>
      </Form>
    </>)
}

const log_in = async ({ request }: form_result) => {
  const login_password = await request.formData()
  const request_body: request = {
    login: login_password.get('login') as string,
    password: login_password.get('password') as string,
  }
  const response = eval(await (await fetch('http://127.0.0.1:8000/authorization', {
    method: "POST",
    body: JSON.stringify(request_body)
  })).json());
  if (response.isCorrect === 'true') {
    return redirect('/auth')
  }
  else {
    return redirect('/auth_failed')
  }
}

export { Form_of_Authorization, log_in }