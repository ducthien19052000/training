import React, { useMemo, useState } from 'react'
import { Button, Card, Form, Modal, Row } from 'react-bootstrap'
import Layout from '../../components/Layout'
import Fuse from 'fuse.js'
import db from '../../db.json'
import './index.css'
import { FiPlusCircle } from "react-icons/fi"


import 'bootstrap/dist/css/bootstrap.min.css'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'



const Home = props => {
  

   const   today= new Date();
 
    const fuseCate = new Fuse(db["Category-note"],{ 
        key:['title']
    });
    const fuseNote = new Fuse(db["note-books"],{ 
        key:['title'],
        includeScore:true
    })


    const [showAdd, setShowAdd] = useState(false);
    const [show,setShow]=useState(false)
    const [showEdit,setShowEdit] = useState(false)
    const [content,setContent]= useState({})
    const [noteBook,setNoteBook] = useState([])
    const [cateNoteBook,setCateNoteBook] = useState( fuseCate._docs.map(note=> note))
    const [noteBooks, setNoteBooks]= useState(fuseNote._docs.map(noteb =>noteb))
    const   [search,setSearch] = useState("");
    const [noteDetail,setNoteDetail] = useState({});
    const [sortType,setSortType] = useState("");
    const [validated, setValidated] = useState(false);
    const [newNoteBook,setNewNoteBook] = useState({});
    const [noteBookEdit,setNoteBookEdit]=useState({})


    const onHandleAdd=(note)=>{
        fuseCate.add(note);
        const data = fuseCate._docs.map(noteb=> noteb)
        setCateNoteBook(data);
      
    }
    
    const onHandleRemoteCate = (id) =>{
        const data = cateNoteBook.filter(cate=> cate.id !==id);
        const newNoteBooks = noteBooks.filter(note => note.cateId!==id);
        const newNote = noteBook.filter(note => note.cateId!==id);
   
        setCateNoteBook(data)
        setNoteBooks(newNoteBooks)
        setNoteBook(newNote)
        setContent({})
    }
    
    const onHandleEditCate = (data) =>{
        const newNote= cateNoteBook.map(cate =>cate.id ===data.id?data:cate);

        setCateNoteBook(newNote)
       
    }
    
    const onHandleShow =(id)=>{
            setShow(true);
            const note = noteBook.filter(note=> note.id ===id);
            setNoteDetail(note[0])
    }

    const onHandleChange =(e)=>{
        const {name}=e.target;
        setNewNoteBook({...newNoteBook,[name]: e.target.value}) 
    }


    const onHandleAddNote = (e)=>{
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        else{
            e.preventDefault();
            setValidated(true);
            let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            let cateId = content.id;
            setShowAdd(false);
            fuseNote.add({ id: Math.random().toString(36).substr(2, 9),...newNoteBook,date,cateId});
            const newNote = fuseNote._docs.map(noteb=> noteb);
            const db = newNote.filter(note =>note.cateId===cateId);
            setNoteBook(db)
            setNoteBooks(newNote);
         
        }
    }

    const onHandleRemoteNote = (id)=>{
        let cateId = content.id;
        const data = noteBooks.filter(note=> note.id!==id);
        const newNote = data.filter(note => note.cateId===cateId)
        setNoteBooks(data);
        setNoteBook(newNote)
    }

    const onHandleClick =(id)=>{
    const filterNoteBook= noteBooks.filter(note => note.cateId===id);
    const filterCateNote= cateNoteBook.filter(note => note.id===id);
    setNoteBook(filterNoteBook);
    setContent(filterCateNote[0]);
    }

    const onShowNoteEdit=(data) =>{
        setNoteBookEdit(data)
        setShowEdit(true)
    }
    const onHandleChangeEdit=(e)=>{
        const {name}= e.target;
        setNoteBookEdit({...noteBookEdit,[name]:e.target.value})
    }

    const onHandleEditNote=(e)=>{
        e.preventDefault();
        const newNoteBooks = noteBooks.map(note =>note.id ===noteBookEdit.id?noteBookEdit:note)
        const newNoteBook = noteBook.map(note =>note.id ===noteBookEdit.id?noteBookEdit:note)
        setNoteBooks(newNoteBooks)
        setNoteBook(newNoteBook)
        setShowEdit(false)
    }

  
    
   const  noteSort = useMemo(()=>{
       let noteBookSort= noteBook;
       if(search){
            noteBookSort = noteBookSort.filter(note=>note.title.toLowerCase().includes(search.toLowerCase()))
       }
       if(sortType){
        const isRevered = (sortType==="asc")?1:-1;
           noteBookSort = noteBookSort.sort((a,b)=>isRevered*  a.title.localeCompare(b.title))
       }
       if(sortType==="dateAsc"){
        noteBookSort = noteBookSort.sort((a,b)=> new Date(a.date).getTime()-new Date(b.date).getTime() ).reverse()

        
          
       }
       if(sortType==="dateDesc"){
        noteBookSort = noteBookSort.sort((a,b)=> new Date(a.date).getTime()-new Date(b.date).getTime() )
       
         

       }
       return noteBookSort;
   },[search,noteBook,sortType])
    const onSort=(sortType)=>{
        setSortType(sortType)
       
    }

  


    return (
        
            <Layout noteBooks={cateNoteBook} showContent={onHandleClick} onAdd={onHandleAdd} onRemove = {onHandleRemoteCate} onEdit={onHandleEditCate}>
           
            {Object.keys(content).length===0? 
             <h1 > My Note</h1>: 
            <>
                
                    <>
                   <h1>{content.title} 
                   <Button variant="light" onClick={() => setShowAdd(true)}><FiPlusCircle size="2em"/></Button>

                    </h1> 
                  
                    
                     </>
               
            </>
                
                
            }
            
            <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              {Object.keys(content).length===0?
               <img alt="" width="80%" src="https://rawcdn.githack.com/ducthien19052000/imageTraining/40b2a30c5a9e3894b0990523611330a0b2deaec6/—Pngtnotebook.png"/>:
               <div>
                   <Row>
                   <Form.Group >
                    <Form.Control type="text" placeholder="Enter key" className="search-item-note" name="search" onChange={e=>setSearch(e.target.value)}/>
                  </Form.Group>  <br/>
                  <Form.Group style={{width: '100%', marginLeft: '30px'}}>
                      <Form.Label>Sắp xếp :</Form.Label>
                  <Button variant="primary" onClick={()=>onSort("asc")}  style={{ margin: '10px'}} >A_Z </Button>
                  <Button variant="primary"onClick={()=>onSort("desc")} style={{ margin: '10px'}} >Z-A </Button>
                  <Button variant="primary"onClick={()=>onSort("dateAsc")}  style={{ margin: '10px'}}>Date DESC</Button>
                  <Button variant="primary"onClick={()=>onSort("dateDesc")} style={{ margin: '10px'}} >Date ASC</Button>

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
                             
                              
                               
                             </Card.Body>
                             <Card.Footer className="text-muted" >
                             {note.date}
                             <Button variant="primary" onClick={()=>onHandleShow(note.id)} className="item-detail">Chi tiết </Button>
                               <Button  onClick={()=>onHandleRemoteNote(note.id)}><FaRegTrashAlt/></Button>
                             <Button onClick={()=>onShowNoteEdit(note)}> <FaRegEdit/></Button></Card.Footer>
                             
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
        <Form noValidate validated={validated} onSubmit={onHandleAddNote}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title </Form.Label>
            
              
              <Form.Control type="title"name="title" placeholder="Title"  required  onChange={onHandleChange}/> 
            </Form.Group>
            
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
           
              <Form.Control as="textarea" name="content" rows={3} required  onChange={onHandleChange} />
            </Form.Group>
            <Button type="submit">Save </Button>
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
            {noteDetail.title}
          
          </Modal.Title>
          <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label> Ngày tạo : {noteDetail.date}</Form.Label><br/>
       
            
            </Form.Group>
        </Modal.Header>
        <Modal.Body>
        <Form >
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" name="content" rows={3} className="content-item"  value={noteDetail.content} />
            </Form.Group>
            
          </Form>
      
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>setShow(false)}>Close</Button>
        
      </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        show={showEdit}
        onHide={() => setShowEdit(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit NoteBook
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={onHandleEditNote}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control type="title"name="title" placeholder="Title"  value={noteBookEdit.title} onChange={onHandleChangeEdit}/>
            </Form.Group>
            
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Date created</Form.Label><br/>
              <Form.Control type="text" name="date" placeholder="Title"  value={noteBookEdit.date}/>
            
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" name="content" rows={3}  value={noteBookEdit.content} onChange={onHandleChangeEdit} />
            </Form.Group>
            <Button variant="primary" type="submit">Save </Button>
          </Form>
      
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>setShowEdit(false)}>Close</Button>
        
      </Modal.Footer>
      </Modal>
            </Layout>
        
    )
}

Home.propTypes = {

}

export default Home
