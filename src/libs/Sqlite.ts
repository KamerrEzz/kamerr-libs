declare namespace sqlite3 {
	export interface Database {
		run(query: string, callback?: (err?: Error) => void): this;
		get(query: string, callback?: (err?: Error, row?: any) => any): this;
		all(query: string, callback?: (err?: Error, rows?: any[]) => void): this;
	}
}

interface Model {
	[key: string]: string;
}

class Memoria<T extends Model> {
	table: string;
	model: T;
	db: sqlite3.Database;

	constructor(table: string, model: T, database: sqlite3.Database) {
		this.table = table;
		this.model = model;
		this.db = database;
		this.db.run(
			`CREATE TABLE IF NOT EXISTS ${this.table} (${Object.keys(this.model)
				.map((key) => `${key} ${this.model[key]}`)
				.join(', ')})`
		);
		const columns = Object.keys(this.model);
		this.db.all(`PRAGMA table_info(${this.table})`, (err, rows) => {
			if (err) throw err;
			const dbColumns = (rows as { name: string }[]).map((row) => row.name);
			const newColumns = columns.filter(
				(column) => !dbColumns.includes(column)
			);
			if (newColumns.length > 0) {
				newColumns.forEach((column) => {
					this.db.run(
						`ALTER TABLE ${this.table} ADD COLUMN ${column} ${this.model[column]}`
					);
				});
			}
		});
	}

	find(query: Partial<T>): Promise<Partial<T> | undefined> {
		return new Promise((resolve, reject) => {
			this.db.get(
				`SELECT * FROM ${this.table} WHERE ${this.parseQuery(query)}`,
				(err: Error | undefined, row: object | undefined) => {
					if (err) reject(err);
					else resolve(row);
				}
			);
		});
	}

	findAll(query?: Partial<T>): Promise<Partial<T>[]> {
		return new Promise((resolve, reject) => {
			if (query) {
				this.db.all(
					`SELECT * FROM ${this.table} WHERE ${this.parseQuery(query)}`,
					(err: Error | undefined, rows: object[] | undefined) => {
						if (err) reject(err);
						else resolve(rows as any);
					}
				);
			} else {
				this.db.all(
					`SELECT * FROM ${this.table}`,
					(err: Error | undefined, rows: object[] | undefined) => {
						if (err) reject(err);
						else resolve(rows as any);
					}
				);
			}
		});
	}

	insert(data: Partial<T>): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.run(
				`INSERT INTO ${this.table} (${this.parseData(
					data,
					'keys'
				)}) VALUES (${this.parseData(data, 'values')})`,
				(err: Error | undefined) => {
					if (err) reject(err);
					else resolve(data as any);
				}
			);
		});
	}

	update(query: Partial<T>, data: Partial<T>): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.run(
				`UPDATE ${this.table} SET ${this.parseData(
					data,
					'update'
				)} WHERE ${this.parseQuery(query)}`,
				(err: Error | undefined) => {
					if (err) reject(err);
					else resolve();
				}
			);
		});
	}

	upsert(query: Partial<T>, data: Partial<T>): Promise<void> {
		return new Promise((resolve, reject) => {
			this.find(query)
				.then((row) => {
					if (row) this.update(query, data).then(resolve).catch(reject);
					else this.insert(data).then(resolve).catch(reject);
				})
				.catch(reject);
		});
	}

	delete(query: Partial<T>): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.run(
				`DELETE FROM ${this.table} WHERE ${this.parseData(query, 'update')}`,
				(err: Error | undefined) => {
					if (err) reject(err);
					else resolve();
				}
			);
		});
	}

	deleteAll(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.run(`DELETE FROM ${this.table}`, (err: Error | undefined) => {
				if (err) reject(err);
				else resolve();
			});
		});
	}

	drop(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.run(`DROP TABLE ${this.table}`, (err: Error | undefined) => {
				if (err) reject(err);
				else resolve();
			});
		});
	}

	parseData(data: any, type: 'keys' | 'values' | 'update'): any {
		if (type === 'keys') return Object.keys(data).join(', ');
		else if (type === 'values')
			return Object.values(data)
				.map((value) => `'${value}'`)
				.join(', ');
		else if (type === 'update')
			return Object.keys(data)
				.map((key) => `${key} = "${data[key]}"`)
				.join(', ');
	}

	parseQuery(query: any) {
		const keys = Object.keys(query);
		const values = Object.values(query);
		return keys
			.map((key, index) => `${key} = "${values[index]}"`)
			.join(' AND ');
	}
}

export { Memoria };
