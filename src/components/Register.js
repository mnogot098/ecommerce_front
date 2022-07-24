import React from 'react'
import {Form,Button} from 'react-bootstrap'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header'

function Register() {

  useEffect(()=>
  {
    if(localStorage.getItem('user-info'))
    {
      navigate('/add',{ replace: true });
    }
  },[])

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()


  const signup = async (e) =>
  {
    e.preventDefault();
    let user = {name,email,password};
    let res = await fetch('http://localhost:8000/api/register',
    {
      method:'POST',
      body: JSON.stringify(user),
      headers:
      {
        'Content-Type':'application/json',
        'Accept':'application/json'
      } 
    })
    res = await res.json();
    localStorage.setItem('user-info',JSON.stringify(res))
    navigate("/add", { replace: true });

  }

  return (
    <div>
      <Header/>
        <h1>Register</h1>
        <div className='col-sm-6 offset-sm-3'>
        <Form onSubmit={signup}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" onChange={(e) =>{setName(e.target.value)}} value={name} placeholder="Enter name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" onChange={(e) =>{setEmail(e.target.value)}} value={email} placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" onChange={(e) =>{setPassword(e.target.value)}} value={password} placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
        </div>
    </div>
  )
}

export default Register