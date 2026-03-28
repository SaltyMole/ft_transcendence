import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface DrawLine {
  color: string;
  points: number[];
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DrawingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private activeState: DrawLine[] = [];

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('load', this.activeState);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('draw-update')
  handleDrawUpdate(_: Socket, payload: { index: number; line: DrawLine }) {
    // Update a stroke while it is being drawn.
    if (payload.index >= 0 && payload.index <= this.activeState.length) {
      if (payload.index === this.activeState.length) {
        this.activeState.push(payload.line);
      } else {
        this.activeState[payload.index] = payload.line;
      }
    }

    this.server.emit('draw', payload);
  }

  @SubscribeMessage('draw-finish')
  handleDrawFinish(_: Socket, payload: { index: number; line: DrawLine }) {
    if (payload.index >= 0 && payload.index < this.activeState.length) {
      this.activeState[payload.index] = payload.line;
    }

    this.server.emit('draw', payload);
  }

  @SubscribeMessage('clear')
  handleClear(_: Socket) {
    this.activeState = [];
    this.server.emit('clear');
  }
}
