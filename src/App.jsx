import React from 'react'
import { useState, useRef,useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { Alert } from 'bootstrap';
function App() {
  const [datas, setdata] = useState('')
  const [post,setPost] = useState('')
  const postRef = useRef()
  const henlesubmit = async (e) => {
    e.preventDefault()
    const data = await fetch("http://localhost:12020/todo", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        text: postRef.current.value
      })
    })
    const res = await data.json()
    console.log(res);
    setdata(res)
  console.log(postRef.current.value)
  }
// ============

const hendleEdit = async  (el)=>{
  el.preventDefault()
  const Edits = prompt("Malumot O'zgartiring")
  const data = await fetch("http://localhost:12020/todo", {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      id:7,
      text: Edits
    })
  })
  const res = await data.json()
  console.log(Edits);
}
  // ==================
  const myfuns = async () => {
    const data = await fetch("http://localhost:12020/todo", {
      method: "GET",
    })
    const res = await data.json()
    console.log(res);
    setdata(res)
  }
  useEffect(()=>{
    myfuns()
  },[])


  //   <div className="form-group">
  //   <label htmlFor="exampleInputEmail1">Email address</label>
  //   <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
  // </div>
  // <div className="form-group">
  //   <label htmlFor="exampleInputPassword1">Password</label>
  //   <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
  // </div>
  // <button type="submit" className="btn btn-primary" onClick={henlesubmit}>Submit</button>
  return (
    <>

      <div className="container">
        <h1 className='text-center'>Hello World</h1>
        <form className='text-center mt-5  aligen-center  '>
          <input ref={postRef} className=' w-25 p-2 fs-4 border shadow' type="text" />
          <button onClick={henlesubmit} className='p-2shadow bg-info'><h2>Send</h2></button>
        </form>

        <div className="mt-5 w-50 ms-auto me-auto list-group  ">

          {
            datas.length ? datas.map((data, index) => {
              return (
                <div key={index} className='list-group-item d-flex'>
                  <p className=' me-4'>   {data.id}</p>
                  <p className='me-4'>{data.text}</p>
                  <button onClick={(e)=>hendleEdit(e)} className='ms-auto me-2 px-3  bg-warning'>Edit</button>
                  <button className='px-3 bg-danger'>DELETE</button>
                </div>
              )
            }) : <h2>not font</h2>
          }
        </div>
      </div>
    </>
  )
}

export default App
