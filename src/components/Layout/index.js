import React, { useState } from 'react'
import { Container , Row , Col, Form, Button, ListGroup, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { BsFileEarmarkPlus } from "react-icons/bs";
import { FaRegTrashAlt,FaRegEdit } from "react-icons/fa";

import "react-datepicker/dist/react-datepicker.css";



const Layout = ({children,noteBooks,showContent,onAdd,onRemove,onEdit}) => {
  const [lgShowAdd, setLgShowAdd] = useState(false);
  const [lgShowEdit, setLgShowEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [validated, setValidated] = useState(false);
  const [newCateNoteBook,setNewCateNoteBook] = useState({});
  const [cateEdit,setCateEdit] =useState({})

  const onHandleClick =(id)=>{
    showContent(id)
  }

  const onHandleChange =(e)=>{
    const {name}=e.target;
    setNewCateNoteBook({...newCateNoteBook,[name]: e.target.value}) 
}
  const onHandleChangeEdit = ( e )=>{
    const {name}=e.target;
    
    setCateEdit({...cateEdit,[name]: e.target.value}) 
  }
  const cateNote = noteBooks.filter(note =>
  note.title.toLowerCase().includes(search.toLowerCase())
  )
  


  const onHandleAdd=(e)=>{
    const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        else{
          e.preventDefault();
          setValidated(true);
          setLgShowAdd(false)

          onAdd({ id: Math.random().toString(36).substr(2, 9),...newCateNoteBook});
        }
  }
  
  const onHandleRemove=(id) =>{
    onRemove(id)
  }
  
  const onHandleShowEdit = (id) =>{
    const data = noteBooks.filter(note =>note.id===id);
    setCateEdit(data[0])
    setLgShowEdit(true)
  }

  const onHandleEdit=(e) =>{
    e.preventDefault()
    
    onEdit(cateEdit)
    setLgShowEdit(false);

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
                    <button className="icon-add-notes"  onClick={() => setLgShowAdd(true)}>
                      <BsFileEarmarkPlus size="2em" />
                    </button>
                   
                  
                  </Row>
                  <Row >
                  <ListGroup>
                    {cateNote.map((nb,index)=>(
                  
                          <ListGroup.Item key={index}>
                            <Button  onClick={()=>onHandleClick(nb.id)} className="title-cate">{nb.title}</Button>
                           <Button onClick={()=>onHandleRemove(nb.id)}><FaRegTrashAlt/></Button>
                          <Button onClick={() => onHandleShowEdit(nb.id)}> <FaRegEdit/></Button>
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
        show={lgShowAdd}
        onHide={() => setLgShowAdd(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            ADD CATEGORY NOTEBOOK
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form  noValidate validated={validated} onSubmit={onHandleAdd}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              
              <Form.Control type="title"name="title" placeholder="Title" required onChange={onHandleChange}/>
            </Form.Group>
            
           
          
            <Button variant="primary" type="submit">Save </Button>
          </Form>
      
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>setLgShowAdd(false)}>Close</Button>
        
      </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        show={lgShowEdit}
        onHide={() => setLgShowEdit(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            EDIT CATEGORY NOTEBOOK
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form  noValidate validated={validated} onSubmit={onHandleEdit}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              
              <Form.Control type="text"name="title" placeholder="Title" value={cateEdit.title}  onChange={onHandleChangeEdit}/>
            </Form.Group>
            
          
            <Button variant="primary" type="submit">Save </Button>
          </Form>
      
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>setLgShowEdit(false)}>Close</Button>
        
      </Modal.Footer>
      </Modal>
        </Container>
      </>
    )
}

Layout.propTypes = {

}
export default Layout
