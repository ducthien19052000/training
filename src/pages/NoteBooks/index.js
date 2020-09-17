import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import Layout from '../../components/Layout'
import Fuse from 'fuse.js'
import db from '../../db.json'
import './index.css'

const Home = props => {
    const fuse = new Fuse(db);
    const [content,setContent]= useState({})
    const [noteBook,setNoteBook] = useState( fuse._docs.map(noteb=> noteb))

    const onHandleAdd=(note)=>{
        fuse.add(note);
        const data = fuse._docs.map(noteb=> noteb)
        setNoteBook(data);
        
    }
    console.log(noteBook)
    const onHandleClick =(id)=>{
    const data= noteBook.filter(note => note.id===id);
    setContent(data);
      
    }
    console.log(content)
    // console.log(data.map(dt=>dt.content));
    return (
        
            <Layout noteBooks={noteBook} showContent={onHandleClick} onAdd={onHandleAdd}>
            <h1 > My Note</h1>
            {Object.keys(content).length===0? 
            <ul>
                <li>Tile</li>
                <li>Date</li>
            </ul>: 
            <>
                {content.map(ct=>(
                    <ul>
                    <li>{ct.title}</li>
                     <li>{ct.date}</li>
                    </ul>
                ))}
            </>
                
                
            }
            
            <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label ></Form.Label>
              {Object.keys(content).length===0?
               <Form.Control as="textarea" className="text-content" rows={3} />:
               <Form.Control as="textarea" className="text-content" rows={3} value={content.map(ct=>ct.content)} />
            }
               
            </Form.Group>
            </Form>
            </Layout>
        
    )
}

Home.propTypes = {

}

export default Home
