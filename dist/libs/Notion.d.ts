import { User, PropertyFilter, insertRow } from '../types/NotionCustom';
declare class NotionService {
    Notion: any;
    db: any;
    storage: string;
    constructor({ Client, token, databaseId, storage }: {
        Client: any;
        token: any;
        databaseId: any;
        storage: any;
    });
    getUsers: () => Promise<User[]>;
    getDatabase: () => Promise<any>;
    getDatabaseProperties: () => Promise<any>;
    getDatabasePropertiesKeys: () => Promise<string[]>;
    getDatabasePropertiesValues: () => Promise<unknown[]>;
    insertRow: (data: insertRow) => Promise<any>;
    getRows: () => Promise<any>;
    getRow: (id: string) => Promise<any>;
    getFilterRow: (filter: PropertyFilter) => Promise<any>;
    parseRow: (row: {
        id: string;
        properties: object;
    }) => {
        [key: string]: any;
        id: string;
    };
    parseRows: (rows: {
        id: string;
        properties: object;
    }[]) => object[];
    dbGet: () => Promise<object[]>;
    dbFind: (query: {
        [key: string]: string | number | boolean;
    }) => Promise<object[] | boolean>;
    getFindOne: (query: {
        [key: string]: string | number | boolean;
    }) => Promise<unknown>;
    dbSave: (data: object) => void;
    dbinsert: (data: object) => Promise<void>;
    dbDelete: (query: {
        [key: string]: string | number | boolean;
    }) => Promise<unknown>;
    dbUpdate: (query: {
        [key: string]: string | number | boolean;
    }, data: object) => Promise<unknown>;
    dbRemove: (query: {
        [key: string]: string | number | boolean;
    }, propertie: string) => Promise<unknown>;
    dbCreate: () => void;
    dbReload: () => void;
    _exists: () => boolean;
}
export { NotionService };
//# sourceMappingURL=Notion.d.ts.map