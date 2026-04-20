export declare class AppService {
    getHello(): string;
    savePngFromDataUrl(imageDataUrl: string): Promise<{
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
