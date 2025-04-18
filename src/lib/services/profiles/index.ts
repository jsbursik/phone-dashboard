import { Service } from '../Service';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class profile extends Service {
	addProfile(model: string, cfg: string): void {
		fs.writeFileSync(path.join(__dirname, `/cfgs/${model}.cfg`), cfg);
	}
}
