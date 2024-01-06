import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);

    const handleSignupSubmit = (e) => {
        e.preventDefault();

        const requestBody = { email, password, name };

        authService
            .signup(requestBody)
            .then((response) => {
                navigate("/login");
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    return (
        <>
            <h2>Signup</h2>
            <form onSubmit={handleSignupSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmail} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePassword} />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={handleName} />
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button type="submit">Signup</button>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </>
    );
}

export default SignupPage;
