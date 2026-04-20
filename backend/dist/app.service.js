"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const node_crypto_1 = require("node:crypto");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    async savePngFromDataUrl(imageDataUrl) {
        const match = imageDataUrl.match(/^data:image\/png;base64,(.+)$/);
        if (!match) {
            return {
                ok: false,
                message: 'Invalid format. Expected: data:image/png;base64,...',
            };
        }
        const pngsDir = (0, node_path_1.join)(process.cwd(), 'pngs');
        await (0, promises_1.mkdir)(pngsDir, { recursive: true });
        const fileName = `ImageSave-${Date.now()}-${(0, node_crypto_1.randomUUID)()}.png`;
        const filePath = (0, node_path_1.join)(pngsDir, fileName);
        const buffer = Buffer.from(match[1], 'base64');
        await (0, promises_1.writeFile)(filePath, buffer);
        return {
            ok: true,
            fileName,
            relativePath: `pngs/${fileName}`,
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map