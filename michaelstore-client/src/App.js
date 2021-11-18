import React, { useState } from 'react'


import { BrowserRouter as Router, Redirect, Route, Routes } from "react-router-dom"
import { AuthContext } from "./shared/context/auth-context"
import { useAuth } from './shared/hooks/auth-hook';
import { NavLink } from "react-router-dom";
import AboutUs from './shared/home/project/AboutUs';
import ConsumerGoodsContainer from './shared/home/project/consumerGoods/ConsumerGoodsContainer';
import ConsumerGoodsLook from './shared/home/project/consumerGoods/ConsumerGoodsLook';
import BulkContainer from './shared/home/project/bulk/BulkContainer';
import BulkLook from './shared/home/project/bulk/BulkLook';
import MessageBoardsList from './admin/chat/MessageBoardsList';
import ConsumerGoodsList from './shared/home/project/consumerGoods/ConsumerGoodsList';
import BulkList from './shared/home/project/bulk/BulkList';
import WelcomeContainer from './consumer/customerLogin/WelcomeContainer';
import ChatList from './consumer/customerChat/ChatList';
import Details from './consumer/customerDetails/Details';
import AddItemContainer from './admin/addAnItem/AddItemContainer';
import MessagesList from './admin/chat/MessagesList';
import HomePage from './shared/home/HomePage';
import LoginContainer from './admin/adminLogin/LoginContainer';



const App = () => {

  const { token, login, logout, userId, customerToken, customerLogin, customerLogout, customerId } = useAuth();


  



  let route 

  if(token){
 route = (
    <Routes>
      <Route path="/messages" element={<MessageBoardsList/>} />
      <Route path="/messages/:md" element={<MessagesList/>}/>
      <Route path="/addItem" element={<AddItemContainer/>} />
      
      <Route path="/" element={<AboutUs/>} />
      <Route path="/consumerGoods" element={<ConsumerGoodsContainer/>} />
      <Route path="/consumerGoods/:cgId" element={<ConsumerGoodsLook/>}/>
      <Route path="/bulkItems" element={<BulkContainer/>} />
      <Route path="/bulkItems/:biId" element={<BulkLook/>}/>

      <Route path="*" element={<AboutUs/>}/>
    </Routes>
 )

  }else if(customerToken){
    route = (
    <Routes>
 

      <Route path="/yourMessages" element={<ChatList/>} />
      <Route path="/details" element={<Details/>} />

      <Route path="/" element={<AboutUs/>} />
      <Route path="/consumerGoods" element={<ConsumerGoodsList/>} />
      <Route path="/consumerGoods/:cgId" element={<ConsumerGoodsLook/>}/>
      <Route path="/bulkItems" element={<BulkContainer/>} />
      <Route path="/bulkItems/:biId" element={<BulkLook/>}/>
      
      <Route path="*" element={<AboutUs/>}/>
    </Routes>
    )
  }else{
    route = (<Routes>
      <Route path="/" element={<AboutUs/>} />
      <Route path="/michaelross" element={<LoginContainer/>}/>
      
      <Route path="/consumerGoods" element={<ConsumerGoodsList/>} />
      <Route path="/consumerGoods/:cgId" element={<ConsumerGoodsLook/>}/>
      <Route path="/bulkItems" element={<BulkContainer/>} />
      <Route path="/bulkItems/:biId" element={<BulkLook/>}/>
      <Route path="/welcome" element={<WelcomeContainer/>}/>
      <Route path="*" element={<AboutUs/>}/>
    </Routes> )
  }


  return (
    <AuthContext.Provider
    value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout, customerIsLoggedIn: !!customerToken, customerToken: customerToken, customerId: customerId, customerLogin: customerLogin, customerLogout: customerLogout }}
  
    >
      
      <Router>
        <HomePage>
      
        {route}
        </HomePage>
      </Router>
      </AuthContext.Provider>
  )
}

export default App
