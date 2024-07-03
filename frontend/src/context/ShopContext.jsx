import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () =>{
    let cart={};
    for (let index = 0; index <= 300; index++) {
        cart[index] = 0;
    }
    return cart;
}

export const ShopContextProvider = (props)=>{
    const [cartItems,setCartItems] = useState(getDefaultCart());
    const [all_product,setAll_product]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts').then((res)=>res.json()).then((data)=>setAll_product(data));

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:"",
            }).then((res)=>res.json()).then((data) =>setCartItems(data));
        }

    },[]);

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({
            ...prev,[itemId]:prev[itemId]+1
        }))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then((res)=>res.json()).then((data) =>console.log(data));
        }
    }
    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({
            ...prev,[itemId]:prev[itemId]-1
        }))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then((res)=>res.json()).then((data) =>console.log(data));
        }
    }
    
    const getTotalCartAmount=()=>{
        let total=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let iteminfo = all_product.find((product) => product.id===Number(item));
                total += iteminfo.new_price * cartItems[item];
            }
        }
        return total;
    }

    const getTotalCartItems=()=>{
        let total=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                total += cartItems[item];
            }
        }
        return total;
    }
    
    const contextValue = {all_product,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}