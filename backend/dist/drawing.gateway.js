"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let DrawingGateway = class DrawingGateway {
    server;
    activeState = [];
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
        client.emit('load', this.activeState);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handleDrawUpdate(_, payload) {
        if (payload.index >= 0 && payload.index <= this.activeState.length) {
            if (payload.index === this.activeState.length) {
                this.activeState.push(payload.line);
            }
            else {
                this.activeState[payload.index] = payload.line;
            }
        }
        this.server.emit('draw', payload);
    }
    handleDrawFinish(_, payload) {
        if (payload.index >= 0 && payload.index < this.activeState.length) {
            this.activeState[payload.index] = payload.line;
        }
        this.server.emit('draw', payload);
    }
    handleClear(_) {
        this.activeState = [];
        this.server.emit('clear');
    }
};
exports.DrawingGateway = DrawingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DrawingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('draw-update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], DrawingGateway.prototype, "handleDrawUpdate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('draw-finish'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], DrawingGateway.prototype, "handleDrawFinish", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('clear'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], DrawingGateway.prototype, "handleClear", null);
exports.DrawingGateway = DrawingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], DrawingGateway);
//# sourceMappingURL=drawing.gateway.js.map