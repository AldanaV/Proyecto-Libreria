import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admincrearlibro.css";

const AdminCrearLibro = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        isbn: "",
        titulo: "",
        autor: "",
        editorial: "",
        paginas: "",
        categoria: "",
        idioma: "",
        descripcion: "",
        precio: "",
        imagen: "",
        stock: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...form,
                    precio: Number(form.precio),
                    stock: Number(form.stock),
                    paginas: Number(form.paginas)
                })
            });

            const data = await res.json();
            if(!res.ok){
                console.log("Error: ",data);
                return;
            }
            console.log("Libro creado:", data);
            navigate("/admin/stock"); // vuelve a la tabla
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Agregar libro</h2>

            <form onSubmit={handleSubmit} className="mt-3">

                <input
                    type="text"
                    name="isbn"
                    placeholder="ISBN"
                    className="form-control mb-2"
                    value={form.isbn}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    className="form-control mb-2"
                    value={form.titulo}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="autor"
                    placeholder="Autor"
                    className="form-control mb-2"
                    value={form.autor}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="editorial"
                    placeholder="Editorial"
                    className="form-control mb-2"
                    value={form.editorial}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="paginas"
                    placeholder="Páginas"
                    className="form-control mb-2"
                    value={form.paginas}
                    onChange={handleChange}
                />

                <select
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    className="form-select mb-2 "
                    required
                >
                    <option value="">Seleccionar categoría</option>
                    <option value="Fantasia">Fantasía</option>
                    <option value="Terror">Terror</option>
                    <option value="Romance">Romance</option>
                    <option value="Ciencia Ficcion">Ciencia Ficción</option>
                    <option value="Misterio">Misterio</option>
                    <option value="Drama">Drama</option>
                    <option value="Infantil">Infantil</option>
                    <option value="Historia">Historia</option>
                    <option value="Poesía">Poesía</option>
                </select>

                <select
                    name="idioma"
                    value={form.idioma}
                    onChange={handleChange}
                    className="form-select mb-2"
                    required
                >
                    <option value="">Seleccionar idioma</option>
                    <option value="Español">Español</option>
                    <option value="Inglés">Inglés</option>
                </select>
                <input
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    className="form-control mb-2"
                    value={form.precio}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="imagen"
                    placeholder="URL de imagen"
                    className="form-control mb-2"
                    value={form.imagen}
                    onChange={handleChange}
                />
                
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    className="form-control mb-2"
                    value={form.stock}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="descripcion"
                    placeholder="Descripción del libro"
                    className="form-control mb-2"
                    value={form.descripcion}
                    onChange={handleChange}
                    rows={4}
                />
                    <button className="btn btn-primary w-100 mt-2">
                        Guardar libro
                    </button>

                    <button
                    type="button"
                    className="btn btn-secondary me-2 mt-2"
                    onClick={() => navigate(-1)}
                    >
                    Volver
                    </button>
            </form>
        </div>
    );
};

export default AdminCrearLibro;