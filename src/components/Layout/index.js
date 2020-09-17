import React, { useState } from 'react'
import { Container , Row , Col, Form, Button, ListGroup, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { BsFileEarmarkPlus } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";


const Layout = ({children,noteBooks,showContent,onAdd}) => {
  const [lgShow, setLgShow] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const array = String

  const onHandleClick =(id)=>{
    showContent(id)
  }
  const onHandleChange = e => {
    const { name, value } = e.target;

    console.log(array)

    setCurrentProduct({
        ...currentProduct,
        [name]: value
    })
  
   
}
  const onHandleAdd=(e)=>{
    e.preventDefault();
    setLgShow(false)

    onAdd({ id: Math.random().toString(36).substr(2, 9),...currentProduct});
  }
    return (
      <>
        <Container>
          <Row  className="header">
          
           <Col sm={1}></Col>
            <Col sm={4} id= "col2">Layout idea</Col>
            <Col sm={5}></Col>
          
          </Row>
          <Row className="banner"></Row>
          <Row>
            <Col sm={4}>
              <Row className="form-search">
                <Col sm={7}>
                  <Form.Group>
                    <Form.Control type="email" placeholder="Enter key" />
                  </Form.Group>  
                </Col>
                <Col sm={5}>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              
                </Col>
              </Row>
              <Row>
                <Col className="list-notebooks">
                  <Row>
                  <h3 style={{width: '87%'}}>All Notes</h3>
                    <button className="icon-add-notes"  onClick={() => setLgShow(true)}>
                      <BsFileEarmarkPlus size="2em" />
                    </button>
                   
                  
                  </Row>
                  <Row >
                  <ListGroup>
                    {noteBooks.map((nb,index)=>(
                          <ListGroup.Item key={index} onClick={()=>onHandleClick(nb.id)}>
                           {nb.title}
                          </ListGroup.Item>
                    ))}
                      </ListGroup>
                  
                 
                  </Row>
                </Col>
                
              </Row>
            </ Col>
            <Col sm={8}>
              {children}
          
            </Col>
          </Row>
          <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={onHandleAdd}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control type="title"name="title" placeholder="Title"  onChange={onHandleChange}/>
            </Form.Group>
            
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Date</Form.Label><br/>
              <Form.Control type="date" name="date" placeholder="Title"  onChange={onHandleChange}/>
            
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" name="content" rows={3}   onChange={onHandleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">Save </Button>
          </Form>
      
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>setLgShow(false)}>Close</Button>
        
      </Modal.Footer>
      </Modal>
        </Container>
      </>
    )
}

Layout.propTypes = {

}
export default Layout
