"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memoria = void 0;
class Memoria {
    constructor(table, model, database) {
        this.table = table;
        this.model = model;
        this.db = database;
        this.db.run(`CREATE TABLE IF NOT EXISTS ${this.table} (${Object.keys(this.model)
            .map((key) => `${key} ${this.model[key]}`)
            .join(', ')})`);
        const columns = Object.keys(this.model);
        this.db.all(`PRAGMA table_info(${this.table})`, (err, rows) => {
            if (err)
                throw err;
            const dbColumns = rows.map((row) => row.name);
            const newColumns = columns.filter((column) => !dbColumns.includes(column));
            if (newColumns.length > 0) {
                newColumns.forEach((column) => {
                    this.db.run(`ALTER TABLE ${this.table} ADD COLUMN ${column} ${this.model[column]}`);
                });
            }
        });
    }
    find(query, options) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ${this.table} WHERE ${this.parseQuery(query)}`;
            if (options && options.limit)
                sql += ` LIMIT ${options.limit}`;
            this.db.get(sql, (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row);
            });
        });
    }
    findAll(query, options) {
        return new Promise((resolve, reject) => {
            if (query) {
                let sql = `SELECT * FROM ${this.table} WHERE ${this.parseQuery(query)}`;
                if (options && options.limit)
                    sql += ` LIMIT ${options.limit}`;
                this.db.all(sql, (err, rows) => {
                    if (err)
                        reject(err);
                    else
                        resolve(rows);
                });
            }
            else {
                let sql = `SELECT * FROM ${this.table}`;
                if (options && options.limit)
                    sql += ` LIMIT ${options.limit}`;
                this.db.all(sql, (err, rows) => {
                    if (err)
                        reject(err);
                    else
                        resolve(rows);
                });
            }
        });
    }
    insert(data) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO ${this.table} (${this.parseData(data, 'keys')}) VALUES (${this.parseData(data, 'values')})`, (err) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    update(query, data) {
        return new Promise((resolve, reject) => {
            this.db.run(`UPDATE ${this.table} SET ${this.parseData(data, 'update')} WHERE ${this.parseQuery(query)}`, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    upsert(query, data) {
        return new Promise((resolve, reject) => {
            this.find(query)
                .then((row) => {
                if (row)
                    this.update(query, data).then(resolve).catch(reject);
                else
                    this.insert(data).then(resolve).catch(reject);
            })
                .catch(reject);
        });
    }
    delete(query) {
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM ${this.table} WHERE ${this.parseData(query, 'update')}`, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM ${this.table}`, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    drop() {
        return new Promise((resolve, reject) => {
            this.db.run(`DROP TABLE ${this.table}`, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    parseData(data, type) {
        if (type === 'keys')
            return Object.keys(data).join(', ');
        else if (type === 'values')
            return Object.values(data)
                .map((value) => `'${value}'`)
                .join(', ');
        else if (type === 'update')
            return Object.keys(data)
                .map((key) => `${key} = "${data[key]}"`)
                .join(', ');
    }
    parseQuery(query) {
        const keys = Object.keys(query);
        const values = Object.values(query);
        return keys
            .map((key, index) => `${key} = "${values[index]}"`)
            .join(' AND ');
    }
}
exports.Memoria = Memoria;
//# sourceMappingURL=Sqlite.js.map