"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memoria = void 0;
class Memoria {
    constructor(table, model, database) {
        this.table = table;
        this.model = model;
        this.db = database;
        this.db.run(`CREATE TABLE IF NOT EXISTS ${this.table} (${Object.keys(this.model).map(key => `${key} ${this.model[key]}`).join(", ")})`);
        const columns = Object.keys(this.model);
        this.db.all(`PRAGMA table_info(${this.table})`, (err, rows) => {
            if (err)
                throw err;
            const dbColumns = rows.map(row => row.name);
            const newColumns = columns.filter(column => !dbColumns.includes(column));
            if (newColumns.length > 0) {
                newColumns.forEach(column => {
                    this.db.run(`ALTER TABLE ${this.table} ADD COLUMN ${column} ${this.model[column]}`);
                });
            }
        });
    }
    find(query) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM ${this.table} WHERE ${query}`, (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row);
            });
        });
    }
    findAll(query) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM ${this.table} WHERE ${query}`, (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
    insert(data) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO ${this.table} (${Object.keys(data)}) VALUES (${Object.values(data)})`, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    update(query, data) {
        return new Promise((resolve, reject) => {
            this.db.run(`UPDATE ${this.table} SET ${data} WHERE ${query}`, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    upsert(query, data) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO ${this.table} (${Object.keys(data).join(", ")}) 
                   VALUES (${Object.values(data).map(value => `"${value}"`).join(", ")})
                   ON CONFLICT (${Object.keys(query).join(", ")})
                   DO UPDATE SET ${Object.keys(data).map(key => `${key} = "${data[key]}"`).join(", ")}`, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    delete(query) {
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM ${this.table} WHERE ${query}`, (err) => {
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
}
exports.Memoria = Memoria;
//# sourceMappingURL=Sqlite.js.map