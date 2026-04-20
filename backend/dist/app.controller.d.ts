import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    saveImage(body: {
        imageDataUrl?: string;
    }): Promise<{
        ok: boolean;
        message: string;
        fileName?: undefined;
        relativePath?: undefined;
    } | {
        ok: boolean;
        fileName: string;
        relativePath: string;
        message?: undefined;
    }>;
}
