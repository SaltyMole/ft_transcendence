import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
interface DrawLine {
    color: string;
    points: number[];
}
export declare class DrawingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private activeState;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleDrawUpdate(_: Socket, payload: {
        index: number;
        line: DrawLine;
    }): void;
    handleDrawFinish(_: Socket, payload: {
        index: number;
        line: DrawLine;
    }): void;
    handleClear(_: Socket): void;
}
export {};
