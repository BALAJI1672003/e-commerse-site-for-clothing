import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import { Item } from '../Item/Item'

export const NewCollections = () => {

  const [newcollections,setNewcollections]=useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/newcollections').then((res)=>res.json()).then((data)=>{setNewcollections(data)});
  },[])

  return (
    <div className="new-collections">
        <h1>New Collections</h1>
        <hr/>
        <div className="collections">
            {newcollections.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}
