import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

    const [allproducts,setAllProducts] = useState([]);

    const fetchInfo = async () =>{
        await fetch('http://localhost:4000/allproducts').
        then((resp)=>resp.json()).
        then((data)=>{
            setAllProducts(data)
        });
    }

    const remove_product= async (id) =>{
        await fetch('http://localhost:4000/removeproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id}),
        });
        fetchInfo();
    }

    useEffect(()=>{
        fetchInfo();
    },[]);

  return (
    <div className='listproduct'>
        <h1>All Products</h1>
        <div className='listproduct-format-main'>
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Categoty</p>
            <p>Remove</p>
        </div>
        <div className="listproduct-allproduct">
            <hr/>
            {allproducts.map((product,index)=>{
                return <>
                    <div key={index} className="listproduct-format-main listproduct-format">
                        <img src={product.image} alt="" className='listproduct-product-icon' />
                        <p>{product.name}</p>
                        <p>{product.old_price}</p>
                        <p>{product.new_price}</p>
                        <p>{product.category}</p>
                        <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
                    </div>
                    <hr/>
                </>
            })}
        </div>
    </div>
  )
}

export default ListProduct