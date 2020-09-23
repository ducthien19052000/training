import React, { useState } from 'react'
import { Container , Row , Col, Form, Button, ListGroup, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { BsFileEarmarkPlus } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';


const Layout = ({children,noteBooks,showContent,onAdd}) => {
  const [lgShow, setLgShow] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [search, setSearch] = useState("");

  
  const onHandleClick =(id)=>{
    showContent(id)
    console.log(search)
  }
  const n = noteBooks.map(nb=>nb);
  
  const cateNote = n.filter(note =>
  note.title.toLowerCase().includes(search.toLowerCase())
  )
  


  const onHandleAdd=(data)=>{
   
    setLgShow(false)

    onAdd({ id: Math.random().toString(36).substr(2, 9),...data});
  }
    return (
      <>
        <Container fluid="md">
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
                    <Form.Control type="text" placeholder="Enter key" name="search" onChange={e=>setSearch(e.target.value)}/>
                  </Form.Group>  
                </Col>
                <Col sm={5}>
              
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
                    {cateNote.map((nb,index)=>(
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
            ADD CATEGORY NOTEBOOK
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit(onHandleAdd)}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              {errors.title&& <span className="errors">Vui lòng điền tille</span>}
              <Form.Control type="title"name="title" placeholder="Title" ref={register({required:true})}/>
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
