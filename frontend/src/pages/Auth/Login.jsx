import { useState, useEffect } from "react"
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { useLoginMutation } from "../../redux/api/usersApiSlice"
import { setCredentials } from "../../redux/features/auth/authSlice"

const Login = () => {
    const [email, setEmail] =useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()
    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()

    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async(e) => {
        e.preventDefault()
        try {
            const res = await login({email, password}).unwrap()
            console.log(res)
            dispatch(setCredentials({...res}))
        } catch (error) {
            console.error(error?.data?.message || error.message)
        }
    }
    return (
    <div>
        <section>
            <h1>sign in</h1>

            <form onSubmit={submitHandler}>
                <input 
                type="email"
                placeholder="email addres"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />

                <button disabled={isLoading} type="submit" >
                    {isLoading ? "Signing In..." : "Sign In"}
                </button>

                {isLoading && "Loading ..."}
            </form>

            <div>
                <p>
                    New Customer ? {" "}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} >
                        Register
                    </Link>
                </p>
            </div>

        </section>
    </div>
  )
}

export default Login