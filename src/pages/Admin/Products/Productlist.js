import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Productlist() {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    function getProducts() {
        fetch("http://localhost:4000/products?_sort=id&_order=desc") // asc
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error();
            })
            .then(data => {
                setProducts(data);
            })
            .catch(err => {
                alert("Unable to get the data");
            });
    }

    useEffect(getProducts, []);

    function handleDeleteClick(id) {
        setSelectedProductId(id);
        setShowModal(true);
    }

    function deleteProduct() {
        fetch("http://localhost:4000/products/" + selectedProductId, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error();
                }
                getProducts();
                setShowModal(false);
            })
            .catch(error => {
                alert("Unable to delete the product");
            });
    }

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Dashboard Products</h2>
            <div className="row mb-3">
                <div className="col">
                    <Link className="btn btn-primary me-1" to="/Admin/Products/Create" role="button">
                        Create Product
                    </Link>
                    <button type="button" className="btn btn-outline-primary" onClick={getProducts}>
                        Refresh
                    </button>
                </div>
                <div className="col"></div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name Course</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>
                                <img src={"http://localhost:4000/images/" + product.url} width="100" alt="..." />
                            </td>
                            <td>{product.category}</td>
                            <td>{product.price} $</td>
                            <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                <Link className="btn btn-primary btn-sm me-1" to={"/Admin/Products/Edit/" + product.id}>
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteClick(product.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Bootstrap Modal */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirm Deletion</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this product?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>No</button>
                            <button type="button" className="btn btn-danger" onClick={deleteProduct}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Productlist;
