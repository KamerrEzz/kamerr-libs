"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionService = void 0;
// @ts-nocheck
const client_1 = require("@notionhq/client");
const fs = require("fs");
class NotionService {
    constructor({ token, databaseId, storage }) {
        this.getUsers = async () => {
            const users = await this.Notion.users.list({});
            const typePerson = users.results.find((user) => user.type == 'person');
            return typePerson;
        };
        this.getDatabase = async () => {
            const database = await this.Notion.databases.retrieve({
                database_id: this.db,
            });
            return database;
        };
        this.getDatabaseProperties = async () => {
            const database = await this.getDatabase();
            const properties = database.properties;
            return properties;
        };
        this.getDatabasePropertiesKeys = async () => {
            const properties = await this.getDatabaseProperties();
            const keys = Object.keys(properties);
            return keys;
        };
        this.getDatabasePropertiesValues = async () => {
            const properties = await this.getDatabaseProperties();
            const values = Object.values(properties);
            return values;
        };
        this.insertRow = async (data) => {
            // @ts-ignore
            const response = await this.Notion.pages.create({
                parent: { database_id: this.db },
                properties: data,
            });
            return response;
        };
        this.getRows = async () => {
            const response = await this.Notion.databases.query({
                database_id: this.db,
            });
            return response;
        };
        this.getRow = async (id) => {
            const response = await this.Notion.pages.retrieve({
                page_id: id,
            });
            return response;
        };
        this.getFilterRow = async (filter) => {
            const response = await this.Notion.databases.query({
                database_id: this.db,
                filter: filter,
            });
            return response;
        };
        this.parseRow = (row) => {
            const properties = row.properties;
            const keys = Object.keys(properties);
            const values = Object.values(properties);
            const data = {
                id: row.id,
            };
            keys.forEach((key, index) => {
                const value = values[index];
                if (value.type == 'title') {
                    data[key] = value.title.length > 0 ? value.title[0].plain_text : false;
                }
                else if (value.type == 'rich_text') {
                    data[key] =
                        value.rich_text.length > 0 ? value.rich_text[0].plain_text : false;
                }
                else if (value.type == 'multi_select') {
                    data[key] =
                        value.multi_select.length > 0
                            ? value.multi_select.map((item) => ({
                                id: item.id,
                                name: item.name,
                            }))
                            : false;
                }
                else if (value.type == 'select') {
                    data[key] = value.select
                        ? { id: value.select.id, name: value.select.name }
                        : false;
                }
                else if (value.type == 'number') {
                    data[key] = value.number ? value.number : false;
                }
                else {
                    data[key] = value[value.type];
                }
            });
            return data;
        };
        this.parseRows = (rows) => {
            const data = [];
            rows.forEach((row) => data.push(this.parseRow(row)));
            return data;
        };
        this.dbGet = () => {
            return new Promise((resolve, reject) => {
                const folder = 'tmp';
                const file = `${folder}/notion-${this.storage}.json`;
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder);
                }
                if (!fs.existsSync(file)) {
                    fs.writeFileSync(file, JSON.stringify([]));
                }
                const data = fs.readFileSync(file);
                const json = JSON.parse(data);
                resolve(json);
            });
        };
        this.dbFind = (query) => {
            return new Promise(async (resolve, _reject) => {
                const data = await this.dbGet();
                const keys = Object.keys(query);
                const values = Object.values(query);
                const result = data.filter((item) => {
                    let valid = true;
                    keys.forEach((key, index) => {
                        if (item[key] != values[index]) {
                            valid = false;
                        }
                    });
                    return valid;
                });
                if (result.length > 0) {
                    resolve(result);
                }
                else {
                    resolve(false);
                }
            });
        };
        this.getFindOne = (query) => {
            return new Promise(async (resolve, _reject) => {
                const data = await this.dbFind(query);
                if (data) {
                    resolve(data[0]);
                }
                else {
                    resolve(false);
                }
            });
        };
        this.dbSave = (data) => {
            const folder = 'tmp';
            const file = `${folder}/notion-${this.storage}.json`;
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder);
            }
            fs.writeFileSync(file, JSON.stringify(data, null, 2));
        };
        this.dbinsert = async (data) => {
            const db = await this.dbGet();
            db.push(data);
            this.dbSave(db);
        };
        this.dbDelete = (query) => {
            return new Promise(async (resolve, _reject) => {
                const data = await this.dbGet();
                const keys = Object.keys(query);
                const values = Object.values(query);
                const result = data.filter((item) => {
                    let valid = true;
                    keys.forEach((key, index) => {
                        if (item[key] == values[index]) {
                            valid = false;
                        }
                    });
                    return valid;
                });
                this.dbSave(result);
                resolve(result);
            });
        };
        this.dbUpdate = (query, data) => {
            return new Promise(async (resolve, _reject) => {
                const db = await this.dbGet();
                const keys = Object.keys(query);
                const values = Object.values(query);
                const result = db.map((item) => {
                    let valid = true;
                    keys.forEach((key, index) => {
                        if (item[key] == values[index]) {
                            valid = false;
                        }
                    });
                    if (!valid) {
                        return { ...item, ...data };
                    }
                    else {
                        return item;
                    }
                });
                this.dbSave(result);
                resolve(result);
            });
        };
        this.dbRemove = (query, propertie) => {
            return new Promise(async (resolve, _reject) => {
                const db = await this.dbGet();
                const keys = Object.keys(query);
                const values = Object.values(query);
                const result = db.map((item) => {
                    let valid = true;
                    keys.forEach((key, index) => {
                        if (item[key] == values[index]) {
                            valid = false;
                        }
                    });
                    if (!valid) {
                        delete item[propertie];
                        return item;
                    }
                    else {
                        return item;
                    }
                });
                this.dbSave(result);
                resolve(result);
            });
        };
        this.dbCreate = () => {
            this.getRows().then((rows) => {
                const data = this.parseRows(rows.results);
                this.dbSave(data);
            });
        };
        this.dbReload = () => {
            this.dbCreate();
        };
        this._exists = () => {
            const folder = 'tmp';
            const file = `${folder}/notion-${this.storage}.json`;
            if (!fs.existsSync(folder)) {
                console.log('Folder not exists');
                return false;
            }
            if (!fs.existsSync(file)) {
                console.log('File not exists');
                return false;
            }
            return true;
        };
        this.Notion = new client_1.Client({
            auth: token,
        });
        this.db = databaseId;
        this.storage = storage;
        if (this.storage) {
            if (this._exists())
                return;
            this.dbCreate();
        }
    }
}
exports.NotionService = NotionService;
//# sourceMappingURL=Notion.js.map