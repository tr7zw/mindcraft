import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';

export class MemoryBank {
	constructor(agent, name) {
		this.memory = {};
		this.name = agent.name;
		this.memory_fp = `./bots/${this.name}/memorybank-${name}.json`;
	}

	rememberPlace(name, x, y, z) {
		this.memory[name] = [x, y, z];
	}

	recallPlace(name) {
		return this.memory[name];
	}

	async save() {
        try {
            const data = {
                memory: this.memory
            };
            writeFileSync(this.memory_fp, JSON.stringify(data, null, 2));
            console.log('Saved memorybank to:', this.memory_fp);
        } catch (error) {
            console.error('Failed to save memorybank:', error);
            throw error;
        }
    }

    load() {
        try {
            if (!existsSync(this.memory_fp)) {
                console.log('No memorybank file found.');
                return null;
            }
            const data = JSON.parse(readFileSync(this.memory_fp, 'utf8'));
            this.memory = data.memory || {};
            console.log('Loaded memorybank:', this.memory);
            return data;
        } catch (error) {
            console.error('Failed to load memorybank:', error);
            throw error;
        }
    }

	getKeys() {
		return Object.keys(this.memory).join(', ')
	}
}