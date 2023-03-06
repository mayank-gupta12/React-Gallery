import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import loading from './assets/Loading_icon.gif'
import "./App.css"
import ReactPaginate from 'react-paginate';


const App = () => {
  const [images, setImages] = useState([]);
  const getimages = async (count = 1) => {
    console.log(count)
    try {
      const { data } = await axios.get(`https://picsum.photos/v2/list?page=${count}&limit=8`)
      setImages(data)
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getimages()
  }, [])

  let imagelist = [];
  if (images.length > 0) {
    imagelist = images.map((image, index) => (
      <div key={index} className="card me-4 mb-5" style={{ width: "16rem" }}>
        <img src={image.download_url} className="card-img-top" alt={image.download_url} />
        <div className="card-body">
          <p className="card-text">{image.author}</p>
        </div>
      </div>
    ))
  }
  const onPageChange = ({ selected }) => {
    getimages(selected + 1)
  }
  return (
    <div style={{ width: "100vw", height: "100vh" }} className="container">
      <h1 className='text-center mb-3'>Dynamic Photos</h1>
      <div className='input' >
      <span>Name</span> <input type="text" placeholder='Cat, Dog, Parrot' /> <button> Search</button>
      </div>
      <div className='px-5 flex-wrap d-flex justify-content-start align-items-center'>
        {images.length > 0 ? (imagelist) : (<img style={{ marginLeft:"25%", width: "30vmax" }} src={loading} alt="loading!!!" />)}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        pageCount={10}
        previousLabel="<"
      />
    </div>)
}

export default App
