import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { useRegisterMutation } from "../../redux/api/usersApiSlice"

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()
    const { userInfo } = useSelector(state => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()

        if(password != confirmPassword) {
            console.error('Password do not match')
        } else {
            try {
                const res = await register({username, email, password}).unwrap()
                dispatch(setCredentials({...res}))
                navigate(redirect)
                console.log("User succesfully registered")
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <section>
            <h1>register</h1>
            <form onSubmit={submitHandler}>
                <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    type="text"
                    placeholder="Enter name" />
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email"
                />

                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter password"
                />

                <input
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="Confirm password"
                />
                <div>
                    <button
                        disabled={isLoading}
                        type="submit"
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>

                    {isLoading && (<div>Cargando</div>)}
                </div>
            </form>

            <p>
                Already have an account? {" "}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Login
                </Link>
            </p>
        </section>
    )
}

export default Register