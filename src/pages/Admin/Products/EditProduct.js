import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProduct(){

    const params=useParams()
    const[initialData,setInitialData] = useState()
    const [validationErrors,setValidationErrors] = useState({})

        const navigate =useNavigate()

        function getProduct(){
            fetch("http://localhost:4000/products/" + params.id)
            .then(response=>{
                if(response.ok){
                    return response.json()
                }

                throw new Error()
            })
            .then(data=>{
                setInitialData(data)
            })
            .catch(error=>{
                alert("Unable to read product details")
            })
        }

        useEffect(getProduct,[])

  async  function HandleSubmit(event){
        event.preventDefault()

        const formData=new FormData(event.target)
        const product = Object.fromEntries(formData.entries())

        if(!product.title || !product.category||!product.price/* !product.description|| */){
            alert("please fill all fields")
            return
        }
        try{
            const response= await fetch("http://localhost:4000/products/"+params.id,{
                method:"PATCH",
                body:formData
            })
            const data = await response.json()

            if(response.ok){
                //product crated correctly
                navigate("/Admin/Products")
            }else if(response.status===400){
                setValidationErrors(data)
            }else{
                alert("‘Unable to create  the  product !")
            }
        }
        catch(error){
            alert("‘Unable to Update  the  server !")
        }
    }
    return(
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Edit Product</h2>

                    <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">ID</label>
                            <div className="col-sm-8">
                                <input readOnly className="form-control-plaintext" defaultValue={params.id}/>
                            </div>

                        </div>
                    {
                        initialData &&
                    <form onSubmit={HandleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Title</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="title" defaultValue={initialData.title}/>
                                <span className="text-danger">{validationErrors.title}</span>
                            </div>

                        </div>

                        {/* <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Type Or Brand</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="type"/>
                                <span className="text-danger"></span>
                            </div>

                        </div> */}

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select className="form-select" name="category" defaultValue={initialData.category}>
                                    <option value='Other'>Other</option>
                                    <option value='FrontEnd'>FrontEnd</option>
                                    <option value='BackEnd'>BackEnd</option>
                                    <option value='Design'>Design</option>
                                    <option value='Marketing'>Marketing</option>
                                    <option value='languages'>languages</option>

                                </select>
                            </div>

                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Price</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="price" type="number" step="0.01" min="1" defaultValue={initialData.price}/>
                                <span className="text-danger">{validationErrors.price}</span>
                            </div>

                        </div>

                       {/*  <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Description</label>
                            <div className="col-sm-8">
                                <textarea className="form-control" name="description" rows="4" defaultValue={initialData.description}/>
                                <span className="text-danger"></span>
                            </div>
                        </div> */}

                        <div className="row mb-3">
                            <div className="offset-sm-4 col-sm-8">
                                <img src={"http://localhost:4000/images/" + initialData.url}
                                width={150} alt="..."/>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Image</label>
                            <div className="col-sm-8">
                            <input className="form-control" type="file" name="image"/>
                                <span className="text-danger">{validationErrors.image}</span>
                            </div>
                        </div>

                        {/* <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">CrearedAt</label>
                            <div className="col-sm-8">
                            <input readOnly className="form-control-plaintext" defaultValue={initialData.createdAt.slice(0,10)}/>
                            </div>
                        </div> */}

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link className="btn btn-secondary" to='/Admin/Products' role="button">Cancel</Link>
                                

                            </div>
                        </div>

                        
                    </form>
                    }
                </div>

            </div>

        </div>
    )
}