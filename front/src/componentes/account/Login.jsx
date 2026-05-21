import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.msg);
                return;
            }

            // Guardamos el token
            localStorage.setItem("token", data.token);
            //Hacemos que nos mande al home si el login es exitoso
            localStorage.setItem("user", JSON.stringify(data.user));
            window.dispatchEvent(new Event("userChanged"));
            navigate(from, { replace: true }); //vuelve a la pagina a la que se dirigia

        } catch (err) {
            setError("Error del servidor");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h2 className="login-title">Bienvenido</h2>
                <Form onSubmit={handleSubmit}>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            onChange={handleChange}
                            required
                            className="login-input"
                            placeholder="tu@email.com"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            onChange={handleChange}
                            required
                            className="login-input"
                            placeholder="••••••••"
                        />
                    </Form.Group>

                    <div className="text-end mb-4">
                        <Link to="/account/forgot-password" title="Pequeña ayuda" className="forgot-password-link">
                            ¿Olvidaste la contraseña?
                        </Link>
                    </div>

                    <Button variant="dark" type="submit" className="w-100 login-btn">
                        Iniciar sesión
                    </Button>

                    <div className="text-center mt-4">
                        <span className="small text-muted">
                            ¿No tenes cuenta?{" "}
                            <Link to="/account/Register" className="register-link">
                                Registrate
                            </Link>
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;