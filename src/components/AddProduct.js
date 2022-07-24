import React,{useState} from 'react'
import Header from '../Header'
import {Form,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

function AddProduct() {

  const navigate = useNavigate();

  const [name,setName] = useState('')
  const [price,setPrice] = useState()
  const [description,setDescription] = useState('')
  const [image,setImage] = useState('')

  const addProduct = async (e) =>
  {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name',name);
    formData.append('price',price);
    formData.append('description',description);
    formData.append('image',image);
    let result = await fetch('http://localhost:8000/api/products',
    {
      method:'POST',
      body: formData
    })

    result = await result.json();
    navigate("/products_list", { replace: true });
  }

  return (
    <div>
      <Header/>
        <h1>Add Product</h1>
        <div className='col-sm-6 offset-sm-3'>
         <Form onSubmit={addProduct}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product name</Form.Label>
          <Form.Control type="text" name="name" onChange={(e) =>{setName(e.target.value)}} value={name} placeholder="Enter name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" name="price" onChange={(e) =>{setPrice(e.target.value)}} value={price} placeholder="Enter price" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image" onChange = {(e) => {setImage(e.target.files[0])}} placeholder="add file" />
          </Form.Group>
          <Form.Control as="textarea" name="description" onChange={(e) =>{setDescription(e.target.value)}} value={description} placeholder="Description...." />
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
        </div>
    </div>
  )
}

export default AddProduct