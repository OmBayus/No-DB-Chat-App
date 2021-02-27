import React, { useEffect, useState } from 'react';
import {Container,Row,Col,CardGroup,Card, InputGroup,FormControl,Button,Form,Alert} from "react-bootstrap"
import Fade from "react-reveal"
import {HiOutlineUser} from "react-icons/hi"
import {GoLock} from "react-icons/go"
import {socket} from "../../socket"
import {Redirect} from "react-router-dom"
import Cookies from 'js-cookie'
import "./login.css"


export default function Login() {

      const [userInfo,SetUserInfo] = useState({name:"",pass:""})
      const [isAuth,setAuth] = useState(false)
      const [Check,setCheck] = useState(false)


      //Kullanıcı Girişi
      useEffect(()=>{
            socket.on("login",data=>{
                  if(data.auth){
                        Cookies.set("token",data.token, { expires: 1 })
                        setTimeout(()=>{setAuth(true)},500)
                  }
                  else{
                        setCheck(true)
                        setTimeout(()=>{setCheck(false)},10000)
                  }
            })
      },[])

      //Eğer Token Varsa Kullanıcı Token Sorgusu
      useEffect(()=>{
            let token = Cookies.get("token")
        
            socket.emit("auth",token)
            
          },[])
        
      useEffect(()=>{
            socket.on("auth",(info)=>{
                  if(info.auth){
                        setAuth(true)
                  }
            })
      },[])

      const Submit = (e)=>{
            e.preventDefault()
            socket.emit("login",userInfo)
            SetUserInfo({name:"",pass:""})

      }

      const HandleChange = (e)=>{
            
            SetUserInfo(preventValue=>{
                  if(e.target.name==="UserName")
                        return{...preventValue,name:e.target.value}
                  else if(e.target.name==="Password")
                        return{...preventValue,pass:e.target.value}
            })
      }

      return (
      <div className="login" id="full-height">
            {isAuth && <Redirect to="/main" />}
            {Check && <div className="login-alert"><Fade top><Alert variant="danger">Kullanıcı Adı veya Şifre Hatalı!</Alert></Fade></div>}
            <Container>
            <Row className="justify-content-center">
            <Col md="1" className="p-2 cikolata-kenar"></Col>
            <Col md="10" className="p-0">
                  <CardGroup>
                  <Card className="p-4 login-left">
                  <Card.Body>
                        <Form onSubmit={Submit}>
                              <h1 className="text-white" >Login</h1>
                              <p className="text-muted">Sign In to your account</p>
                              
                              <InputGroup className="mb-3">
                              <InputGroup.Prepend>
                              <InputGroup.Text className="login-input"><div><HiOutlineUser/></div></InputGroup.Text>
                              </InputGroup.Prepend>
                              
                              <FormControl
                              placeholder="Username"
                              type="text"
                              className="login-input"
                              onChange={HandleChange}
                              value={userInfo.name}
                              name="UserName"
                              />
                              </InputGroup>
                              <InputGroup className="mb-4">
                              <InputGroup.Prepend>
                              <InputGroup.Text className="login-input"><div><GoLock/></div></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl
                              placeholder="Password"
                              type="password"
                              className="login-input"
                              onChange={HandleChange}
                              value={userInfo.pass}
                              name="Password"
                              />
                              </InputGroup>
                              <Row>
                              <Col>
                              <Button className="px-4" type="submit">Login</Button>
                              </Col>
                              <Col className="text-right">
                              <button className="btn btn-link px-0" type="button">Forgot password?</button>
                              </Col>
                              </Row>
                        </Form>
                  </Card.Body>
                  </Card>
                  <Card className="text-white py-5 login-right" id="log-reg" style={{width:"44%"}}>
                  <Card.Body className="text-center">
                        <div>
                        <h2>Sign up</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <Button variant="outline-light" size="lg"className="mt-3">Register</Button>
                        </div>
                  </Card.Body>
                  </Card>
                  </CardGroup>
            </Col>
            </Row>
            </Container>
      </div>
      )
}