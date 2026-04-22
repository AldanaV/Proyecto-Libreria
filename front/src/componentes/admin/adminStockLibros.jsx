import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./adminstocklibro.css";

const AdminStockLibros = () => {
    const [libros, setLibros] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [formEdit, setFormEdit] = useState({ precio: "", stock: "" });

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
        setFormEdit({
            precio: libro.precio,
            stock: libro.stock
        });
    };

    // 💾 GUARDAR
    const handleSave = async (id) => {
        await fetch(`http://localhost:5000/api/books/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                precio: Number(formEdit.precio),
                stock: Number(formEdit.stock)
            })
        });

        setEditandoId(null);
        fetchLibros(); // refresca datos
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
        <div className="container mt-4">

            {/* HEADER */}
            <div className="header-stock">
                <h2>📚 Stock de libros</h2>

                <Link to="/admin/libros/nuevo" className="btn-admin-small">
                    ✚ Agregar libro
                </Link>
            </div>

            {/* BUSCADOR */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">

                    <thead className="table-dark">
                        <tr>
                            <th>ISBN</th>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Editorial</th>
                            <th>Categoría</th>
                            <th>Idioma</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {librosFiltrados.map(libro => (
                            <tr key={libro._id}>
                                <td>{libro.isbn}</td>
                                <td>{libro.titulo}</td>
                                <td>{libro.autor}</td>
                                <td>{libro.editorial}</td>
                                <td>{libro.categoria}</td>
                                <td>{libro.idioma}</td>

                                {/* PRECIO */}
                                <td>
                                    {editandoId === libro._id ? (
                                        <input
                                            type="number"
                                            value={formEdit.precio}
                                            onChange={(e) =>
                                                setFormEdit({ ...formEdit, precio: e.target.value })
                                            }
                                            className="form-control form-control-sm"
                                        />
                                    ) : (
                                        `$${libro.precio}`
                                    )}
                                </td>

                                {/* STOCK */}
                                <td className="text-center">
                                    {editandoId === libro._id ? (
                                        <input
                                            type="number"
                                            value={formEdit.stock}
                                            onChange={(e) =>
                                                setFormEdit({ ...formEdit, stock: e.target.value })
                                            }
                                            className="form-control form-control-sm"
                                        />
                                    ) : (
                                        <span
                                            className={`badge fs-6 ${
                                                libro.stock > 10
                                                ? "bg-success"
                                                : libro.stock > 0
                                                ? "bg-warning text-dark"
                                                : "bg-danger"
                                            }`}
                                        >
                                          {libro.stock}  
                                        </span>
                                        
                                    )}
                                </td>

                                {/* ACCIONES */}
                                <td>
                                    {editandoId === libro._id ? (
                                        <>
                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() => handleSave(libro._id)}
                                            >
                                                ✔
                                            </button>

                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => setEditandoId(null)}
                                            >
                                                ✖
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEditClick(libro)}
                                            >
                                                ✏️
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(libro._id)}
                                            >
                                                🗑️
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AdminStockLibros;