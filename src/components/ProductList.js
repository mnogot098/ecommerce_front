import React,{useState,useEffect} from 'react'
import Header from '../Header'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import {Link,useNavigate} from 'react-router-dom';


function ProductList() {
  const [data,setData] = useState([]);
  const [product,setProduct] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

 const getProduct = async (id) => {
    let result = await fetch('http://localhost:8000/api/products/'+id)
    result = await result.json();
    setProduct(result.product);
 }

  const handleShow = async (id) => {
    getProduct(id);
    setShow(true);
  }

  const getProducts = async () => {
    let result = await fetch('http://localhost:8000/api/products');
    result = await result.json();
    setData(result.products);
  };

useEffect(() => {
    getProducts();
},[]);

const DeleteProduct = async (id) =>
{
    let result = await fetch('http://localhost:8000/api/products/'+id,
    {
      method:'DELETE'
    })
    result = await result.json();
    getProducts();
}

  return (
    <div>
        <Header/>
        <h1>Product listing</h1>
        <Table striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Description</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {
            data.map((data)=>
              <tr>
                <td>{data.name}</td>
                <td><img style={{width:100,height:100}} src={"http://localhost:8000/"+data.file_path} alt="Error"/></td>
                <td>{data.price}</td>
                <td>{data.description}</td>
                <td>
                    <Button onClick={() =>DeleteProduct(data.id)} className="m-2"variant="danger">Delete</Button>
                    <Button onClick={() =>handleShow(data.id)} className="m-2" variant="primary">Show</Button>
                </td>
              </tr>
            )
        }
      </tbody>
    </Table>
    <>
      <Modal show={show} onHide={handleClose}>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" className="mx-auto mt-2" style={{width:100}} src={"http://localhost:8000/"+product.file_path} alt="Error" />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          {product.description}
        </Card.Text>
        <Card.Text>
        <Badge bg="warning" className="py-2" text="dark">Price: {product.price}MAD</Badge>
        </Card.Text>
      </Card.Body>
    </Card>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    </div>
  )
}

export default ProductList