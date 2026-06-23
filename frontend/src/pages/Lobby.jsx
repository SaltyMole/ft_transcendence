import test from "../img/test.jpeg"
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import '../css/Lobby.css';
import "../css/front/style.css";
import DrawingCarousel from "../components/DrawingsCarousel"
import getEnvironment from "../game/getEnvironment";
import getState from "../game/getState"
import havePlayerDrawn from "../game/havePlayerDrawn"
import isPlayerInGame from "../game/isPlayerInGame";
import Chat from "../components/Chat";
import getDrawings from "../game/getDrawings";
import getPlayers from "../game/getPlayers"
import getCurrentUser from "../game/getCurrentUser"
import getStory from "../game/getStory";
import { AI_WS_URL } from "../config/api";

const Lobby = () => {
    const { gameID } = useParams();
    const navigate = useNavigate();
    const playerContinuingGame = useRef(false);
    const hasTriggeredStory = useRef(false);
    const wsRef = useRef(null);

    const [playerID, setPlayerID] = useState(null);
    const [username, setUsername] = useState(null);
    const [gameState, setState] = useState("");
    const [environment, setEnvironment] = useState("");
    const [story, setStory] = useState("");
    const [drawings, setDrawings] = useState([]);
    const [players, setPlayers] = useState([]);
    const [storySocketReady, setStorySocketReady] = useState(false);
    const hasSentStoryRequest = useRef(false);

    useEffect(() => {
        let cancelled = false;

        const fetchSavedStory = async () => {
            try {
                const savedStory = await getStory(gameID);
                if (cancelled || !savedStory) return;

                setStory(savedStory);
                hasTriggeredStory.current = true;
            } catch (error) {
                console.error(error);
            }
        };

        fetchSavedStory();

        return () => {
            cancelled = true;
        };
    }, [gameID]);

    useEffect(() => {
        hasSentStoryRequest.current = false;
    }, [gameID]);

    // 1. Get player ID
    useEffect(() => {
        const getUserID = async () => {
            const user = await getCurrentUser();
            setPlayerID(user.id);
            setUsername(user.username);
        };
        getUserID();
    }, []);

    // 2. Check if player is in game & has drawn
    useEffect(() => {
        const checkIsHere = async () => {
            if (!playerID || !gameID) return;
            const isHeHere = await isPlayerInGame(gameID, playerID);
            if (isHeHere === false) navigate('/game');
        }
        checkIsHere();

        const checkDrawn = async () => {
            if (!playerID || !gameID) return;
            const isHeHere = await isPlayerInGame(gameID, playerID);
            const doIHvaeDrawn = await havePlayerDrawn(gameID, playerID);
            
            if (isHeHere === true && doIHvaeDrawn === false) {
                playerContinuingGame.current = true;
                navigate(`/drawing/${gameID}`);
            }
        }
        checkDrawn();
    }, [playerID, gameID, navigate]);

    // 3. Handle page hide / unload
    const location = useLocation();
    useEffect( () => {
        const handlePageHide = () => {
            if (!playerID || !gameID) return;
            if (location.pathname !== `/drawing/${gameID}`) {
                fetch(`/api/games/removePlayer/${gameID}/${playerID}`, {
                    method: 'POST',
                    credentials: 'include',
                    keepalive: true
                });
            }
        };

        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("pagehide", handlePageHide);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("pagehide", handlePageHide);
        };
    }, [playerID, gameID, location.pathname]);

    // 4. Get game state
    useEffect(() => {
        const fetchState = () => {
            getState(gameID)
            .then(fetchedState => {
                setState(fetchedState);
                if (fetchedState === "finished") {
                    playerContinuingGame.current = true;
                    navigate(`/results/${gameID}`);
                }
            })
            .catch(error => console.error(error));
        };
        fetchState();
        const interval = setInterval(fetchState, 2000);
        return () => clearInterval(interval);
    }, [gameID, navigate]);

    // 5. Get environment
    useEffect(() => {
        getEnvironment(gameID)
            .then(env => setEnvironment(env))
            .catch(error => console.error(error));
    }, [gameID]);

    // 6. Get Drawings & Players
    useEffect(() => {
        const fetchDrawings = () => {
            getDrawings(gameID).then(res => setDrawings(res)).catch(console.error);
        }
        fetchDrawings();
        const interval = setInterval(fetchDrawings, 2000);
        return () => clearInterval(interval);
    }, [gameID]);

    useEffect(() => {
        const fetchPlayers = async () => {
            await getPlayers(gameID).then(res => setPlayers(res)).catch(console.error);
        }
        fetchPlayers();
        const interval = setInterval(fetchPlayers, 2000);
        return () => clearInterval(interval);
    }, [gameID]);

    // 7. WEBSOCKET CONNECTION
    useEffect(() => {
        console.log(`[Lobby] opening AI websocket for gameID=${gameID}`);
        const aiSocketUrl = AI_WS_URL.startsWith('http')
            ? `${AI_WS_URL}/ws/story/${gameID}`
            : `${AI_WS_URL}/${gameID}`;
        const ws = new WebSocket(aiSocketUrl);
        
        ws.onopen = () => {
            console.log(`[Lobby] AI websocket open for gameID=${gameID}`);
            setStorySocketReady(true);
        };
        ws.onmessage = (event) => {
            console.log(`[Lobby] AI websocket message for gameID=${gameID} length=${event.data.length}`);
            setStory((prev) => prev + event.data);
        };
        ws.onerror = (error) => {
            console.error(`[Lobby] AI websocket error for gameID=${gameID}`, error);
        };
        ws.onclose = () => {
            console.log(`[Lobby] AI websocket closed for gameID=${gameID}`);
            setStorySocketReady(false);
        };

        wsRef.current = ws;

        return () => {
            setStorySocketReady(false);
            if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
                ws.close();
            }
        };
    }, [gameID]);

    // 8. AUTO-TRIGGER STORY GENERATION
    useEffect(() => {
        const socketReady = wsRef.current?.readyState === WebSocket.OPEN && storySocketReady;
        const hasAllPlayers = players.length > 0;
        const hasAllDrawings = drawings.length > 0 && drawings.length === players.length;
        const canGenerate = socketReady && hasAllPlayers && hasAllDrawings && Boolean(environment) && !story && !hasSentStoryRequest.current;

        console.log(`[Lobby] AI trigger check gameID=${gameID} socketReady=${socketReady} players=${players.length} drawings=${drawings.length} environment=${Boolean(environment)} story=${Boolean(story)} sent=${hasSentStoryRequest.current}`);

        if (!canGenerate) return;

        hasSentStoryRequest.current = true;
        hasTriggeredStory.current = true;
        console.log(`[Lobby] sending AI generate request gameID=${gameID}`);
        wsRef.current.send(JSON.stringify({
            action: "generate",
            drawings,
            environment,
        }));
    }, [drawings, players, environment, storySocketReady, story]);


    //Button to debug story generation that cleans the current story and sends a websocket to generate another one
    const handleDebugGenerate = () => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        setStory("");
        wsRef.current.send(JSON.stringify({
            action: "generate",
            drawings: drawings,
            environment: environment
        }));
    }

    if (!playerID) return null;

    return (
        <main className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${test})` }}>
            <div className="overlay">
                <div className="LobbyContent">
                    <h1 id="homeText"> Lobby </h1>
                    <h1 className="Environment"> Environment: {environment} </h1>
                    
                    <div className="CarouselAndStory">
                        <div className="Carousel">
                            <h1 className="CarouselText">Drawings</h1>
                            <DrawingCarousel gameID={gameID} />
                            <div className="ChatDivLobby">
                                <Chat clientName={username} gameID={gameID} />
                            </div>
                        </div>
                        
                        <div className="CombatStory">
                            <h1 className="CombatStoryText">Fight</h1>
                            
                            {drawings.length < players.length ? (
                                <h3 style={{ color: "#ff8787", textAlign: "center", marginTop: "20px" }}>
                                    Waiting for players to finish drawing... ({drawings.length}/{players.length})
                                </h3>
                            ) : (
                                <h1 style={{ whiteSpace: "pre-wrap" }}>
                                    {story || "Analyzing drawings and preparing the arena..."}
                                </h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Lobby;