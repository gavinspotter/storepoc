import React, { useRef } from 'react'
import ChatItem from './ChatItem'


import "../../css/style.css"
import Scroll from './Scroll'

const ChatList = (props) => {

   

    
    


    return (
    
        <div className="customerMessage-messages">
            
            <div  className="customerMessage-messages-messages">
            
            
            
            {props.messages
            
            && <div ref={props.scroll}></div>}
            


            {
                
                props.messages.map(x => 

                   
                    
                    <ChatItem
                    key={x._id}
                    sender={x.sender}
                    message={x.message}
                    />



                    
                    ).reverse()


                    
            }

            
            

            
            

            

           
            
            </div>
            
            
        </div>
       
    )
}

export default ChatList
