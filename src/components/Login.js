import React,{useEffect,useState} from 'react'
import Header from '../Header'
import {Form,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

function Login() {

  useEffect(()=>
  {
    if(localStorage.getItem('user-info'))
    {
      navigate('/add',{ replace: true });
    }
  },[])

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (e) =>
  {
    e.preventDefault();
    let user = {email,password};
    let result = await fetch('http://localhost:8000/api/login',
    {
      method:'POST',
      body: JSON.stringify(user),
      headers:
      {
        'Content-Type':'application/json',
        'Accept':'application/json'
      } 
    })

    result = await result.json();
    localStorage.setItem('user-info',JSON.stringify(result));
    navigate("/add", { replace: true });
  }

  return (
    <div>
      <Header/>
        <h1>Login</h1>
        <div className='col-sm-6 offset-sm-3'>
         <Form onSubmit={login}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" onChange={(e) =>{setEmail(e.target.value)}} value={email} placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" onChange={(e) =>{setPassword(e.target.value)}} value={password} placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        </div>
    </div>
  )
}

export default Login