import React, { useState } from 'react'
import { Button, Card, Form, Modal, Row } from 'react-bootstrap'
import Layout from '../../components/Layout'
import Fuse from 'fuse.js'
import db from '../../db.json'
import './index.css'
import { FiPlusCircle } from "react-icons/fi"
import {useForm} from 'react-hook-form'

import 'bootstrap/dist/css/bootstrap.min.css'



const Home = props => {
  

   const   today= new Date();
 
    const fuseCate = new Fuse(db["Category-note"],{ 
        key:['title']
    });
    const fuseNote = new Fuse(db["note-books"],{ 
        key:['title'],
        includeScore:true
    })

    const { register, handleSubmit, errors } = useForm();
    const [showAdd, setShowAdd] = useState(false);
    const [show,setShow]=useState(false)
    const [content,setContent]= useState({})
    const [noteBook,setNoteBook] = useState([])
    const [cateNoteBook,setCateNoteBook] = useState( fuseCate._docs.map(note=> note))
    const [noteBooks, setNoteBooks]= useState(fuseNote._docs.map(noteb =>noteb))
    const   [search,setSearch] = useState("");
    const [noteDetail,setNoteDetail] = useState({});
    const [sortType,setSortType] = useState("");
  
   

    const onHandleAdd=(note)=>{
        fuseCate.add(note);
        const data = fuseCate._docs.map(noteb=> noteb)
        setCateNoteBook(data);
        console.log(data)
      
    }
  
    
    
    const onHandleShow =(id)=>{
            setShow(true);
            const note = noteBook.filter(note=> note.id ===id);
            setNoteDetail(note[0])
    }
    const onHandleAddNote = (data)=>{
     
        let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        let cateId = content.id;
        console.log(cateId)
        setShowAdd(false);
        fuseNote.add({ id: Math.random().toString(36).substr(2, 9),...data,date,cateId});
        const newNote = fuseNote._docs.map(noteb=> noteb);
        const db = newNote.filter(note =>note.cateId===cateId);
        setNoteBook(db)
       
        setNoteBooks(newNote);
        
    }

    const onHandleClick =(id)=>{
    const data= noteBooks.filter(note => note.cateId===id);
    const db= cateNoteBook.filter(note => note.id===id);
    setNoteBook(data);
    console.log(db[0])
    setContent(db[0]);
    }

    const filterNote = noteBook.filter(note=>note.title.toLowerCase().includes(search.toLowerCase()))
    const noteSort = filterNote.sort((a,b)=>{
        const isRevered = (sortType==="asc")?1:-1;
        return isRevered * a.title.localeCompare(b.title)
    })
   
    const onSort=(sortType)=>{
        // e.preventDefault();
        setSortType(sortType)
        console.log("a")
    }
    return (
        
            <Layout noteBooks={cateNoteBook} showContent={onHandleClick} onAdd={onHandleAdd}>
           
            {Object.keys(content).length===0? 
             <h1 > My Note</h1>: 
            <>
                
                    <>
                   <h1>{content.title} 
                    <button className="add-notebook" onClick={() => setShowAdd(true)}><FiPlusCircle size="1em"/></button>
                    </h1> 
                  
                    
                     </>
               
            </>
                
                
            }
            
            <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              {Object.keys(content).length===0?
               <img width="80%" src="https://rawcdn.githack.com/ducthien19052000/imageTraining/40b2a30c5a9e3894b0990523611330a0b2deaec6/—Pngtnotebook.png"/>:
               <div>
                   <Row>
                   <Form.Group >
                    <Form.Control type="text" placeholder="Enter key" className="search-item-note" name="search" onChange={e=>setSearch(e.target.value)}/>
                  </Form.Group>  <br/>
                  <Form.Group style={{width: '100%', marginLeft: '30px'}}>
                      <label>Sắp xếp :</label>
                  <Button variant="primary" onClick={()=>onSort("asc")}  style={{ margin: '10px'}} >A_Z </Button>
                  <Button variant="primary"onClick={()=>onSort("desc")} >Z-A </Button>
                  </Form.Group> 
         
                  
                   </Row>
                     <Row>  
                        {noteSort.map((note,index)=>(
                             <Card style={{ width: '20rem' }} key={index} className="item-notebook">
                                 
                             <Card.Body>
                              <Card.Title>{note.title}

                              </Card.Title>
                               <Card.Text className="item-content">
                               {note.content}
                               </Card.Text>
                               <Button variant="primary" onClick={()=>onHandleShow(note.id)} className="item-detail">Chi tiết </Button>
                               <p className="date-item"> {note.date}</p>
                               
                             </Card.Body>
                           </Card>
                        ))}
                    

  
 

                        
                    </Row>
               </div>
               
            }
               
            </Form.Group>
            </Form>
            <Modal
        size="lg"
        show={showAdd}
        onHide={() => setShowAdd(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add notebook
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit(onHandleAddNote)}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title </Form.Label>
              {errors.title&& <span className="errors">Vui lòng điền tille</span>}
              
              <Form.Control type="title"name="title" placeholder="Title"  ref={register({required:true})}/> 
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
              {errors.content && <span  className="errors">Vui lòng điền tille</span>}
              <Form.Control as="textarea" name="content" rows={3} ref={register({required:true})} />
            </Form.Group>
            <Button variant="primary" type="submit">Save </Button>
          </Form>
      
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>setShowAdd(false)}>Close</Button>
        
      </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Notebook Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={onHandleAddNote}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control type="title"name="title" placeholder="Title"  value={noteDetail.title}/>
            </Form.Group>
            
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Date created</Form.Label><br/>
              <Form.Control type="text" name="date" placeholder="Title"  value={noteDetail.date}/>
            
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" name="content" rows={3}  value={noteDetail.content} />
            </Form.Group>
            <Button variant="primary" type="submit">Save </Button>
          </Form>
      
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>setShow(false)}>Close</Button>
        
      </Modal.Footer>
      </Modal>
            </Layout>
        
    )
}

Home.propTypes = {

}

export default Home
