import React, { useRef, useEffect, useState } from "react";
import { WS_URL } from "../config/api.js";
import "./Chat.css";

function Chat({
	chatWidth,
	chatHeight,
	chatPhoneModeWidth,
	chatPhoneWidth,
	chatPhoneHeight,
	clientName,
	gameID,
}) {
	const messagesEndRef = useRef(null);
	const chatRef = useRef(null);
	const wsRef = useRef(null);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		if (!gameID || !clientName) return;

		const ws = new WebSocket(WS_URL);
		wsRef.current = ws;

		ws.onopen = () => {
			setConnected(true);
			ws.send(JSON.stringify({ type: "join", gameID: gameID, username: clientName }));
		};

		ws.onmessage = (e) => {
			const msg = JSON.parse(e.data);
			if (msg.type === "chat" || msg.type === "system")
				setMessages((prev) => [...prev, msg]);
		};

		ws.onclose = () => {
			setConnected(false);
		};
		
		ws.onerror = (err) => console.error("WebSocket error:", err);

		return () => ws.close();
	}, [clientName, gameID]);

	function send_message() {
		const ws = wsRef.current;
		if (ws && ws.readyState === WebSocket.OPEN && input.trim() !== "")
		{
			ws.send(JSON.stringify({ type: "chat", text: input }));
			setInput("");
			console.log("Message sent:", input);
		}
	}

	function send_message_enter_key(key) {
		if (key === "Enter") send_message();
	}

	// Scroll to bottom whenever messages update
	useEffect(() => {
		if (chatRef.current) {
		chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [messages]);

	// Handle resize and set width to phone resize
	const [isPhoneMode, setIsPhoneMode] = useState(
		window.innerWidth <= parseInt(chatPhoneModeWidth)
	);
	useEffect(() => {
		const handleResize = () => {
		setIsPhoneMode(window.innerWidth <= parseInt(chatPhoneModeWidth));
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [chatPhoneModeWidth]);

	return (
		<div
		className={`ChatBox ${isPhoneMode ? "ChatBox--phone" : ""}`}
		style={{
			"--chatWidth": chatWidth,
			"--chatHeight": chatHeight,
			"--chatPhoneWidth": chatPhoneWidth,
			"--chatPhoneHeight": chatPhoneHeight,
		}}
		>
		<div id="Chat" className="Chat" ref={chatRef}>
			{messages.map((message, index) => (
			<div key={index} className={`Message ${message.type === "system" ? "Message--system" : ""}`}>
				{message.type === "chat" && (
				<>
					<span className="MessageName">
					{message.self ? "You" : message.from}
					{": "}
					</span>
					<span className="MessageText">{message.text}</span>
				</>
				)}
				{message.type === "system" && (
				<span className="MessageSystem">{message.text}</span>
				)}
			</div>
			))}
		<div ref={messagesEndRef} />
	</div>

		<div className="ChatInputBox">
			<input
			type="text"
			value={input}
			placeholder="Chat here..."
			onChange={(e) => setInput(e.target.value)}
			onKeyDown={(e) => send_message_enter_key(e.key)}
			// disabled={!connected}
			id="ChatInput"
			className="ChatInput"
			/>
			<button onClick={send_message} className="SendChatButton">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="100%"
				viewBox="0 -960 960 960"
				width="100%"
				fill="#000000"
			>
				<path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
			</svg>
			</button>
		</div>
		</div>
	);
}

export default Chat;
