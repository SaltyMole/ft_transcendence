import { Injectable } from '@nestjs/common';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async savePngFromDataUrl(imageDataUrl: string) {
    const match = imageDataUrl.match(/^data:image\/png;base64,(.+)$/);

    if (!match) {
      return {
        ok: false,
        message: 'Invalid format. Expected: data:image/png;base64,...',
      };
    }

    const pngsDir = join(process.cwd(), 'pngs');
    await mkdir(pngsDir, { recursive: true });

    const fileName = `ImageSave-${Date.now()}-${randomUUID()}.png`;
    const filePath = join(pngsDir, fileName);
    const buffer = Buffer.from(match[1], 'base64');

    await writeFile(filePath, buffer);

    return {
      ok: true,
      fileName,
      relativePath: `pngs/${fileName}`,
    };
  }
}
