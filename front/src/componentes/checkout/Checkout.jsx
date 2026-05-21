import { useContext, useState } from "react";
import { CartContext } from "../carrito/Carrito";
import { useNavigate, Link } from "react-router-dom";
import './Checkout.css';

const Checkout = () => {
    const { cart, totalPrice, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    // 1. WIZARD STEPS STATE
    const [activeStep, setActiveStep] = useState(1); // 1: Datos Personales, 2: Entrega, 3: Pago

    // 2. FORM STATES
    const [formData, setFormData] = useState({
        // Paso 1: Datos Personales
        email: "",
        nombre: "",
        apellido: "",
        dni: "",
        codArea: "+54",
        telefono: "",
        promoOptIn: false,
        termsAccepted: false,

        // Paso 2: Entrega
        entregaMetodo: "sucursal", // "sucursal" o "domicilio"
        calle: "",
        localidad: "",
        codigoPostal: "",

        // Paso 3: Pago
        pagoMetodo: "debito", // "debito", "credito", o "efectivo"
        tarjetaNumero: "",
        tarjetaNombre: "",
        tarjetaMes: "",
        tarjetaAnio: "",
        tarjetaCvv: "",
        tarjetaCuotas: "1",
        dniPagador: "",
        facturacionCp: ""
    });

    const [touched, setTouched] = useState({
        email: false,
        nombre: false,
        apellido: false,
        dni: false,
        codArea: false,
        telefono: false,
        calle: false,
        localidad: false,
        codigoPostal: false,
        tarjetaNumero: false,
        tarjetaNombre: false,
        tarjetaMes: false,
        tarjetaAnio: false,
        tarjetaCvv: false,
        facturacionCp: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    };

    // 3. VALIDATIONS
    const isEmailValid = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const errors = {
        // Paso 1
        email: !formData.email ? "Este campo es obligatorio" : !isEmailValid(formData.email) ? "Formato de email inválido" : null,
        nombre: !formData.nombre ? "Este campo es obligatorio" : null,
        apellido: !formData.apellido ? "Este campo es obligatorio" : null,
        dni: !formData.dni ? "Este campo es obligatorio" : null,
        codArea: !formData.codArea ? "Este campo es obligatorio" : null,
        telefono: !formData.telefono ? "Este campo es obligatorio" : formData.telefono.replace(/\D/g, "").length !== 10 ? "Debe tener exactamente 10 dígitos" : null,

        // Paso 2
        calle: formData.entregaMetodo === "domicilio" && !formData.calle ? "Este campo es obligatorio" : null,
        localidad: formData.entregaMetodo === "domicilio" && !formData.localidad ? "Este campo es obligatorio" : null,
        codigoPostal: formData.entregaMetodo === "domicilio" && !formData.codigoPostal ? "Este campo es obligatorio" : null,

        // Paso 3
        tarjetaNumero: (formData.pagoMetodo === "debito" || formData.pagoMetodo === "credito") && (!formData.tarjetaNumero || formData.tarjetaNumero.replace(/\D/g, "").length < 15) ? "Número de tarjeta inválido" : null,
        tarjetaNombre: (formData.pagoMetodo === "debito" || formData.pagoMetodo === "credito") && !formData.tarjetaNombre ? "Este campo es obligatorio" : null,
        tarjetaMes: (formData.pagoMetodo === "debito" || formData.pagoMetodo === "credito") && !formData.tarjetaMes ? "Obligatorio" : null,
        tarjetaAnio: (formData.pagoMetodo === "debito" || formData.pagoMetodo === "credito") && !formData.tarjetaAnio ? "Obligatorio" : null,
        tarjetaCvv: (formData.pagoMetodo === "debito" || formData.pagoMetodo === "credito") && (!formData.tarjetaCvv || formData.tarjetaCvv.replace(/\D/g, "").length < 3) ? "CVV inválido" : null,
        facturacionCp: (formData.pagoMetodo === "debito" || formData.pagoMetodo === "credito") && !formData.facturacionCp ? "Este campo es obligatorio" : null
    };

    // Validations per Step
    const isStep1Valid = 
        !errors.email && 
        !errors.nombre && 
        !errors.apellido && 
        !errors.dni && 
        !errors.codArea && 
        !errors.telefono && 
        formData.termsAccepted;

    const isStep2Valid = 
        formData.entregaMetodo === "sucursal" || 
        (!errors.calle && !errors.localidad && !errors.codigoPostal);

    const isStep3Valid = 
        formData.pagoMetodo === "efectivo" || 
        (!errors.tarjetaNumero && !errors.tarjetaNombre && !errors.tarjetaMes && !errors.tarjetaAnio && !errors.tarjetaCvv && !errors.facturacionCp);

    // 4. SUBMIT FLOWS
    const handleStep1Submit = (e) => {
        e.preventDefault();
        if (isStep1Valid) {
            setActiveStep(2);
        }
    };

    const handleStep2Submit = (e) => {
        e.preventDefault();
        if (isStep2Valid) {
            setActiveStep(3);
        }
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        if (!isStep1Valid || !isStep2Valid || !isStep3Valid) return;

        try {
            const user = JSON.parse(localStorage.getItem("user")) || { id: null };
            
            // Reconstruct final address
            let finalDireccion = "Retiro por sucursal (Librería Nocturna)";
            if (formData.entregaMetodo === "domicilio") {
                finalDireccion = `${formData.calle}, ${formData.localidad} (CP: ${formData.codigoPostal})`;
            }

            const orderTotal = totalPrice + (formData.entregaMetodo === "domicilio" ? 3500 : 0);

            const order = {
                user: user.id,
                nombre: `${formData.nombre} ${formData.apellido}`,
                email: formData.email,
                productos: cart,
                total: orderTotal,
                direccion: finalDireccion
            };

            const res = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order)
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.msg || "Error al crear la orden");
                return;
            }

            clearCart();

            navigate("/confirmacion", {
                state: {
                    orderNumber: data.orderNumber,
                    user: user,
                    orderDetails: {
                        nombre: formData.nombre,
                        email: formData.email,
                        telefono: `${formData.codArea} ${formData.telefono}`,
                        entrega: formData.entregaMetodo === "sucursal" ? "Retiro en punto" : "Envío a domicilio",
                        direccion: finalDireccion,
                        pagoMetodo: formData.pagoMetodo === "debito" ? "Tarjeta de Débito" : formData.pagoMetodo === "credito" ? "Tarjeta de Crédito" : "Efectivo / Transferencia",
                        total: orderTotal
                    }
                }
            });
        } catch (error) {
            console.log("Error al crear la orden", error);
            alert("Ocurrió un error al procesar tu compra.");
        }
    };

    if (!cart || cart.length === 0) {
        return (
            <div className="checkout-empty-container text-center py-5">
                <h2 className="mb-3">Tu carrito está vacío</h2>
                <Link to="/" className="btn btn-primary px-4 py-2">Volver a la tienda</Link>
            </div>
        );
    }

    const subtotal = totalPrice;
    const entregaCosto = formData.entregaMetodo === "domicilio" ? 3500 : 0;
    const total = subtotal + entregaCosto;

    return (
        <div className="checkout-wrapper">
            <div className="checkout-header-bar">
                <Link to="/" className="back-link">
                    &lt; Volver
                </Link>
                <div className="checkout-brand-title">Libreria Nocturna</div>
            </div>

            <div className="checkout-grid">
                {/* COLUMNA IZQUIERDA: WIZARD MULTIPASOS */}
                <div className="checkout-left-column">
                    
                    {/* ======================================================== */}
                    {/* PASO 1 - DATOS PERSONALES */}
                    {/* ======================================================== */}
                    <div className={`checkout-card mb-4 ${activeStep !== 1 ? "step-completed" : "step-active"}`}>
                        <div className="step-card-header d-flex justify-content-between align-items-center w-100">
                            <h3 className="checkout-section-title mb-0 text-nowrap">1 - Datos Personales</h3>
                            {activeStep > 1 && (
                                <button className="btn-step-modify btn btn-link p-0 text-decoration-none" onClick={() => setActiveStep(1)}>
                                    Modificar
                                </button>
                            )}
                        </div>
                        <hr className="title-divider" />

                        {activeStep === 1 ? (
                            <form onSubmit={handleStep1Submit} className="checkout-form">
                                {/* Email */}
                                <div className="form-group mb-3">
                                    <label className="checkout-label">Email*</label>
                                    <div className="input-with-validation">
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control checkout-input ${touched.email && errors.email ? "is-invalid" : touched.email && !errors.email ? "is-valid" : ""}`}
                                            value={formData.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="ejemplo@correo.com"
                                        />
                                        {touched.email && !errors.email && <span className="valid-check">✓</span>}
                                    </div>
                                    {touched.email && errors.email && <small className="error-message">{errors.email}</small>}
                                </div>

                                {/* Nombre y Apellido */}
                                <div className="row">
                                    <div className="col-md-6 form-group mb-3">
                                        <label className="checkout-label">Nombre*</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            className={`form-control checkout-input ${touched.nombre && errors.nombre ? "is-invalid" : touched.nombre && !errors.nombre ? "is-valid" : ""}`}
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.nombre && errors.nombre && <small className="error-message">{errors.nombre}</small>}
                                    </div>
                                    <div className="col-md-6 form-group mb-3">
                                        <label className="checkout-label">Apellido*</label>
                                        <input
                                            type="text"
                                            name="apellido"
                                            className={`form-control checkout-input ${touched.apellido && errors.apellido ? "is-invalid" : touched.apellido && !errors.apellido ? "is-valid" : ""}`}
                                            value={formData.apellido}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.apellido && errors.apellido && <small className="error-message">{errors.apellido}</small>}
                                    </div>
                                </div>

                                {/* DNI, Cod Area, Telefono */}
                                <div className="row">
                                    <div className="col-md-4 form-group mb-3">
                                        <label className="checkout-label">DNI*</label>
                                        <input
                                            type="text"
                                            name="dni"
                                            placeholder="99999999"
                                            className={`form-control checkout-input ${touched.dni && errors.dni ? "is-invalid" : touched.dni && !errors.dni ? "is-valid" : ""}`}
                                            value={formData.dni}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.dni && errors.dni && <small className="error-message">{errors.dni}</small>}
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label className="checkout-label">Cód. área*</label>
                                        <input
                                            type="text"
                                            name="codArea"
                                            placeholder="+54 ej: 11"
                                            className={`form-control checkout-input ${touched.codArea && errors.codArea ? "is-invalid" : touched.codArea && !errors.codArea ? "is-valid" : ""}`}
                                            value={formData.codArea}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.codArea && errors.codArea && <small className="error-message">{errors.codArea}</small>}
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label className="checkout-label">Teléfono*</label>
                                        <input
                                            type="text"
                                            name="telefono"
                                            placeholder="ej: 1234-5678"
                                            className={`form-control checkout-input ${touched.telefono && errors.telefono ? "is-invalid" : touched.telefono && !errors.telefono ? "is-valid" : ""}`}
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.telefono && errors.telefono && <small className="error-message">{errors.telefono}</small>}
                                    </div>
                                </div>

                                {/* Checkboxes */}
                                <div className="checkout-checkboxes-section mt-4">
                                    <label className="checkout-checkbox-container mb-3 d-flex align-items-start gap-2">
                                        <input
                                            type="checkbox"
                                            name="promoOptIn"
                                            className="checkout-checkbox"
                                            checked={formData.promoOptIn}
                                            onChange={handleChange}
                                        />
                                        <span className="checkbox-custom-label">¡Entérate de las ofertas antes que se agoten!</span>
                                    </label>

                                    <label className="checkout-checkbox-container d-flex align-items-start gap-2">
                                        <input
                                            type="checkbox"
                                            name="termsAccepted"
                                            className="checkout-checkbox"
                                            checked={formData.termsAccepted}
                                            onChange={handleChange}
                                        />
                                        <span className="checkbox-custom-label">
                                            Acepto los <strong>Términos y Condiciones</strong> y <strong>Aviso de Privacidad</strong>.
                                        </span>
                                    </label>
                                </div>

                                {/* Botón Continuar */}
                                <div className="checkout-action-container mt-4">
                                    <button
                                        type="submit"
                                        className="btn-checkout-continue"
                                        disabled={!isStep1Valid}
                                    >
                                        continuar
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="summary-step-content">
                                <p className="mb-0"><strong>Nombre y apellido:</strong> {formData.nombre} {formData.apellido}</p>
                                <p className="mb-0"><strong>Email:</strong> {formData.email}</p>
                                <p className="mb-0 text-muted"><strong>Teléfono:</strong> {formData.codArea} {formData.telefono}</p>
                            </div>
                        )}
                    </div>

                    {/* ======================================================== */}
                    {/* PASO 2 - ENTREGA */}
                    {/* ======================================================== */}
                    <div className={`checkout-card mb-4 ${activeStep < 2 ? "step-locked" : activeStep === 2 ? "step-active" : "step-completed"}`}>
                        <div className="step-card-header d-flex justify-content-between align-items-center w-100">
                            <h3 className="checkout-section-title mb-0 text-nowrap">2 - Entrega</h3>
                            {activeStep > 2 && (
                                <button className="btn-step-modify btn btn-link p-0 text-decoration-none" onClick={() => setActiveStep(2)}>
                                    Modificar
                                </button>
                            )}
                        </div>
                        <hr className="title-divider" />

                        {activeStep < 2 ? (
                            <div className="locked-step-message text-muted py-3">
                                Aún falta completar los datos del paso anterior
                            </div>
                        ) : activeStep === 2 ? (
                            <form onSubmit={handleStep2Submit} className="checkout-form">
                                <div className="delivery-methods-group mb-4">
                                    <label className="delivery-radio-card d-flex align-items-center gap-3 p-3 border rounded mb-3">
                                        <input
                                            type="radio"
                                            name="entregaMetodo"
                                            value="sucursal"
                                            checked={formData.entregaMetodo === "sucursal"}
                                            onChange={handleChange}
                                        />
                                        <div className="radio-text">
                                            <div className="fw-bold">Retiro por sucursal (Librería Nocturna)</div>
                                            <div className="text-muted small">Retiro gratuito - Listo en 24hs</div>
                                        </div>
                                        <span className="ms-auto fw-bold text-success text-nowrap">Gratis</span>
                                    </label>

                                    <label className="delivery-radio-card d-flex align-items-center gap-3 p-3 border rounded">
                                        <input
                                            type="radio"
                                            name="entregaMetodo"
                                            value="domicilio"
                                            checked={formData.entregaMetodo === "domicilio"}
                                            onChange={handleChange}
                                        />
                                        <div className="radio-text">
                                            <div className="fw-bold">Envío a domicilio</div>
                                            <div className="text-muted small">Entrega en tu dirección en 3 a 5 días hábiles</div>
                                        </div>
                                        <span className="ms-auto fw-bold text-nowrap">$3.500</span>
                                    </label>
                                </div>

                                {formData.entregaMetodo === "domicilio" && (
                                    <div className="delivery-address-form row g-3 mb-4">
                                        <div className="col-12 form-group">
                                            <label className="checkout-label">Calle y Número*</label>
                                            <input
                                                type="text"
                                                name="calle"
                                                className={`form-control checkout-input ${touched.calle && errors.calle ? "is-invalid" : touched.calle && !errors.calle ? "is-valid" : ""}`}
                                                value={formData.calle}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Av. Corrientes 1234, 4° B"
                                            />
                                            {touched.calle && errors.calle && <small className="error-message">{errors.calle}</small>}
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label className="checkout-label">Localidad*</label>
                                            <input
                                                type="text"
                                                name="localidad"
                                                className={`form-control checkout-input ${touched.localidad && errors.localidad ? "is-invalid" : touched.localidad && !errors.localidad ? "is-valid" : ""}`}
                                                value={formData.localidad}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="CABA"
                                            />
                                            {touched.localidad && errors.localidad && <small className="error-message">{errors.localidad}</small>}
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label className="checkout-label">Código Postal*</label>
                                            <input
                                                type="text"
                                                name="codigoPostal"
                                                className={`form-control checkout-input ${touched.codigoPostal && errors.codigoPostal ? "is-invalid" : touched.codigoPostal && !errors.codigoPostal ? "is-valid" : ""}`}
                                                value={formData.codigoPostal}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="1425"
                                            />
                                            {touched.codigoPostal && errors.codigoPostal && <small className="error-message">{errors.codigoPostal}</small>}
                                        </div>
                                    </div>
                                )}

                                <div className="checkout-action-container">
                                    <button
                                        type="submit"
                                        className="btn-checkout-continue"
                                        disabled={!isStep2Valid}
                                    >
                                        continuar
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="summary-step-content">
                                <p className="mb-1">
                                    <strong>Método:</strong> {formData.entregaMetodo === "sucursal" ? "Retiro por sucursal" : "Envío a domicilio"}
                                </p>
                                {formData.entregaMetodo === "domicilio" && (
                                    <p className="mb-0 text-muted">
                                        Dirección: {formData.calle}, {formData.localidad} (CP: {formData.codigoPostal})
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ======================================================== */}
                    {/* PASO 3 - PAGO */}
                    {/* ======================================================== */}
                    <div className={`checkout-card mb-4 ${activeStep < 3 ? "step-locked" : "step-active"}`}>
                        <div className="step-card-header d-flex justify-content-between align-items-center">
                            <h3 className="checkout-section-title">3 - Pago</h3>
                        </div>
                        <hr className="title-divider" />

                        {activeStep < 3 ? (
                            <div className="locked-step-message text-muted py-3">
                                Aún falta completar los datos del paso anterior
                            </div>
                        ) : (
                            <form onSubmit={handleFinalSubmit} className="checkout-form">
                                <div className="payment-wizard-container">
                                    
                                    {/* Sidebar de métodos de pago en listado vertical */}
                                    <div className="payment-sidebar-methods">
                                        <div 
                                            className={`payment-sidebar-option ${formData.pagoMetodo === "debito" ? "active" : ""}`}
                                            onClick={() => setFormData(prev => ({ ...prev, pagoMetodo: "debito", tarjetaCuotas: "1" }))}
                                        >
                                            <span className="payment-icon">💳</span>
                                            <span className="payment-text">Tarjeta de débito</span>
                                        </div>
                                        <div 
                                            className={`payment-sidebar-option ${formData.pagoMetodo === "credito" ? "active" : ""}`}
                                            onClick={() => setFormData(prev => ({ ...prev, pagoMetodo: "credito", tarjetaCuotas: "1" }))}
                                        >
                                            <span className="payment-icon">💳</span>
                                            <span className="payment-text">Tarjeta de crédito</span>
                                        </div>
                                        <div 
                                            className={`payment-sidebar-option ${formData.pagoMetodo === "efectivo" ? "active" : ""}`}
                                            onClick={() => setFormData(prev => ({ ...prev, pagoMetodo: "efectivo" }))}
                                        >
                                            <span className="payment-icon">💵</span>
                                            <span className="payment-text">Efectivo / CBU</span>
                                        </div>
                                    </div>

                                    {/* Panel de campos dinámicos */}
                                    <div className="payment-fields-panel">
                                        {formData.pagoMetodo === "efectivo" ? (
                                            <div className="efectivo-payment-message p-3 border rounded">
                                                <div className="fw-bold mb-2">Efectivo / Transferencia Directa</div>
                                                <p className="text-muted mb-0 small">
                                                    Abonas en efectivo al retirar en sucursal, o realizas transferencia bancaria antes de coordinar tu envío.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="payment-card-details-grid">
                                                
                                                {/* ROW 1: NUMERO DE TARJETA & CUOTAS */}
                                                <div className="row mb-2">
                                                    <div className="col-md-6 form-group">
                                                        <label className="checkout-label">Número</label>
                                                        <input
                                                            type="text"
                                                            name="tarjetaNumero"
                                                            maxLength="19"
                                                            className={`form-control checkout-input ${touched.tarjetaNumero && errors.tarjetaNumero ? "is-invalid" : touched.tarjetaNumero && !errors.tarjetaNumero ? "is-valid" : ""}`}
                                                            value={formData.tarjetaNumero}
                                                            onChange={(e) => {
                                                                const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                                                                const matches = v.match(/\d{4,16}/g);
                                                                const match = (matches && matches[0]) || '';
                                                                const parts = [];
                                                                for (let i = 0, len = match.length; i < len; i += 4) {
                                                                    parts.push(match.substring(i, i + 4));
                                                                }
                                                                e.target.value = parts.length > 0 ? parts.join(' ') : v;
                                                                handleChange(e);
                                                            }}
                                                            onBlur={handleBlur}
                                                            placeholder="0000 0000 0000 0000"
                                                        />
                                                        {touched.tarjetaNumero && errors.tarjetaNumero && <small className="error-message">{errors.tarjetaNumero}</small>}
                                                    </div>
                                                    
                                                    <div className="col-md-6 form-group">
                                                        <label className="checkout-label">Cuotas disponibles:</label>
                                                        <select
                                                            name="tarjetaCuotas"
                                                            className="form-select checkout-input"
                                                            value={formData.tarjetaCuotas}
                                                            onChange={handleChange}
                                                        >
                                                            {formData.pagoMetodo === "debito" ? (
                                                                <option value="1">
                                                                    Total - ${total.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                </option>
                                                            ) : (
                                                                <>
                                                                    <option value="1">
                                                                        1 pago sin interés de ${total.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                    </option>
                                                                    <option value="2">
                                                                        2 cuotas sin interés de ${(total / 2).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                    </option>
                                                                    <option value="3">
                                                                        3 cuotas sin interés de ${(total / 3).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                    </option>
                                                                </>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* BRAND LOGOS */}
                                                <div className="brand-logos-row mb-3 d-flex gap-2 align-items-center">
                                                    <div className="brand-logo-badge">VISA</div>
                                                    <div className="brand-logo-badge">Maestro</div>
                                                    <div className="brand-logo-badge">Mastercard</div>
                                                </div>

                                                {/* ROW 3: NOMBRE & VENCIMIENTO */}
                                                <div className="row mb-3">
                                                    <div className="col-md-6 form-group">
                                                        <label className="checkout-label">Nombre y Apellido</label>
                                                        <input
                                                            type="text"
                                                            name="tarjetaNombre"
                                                            className={`form-control checkout-input ${touched.tarjetaNombre && errors.tarjetaNombre ? "is-invalid" : touched.tarjetaNombre && !errors.tarjetaNombre ? "is-valid" : ""}`}
                                                            value={formData.tarjetaNombre}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            placeholder="JUAN PEREZ"
                                                        />
                                                        {touched.tarjetaNombre && errors.tarjetaNombre && <small className="error-message">{errors.tarjetaNombre}</small>}
                                                    </div>
                                                    
                                                    <div className="col-md-6 form-group">
                                                        <label className="checkout-label">Fecha de Vencimiento</label>
                                                        <div className="expiry-dropdowns d-flex align-items-center gap-1">
                                                            <select
                                                                name="tarjetaMes"
                                                                className={`form-select checkout-input expiry-select ${touched.tarjetaMes && errors.tarjetaMes ? "is-invalid" : ""}`}
                                                                value={formData.tarjetaMes}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            >
                                                                <option value="">MM</option>
                                                                {Array.from({ length: 12 }, (_, i) => {
                                                                    const val = String(i + 1).padStart(2, "0");
                                                                    return <option key={val} value={val}>{val}</option>;
                                                                })}
                                                            </select>
                                                            <span className="expiry-slash">/</span>
                                                            <select
                                                                name="tarjetaAnio"
                                                                className={`form-select checkout-input expiry-select ${touched.tarjetaAnio && errors.tarjetaAnio ? "is-invalid" : ""}`}
                                                                value={formData.tarjetaAnio}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            >
                                                                <option value="">AA</option>
                                                                {Array.from({ length: 11 }, (_, i) => {
                                                                    const val = String(26 + i);
                                                                    return <option key={val} value={val}>{val}</option>;
                                                                })}
                                                            </select>
                                                        </div>
                                                        {((touched.tarjetaMes && errors.tarjetaMes) || (touched.tarjetaAnio && errors.tarjetaAnio)) && (
                                                            <small className="error-message">Vencimiento requerido</small>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* ROW 4: CVV & DNI PAGADOR */}
                                                <div className="row mb-3">
                                                    <div className="col-md-6 form-group">
                                                        <label className="checkout-label">CVV</label>
                                                        <input
                                                            type="password"
                                                            name="tarjetaCvv"
                                                            maxLength="4"
                                                            className={`form-control checkout-input ${touched.tarjetaCvv && errors.tarjetaCvv ? "is-invalid" : touched.tarjetaCvv && !errors.tarjetaCvv ? "is-valid" : ""}`}
                                                            value={formData.tarjetaCvv}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            placeholder="123"
                                                        />
                                                        {touched.tarjetaCvv && errors.tarjetaCvv && <small className="error-message">{errors.tarjetaCvv}</small>}
                                                    </div>
                                                    
                                                    <div className="col-md-6 form-group">
                                                        <label className="checkout-label">DNI del pagador (Opcional)</label>
                                                        <input
                                                            type="text"
                                                            name="dniPagador"
                                                            className="form-control checkout-input"
                                                            value={formData.dniPagador}
                                                            onChange={handleChange}
                                                            placeholder="DNI si difiere del titular"
                                                        />
                                                    </div>
                                                </div>

                                                {/* ROW 5: DIRECCION DE FACTURACION (CÓDIGO POSTAL) */}
                                                <div className="billing-address-section">
                                                    <h5 className="checkout-subheading mb-3">Dirección de facturación</h5>
                                                    <div className="row">
                                                        <div className="col-md-6 form-group mb-4">
                                                            <label className="checkout-label">Código Postal *</label>
                                                            <input
                                                                type="text"
                                                                name="facturacionCp"
                                                                className={`form-control checkout-input ${touched.facturacionCp && errors.facturacionCp ? "is-invalid" : touched.facturacionCp && !errors.facturacionCp ? "is-valid" : ""}`}
                                                                value={formData.facturacionCp}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="CP de facturación"
                                                            />
                                                            {touched.facturacionCp && errors.facturacionCp && <small className="error-message">{errors.facturacionCp}</small>}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="checkout-action-container mt-4">
                                    <button
                                        type="submit"
                                        className="btn-checkout-continue"
                                        disabled={!isStep3Valid}
                                    >
                                        Confirmar compra
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                </div>

                {/* COLUMNA DERECHA: RESUMEN DE COMPRA */}
                <div className="checkout-right-column">
                    <div className="checkout-summary-card">
                        <h4 className="summary-title">Resumen de compra</h4>
                        <hr className="title-divider" />
                        
                        <div className="summary-items-list">
                            {cart.map(item => (
                                <div className="summary-item-row" key={item.id}>
                                    <div className="summary-item-img-container">
                                        <img
                                            src={item.src || "https://via.placeholder.com/150"}
                                            alt={item.nombre}
                                            className="summary-item-img"
                                        />
                                    </div>
                                    <div className="summary-item-details">
                                        <span className="summary-item-name">{item.nombre}</span>
                                        <span className="summary-item-qty text-muted">Cant: {item.quantity}</span>
                                    </div>
                                    <div className="summary-item-price fw-bold">
                                        ${Number(item.precio * item.quantity).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr className="summary-divider" />

                        <div className="summary-pricing-details">
                            <div className="pricing-row d-flex justify-content-between mb-2">
                                <span className="pricing-label text-muted">Subtotal</span>
                                <span className="pricing-value">${subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="pricing-row d-flex justify-content-between mb-2">
                                <span className="pricing-label text-muted">Costo de entrega</span>
                                <span className="pricing-value">
                                    {entregaCosto === 0 ? <span className="text-success fw-bold">Gratis</span> : `$${entregaCosto.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`}
                                </span>
                            </div>
                            <hr className="summary-divider-thin" />
                            <div className="pricing-row d-flex justify-content-between total-row align-items-center">
                                <span className="pricing-label-total">Total</span>
                                <span className="pricing-value-total">${total.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;