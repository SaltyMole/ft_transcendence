import React, { useRef, useEffect, useState } from 'react';
import './Chat.css';

function Chat({ chatWidth, chatHeight, chatPhoneWidth, chatPhoneHeight }) {
	const messagesEndRef = useRef(null);
	const chatRef = useRef(null);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
	const [ws, setWs] = useState(null);

	useEffect(() => {
		const websocket = new WebSocket(`ws://${window.location.hostname}:8080`);
		setWs(websocket);

		websocket.onopen = () => console.log('Connected to WebSocket server');
		websocket.onmessage = async (event) => {
			const text = event.data instanceof Blob
				? await event.data.text()
				: event.data;
			setMessages((prevMessages) => [...prevMessages, text]);
		};
		websocket.onclose = () => console.log('Disconnected from WebSocket server');

		return () => websocket.close();
	}, []);

	function send_message() {
		if (ws && ws.readyState === WebSocket.OPEN && input != "") {
			ws.send(input);
			setInput('');
			console.log("Message sent in chat:", input);
		}
	}

	function send_message_enter_key(key) {
		if (key === 'Enter')
		send_message();
	}

	// Scroll to bottom whenever messages update
	useEffect(() => {
		if (chatRef.current) {
		chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [messages]);

	// Scroll on resize
	useEffect(() => {
		const handleResize = () => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div className="ChatBox" style={{
		"--chatWidth": chatWidth,
		"--chatHeight": chatHeight,
		"--chatPhoneWidth": chatPhoneWidth,
		"--chatPhoneHeight": chatPhoneHeight
		}}>
		<div id="Chat" className="Chat" ref={chatRef}>
			{messages.map((message, index) => (
				<div key={message.key}>
					<span className="MessageName">
						{"User"}
						{": "}
					</span>
					<span className="MessageText">
						{message}
					</span>
				</div>
			))}
			<div ref={messagesEndRef}></div>
		</div>

		<div className="ChatInputBox">
			<input
			type="text"
			value={input}
			placeholder='Chat here...'
			onChange={(e) => setInput(e.target.value)}
			onKeyDown={(e) => send_message_enter_key(e.key)}
			id="ChatInput"
			className="ChatInput"
			/>
			<button onClick={send_message} className="SendChatButton">
			<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000">
				<path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/>
			</svg>
			</button>
		</div>
		</div>
	);
}

export default Chat;