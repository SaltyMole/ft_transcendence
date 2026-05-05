import React from 'react';
import { useRef, useEffect } from 'react';
import useWebSocket, { ReadyState } from "react-use-websocket"
import './Chat.css';





function Chat({ chatWidth, chatHeight, chatPhoneWidth, chatPhoneHeight }) {
	const WS_URL = "ws://127.0.0.1:800"
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    },
  )

  // Run when the connection state (readyState) changes
  useEffect(() => {
    console.log("Connection state changed")
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        event: "subscribe",
        data: {
          channel: "general-chatroom",
        },
      })
    }
  }, [readyState])

  // Run when a new WebSocket message is received (lastJsonMessage)
  useEffect(() => {
    console.log(`Got a new message: ${lastJsonMessage}`)
  }, [lastJsonMessage])

  return <Chat lastJsonMessage={lastJsonMessage} />
}




// function Chat({ messages, chatWidth, chatHeight, chatPhoneWidth, chatPhoneHeight }) {
// 	const messagesEndRef = useRef(null);

// 	function send_message()
// 	{
// 		var message = document.getElementById("ChatInput").value;
// 		document.getElementById("ChatInput").value = "";
// 		console.log("Message sent in chat:", message);
// 	}

// 	function send_message_enter_key(key) {
// 		if(key === 'Enter')
// 			send_message();
// 	}

// 	const handleResize = () => {
// 		console.log("Resized");
// 		if (messagesEndRef.current) {
// 			messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
// 		}
// 	};

// 	useEffect(() => {
// 		if (messagesEndRef.current) {
// 			messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
// 		}

// 		window.addEventListener('resize', handleResize);
// 		return () => window.removeEventListener('resize', handleResize);
// 	}, []);

// 	return (
// 		<div className="ChatBox" style={{
// 			"--chatWidth": chatWidth,
// 			"--chatHeight": chatHeight,
// 			"--chatPhoneWidth": chatPhoneWidth,
// 			"--chatPhoneHeight": chatPhoneHeight
// 		}}>
// 			<div id="Chat" className="Chat" ref={messagesEndRef}>
// 				{messages.map((msg) => (
// 					<div key={msg.key}>
// 						<span className="MessageName">
// 							{msg.sender}
// 							{": "}
// 						</span>
// 						<span className="MessageText">
// 							{msg.text}
// 						</span>
// 					</div>
// 				))}
// 				<div ref={messagesEndRef}></div>
// 			</div>

// 			<div className="ChatInputBox">
// 				<input
// 					onKeyDown={(e) => send_message_enter_key(e.key)}
// 					placeholder='Chat here...'
// 					id="ChatInput"
// 					className="ChatInput"
// 				/>

// 				<button onClick={send_message} className="SendChatButton">
// 					<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
// 				</button>
// 			</div>
// 		</div>
// 	);
// }

export default Chat;