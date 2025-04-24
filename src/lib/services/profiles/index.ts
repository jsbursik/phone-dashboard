import { Service } from '../Service';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import * as path from 'path';

interface ProfileConfig {
	model: string;
	variables: string[];
	config: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROD = process.env.NODE_ENV === 'production';

const cfgsDir: string = PROD ? '/profiles' : path.join(__dirname, '/cfgs');

export class profile extends Service {
	addProfile(m: string, v: string[], c: string): void {
		const cfg = { model: m, variables: v, config: c };
		const modelFileName = m.replace(/\s+/g, '_').toLowerCase();
		fs.writeFileSync(path.join(cfgsDir, `${modelFileName}.json`), JSON.stringify(cfg, null, 2));
	}

	getModels(): string[] {
		const files = fs.readdirSync(cfgsDir);
		const models: string[] = [];
		for (const file of files) {
			if (file.endsWith('.json')) {
				const data = fs.readFileSync(path.join(cfgsDir, file));
				const json: ProfileConfig = JSON.parse(data.toString());
				models.push(json.model);
			}
		}
		return models;
	}
}
