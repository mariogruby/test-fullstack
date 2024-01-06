import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import authService from '../../services/auth.service';

function LoginPage() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, authenticateUser} = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password };

        authService
        .login(requestBody)
        .then((response) => {
            storeToken(response.data.authToken);
            authenticateUser();
            navigate("/")
        })
        .catch((error) => {

            const errroDescription = error.response.data.message;
            setErrorMessage(errroDescription);
        });
    };

    return (
        <>
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmail}/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={handlePassword}/>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit">Login</button>
            <p>
                bfewjbejbj <Link to="/signup">Signup</Link>
            </p>
        </form>
        </>
    );
}

export default LoginPage;