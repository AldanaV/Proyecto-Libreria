import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

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
            navigate("/");
            window.dispatchEvent(new Event("userChanged"));

        } catch (err) {
            setError("Error del servidor");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <div className="text-end mb-3">
                <Link to="/account/forgot-password" className="small text-decoration-none">
                ¿Olvidaste la contraseña?
                </Link>
            </div>

            <Button variant="dark" type="submit" className="w-100">
                Iniciar sesión
            </Button>

            <div className="text-center">
                <span className="small">
                    ¿No tenes cuenta?{" "}
                    <Link to="/account/Register" className="text-decoration-none">
                    Registrate
                    </Link>
                </span>
            </div>
        </Form>
    );
};

export default Login;