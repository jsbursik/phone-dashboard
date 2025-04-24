import { Service } from '../Service';
import * as path from 'path';

export class test_service extends Service {
	debugLog(): void {
		console.log(path.resolve('phone-dashboard'));
	}
}
