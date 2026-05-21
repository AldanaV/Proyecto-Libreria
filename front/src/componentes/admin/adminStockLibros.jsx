import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./adminstocklibro.css";

const AdminStockLibros = () => {
    const [libros, setLibros] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [formEdit, setFormEdit] = useState({
        isbn: "",
        titulo: "",
        autor: "",
        editorial: "",
        categoria: "",
        idioma: "",
        precio: "",
        stock: "",
        imagen: "",
        descripcion: ""
    });

    // 📥 TRAER LIBROS
    const fetchLibros = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/books");
            const data = await res.json();
            setLibros(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLibros();
    }, []);

    // 🗑️ ELIMINAR
    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar libro?")) return;

        await fetch(`http://localhost:5000/api/books/${id}`, {
            method: "DELETE"
        });

        setLibros(prev => prev.filter(l => l._id !== id));
    };

    // ✏️ ACTIVAR EDICIÓN
    const handleEditClick = (libro) => {
        setEditandoId(libro._id);
        setFormEdit({ ...libro });
    };

    // 💾 GUARDAR
    const handleSave = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/books/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formEdit,
                    precio: Number(formEdit.precio),
                    stock: Number(formEdit.stock)
                })
            });

            if (res.ok) {
                setEditandoId(null);
                fetchLibros(); // refresca datos
            }
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    // 🔍 FILTRO
    const librosFiltrados = libros.filter(libro =>
        libro.isbn?.toLowerCase().includes(busqueda.toLowerCase()) ||
        libro.titulo?.toLowerCase().includes(busqueda.toLowerCase()) ||
        libro.autor?.toLowerCase().includes(busqueda.toLowerCase()) ||
        libro.editorial?.toLowerCase().includes(busqueda.toLowerCase()) ||
        libro.categoria?.toLowerCase().includes(busqueda.toLowerCase()) ||
        libro.idioma?.toLowerCase().includes(busqueda.toLocaleLowerCase())
    );

    return (
        <div className="stock-wrapper">
            <div className="stock-container">

                {/* HEADER */}
                <div className="header-stock mb-4">
                    <h2 className="stock-title">📚 Stock de libros</h2>

                    <Link to="/admin/libros/nuevo" className="btn-admin-add">
                        ✚ Agregar libro
                    </Link>
                </div>

                {/* BUSCADOR (oculto si se edita para evitar distracciones) */}
                {!editandoId && (
                    <div className="search-container mb-4">
                        <input
                            type="text"
                            className="form-control stock-search-input"
                            placeholder="Buscar por ISBN, título, autor, editorial, categoría o idioma..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                )}

                {editandoId ? (
                    /* INTERFAZ DE EDICIÓN (REEMPLAZA LA TABLA) */
                    <div className="edit-form-wrapper">
                        <div className="edit-form-card">
                            <h3>✏️ Editando: {formEdit.titulo}</h3>
                            <hr />
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">ISBN</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formEdit.isbn}
                                        onChange={(e) => setFormEdit({ ...formEdit, isbn: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Título</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formEdit.titulo}
                                        onChange={(e) => setFormEdit({ ...formEdit, titulo: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Autor</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formEdit.autor}
                                        onChange={(e) => setFormEdit({ ...formEdit, autor: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Editorial</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formEdit.editorial}
                                        onChange={(e) => setFormEdit({ ...formEdit, editorial: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Categoría</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formEdit.categoria}
                                        onChange={(e) => setFormEdit({ ...formEdit, categoria: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Idioma</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formEdit.idioma}
                                        onChange={(e) => setFormEdit({ ...formEdit, idioma: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Precio ($)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={formEdit.precio}
                                        onChange={(e) => setFormEdit({ ...formEdit, precio: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Stock</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={formEdit.stock}
                                        onChange={(e) => setFormEdit({ ...formEdit, stock: e.target.value })}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">URL de la Imagen</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formEdit.imagen}
                                        onChange={(e) => setFormEdit({ ...formEdit, imagen: e.target.value })}
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Descripción</label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        value={formEdit.descripcion}
                                        onChange={(e) => setFormEdit({ ...formEdit, descripcion: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="edit-form-actions mt-4">
                                <button className="btn btn-success" onClick={() => handleSave(editandoId)}>
                                    💾 Guardar Cambios
                                </button>
                                <button className="btn btn-secondary" onClick={() => setEditandoId(null)}>
                                    ✖ Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* TABLA DE LIBROS */
                    <div className="table-responsive">
                        <table className="table table-hover align-middle stock-table">
                            <thead className="stock-table-head">
                                <tr>
                                    <th>ISBN</th>
                                    <th>Título</th>
                                    <th>Autor</th>
                                    <th>Editorial</th>
                                    <th>Categoría</th>
                                    <th>Idioma</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {librosFiltrados.map(libro => (
                                    <tr key={libro._id}>
                                        <td className="fw-bold">{libro.isbn}</td>
                                        <td>{libro.titulo}</td>
                                        <td>{libro.autor}</td>
                                        <td>{libro.editorial}</td>
                                        <td><span className="badge-category">{libro.categoria}</span></td>
                                        <td>{libro.idioma}</td>
                                        <td><span className="price-text">${libro.precio}</span></td>
                                        <td className="text-center">
                                            <span className={`badge stock-badge ${libro.stock < 5 ? "bg-danger" : libro.stock < 10 ? "bg-warning text-dark" : "bg-success"}`}>
                                                {libro.stock}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="admin-actions-cell">
                                                <button className="btn btn-warning btn-sm action-btn" onClick={() => handleEditClick(libro)} title="Editar">
                                                    ✏️
                                                </button>
                                                <button className="btn btn-danger btn-sm action-btn" onClick={() => handleDelete(libro._id)} title="Eliminar">
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminStockLibros;