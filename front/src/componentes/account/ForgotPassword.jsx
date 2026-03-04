import { useState } from "react";
import {Form, Button, Alert} from "react-bootstrap";

const ForgotPassword = () =>{
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/api/auth/forgot-password",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        });

        const data = await res.json();
        setMessage(data.msg);
    };

    return(
        <Form onSubmit={handleSubmit}>
            {message && <Alert variant="info">{message}</Alert>}
            <Form.Group className="mb-3">
                <Form.Label>Ingresá tu email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100">
                Recuperar contraseña
            </Button>
        </Form>
    );
};

export default ForgotPassword;