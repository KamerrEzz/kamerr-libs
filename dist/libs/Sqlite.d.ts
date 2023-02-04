declare namespace sqlite3 {
    interface Database {
        run(query: string, callback?: (err?: Error) => void): this;
        get(query: string, callback?: (err?: Error, row?: any) => any): this;
        all(query: string, callback?: (err?: Error, rows?: any[]) => void): this;
    }
}
interface Model {
    [key: string]: string;
}
declare class Memoria<T extends Model> {
    table: string;
    model: T;
    db: sqlite3.Database;
    constructor(table: string, model: T, database: sqlite3.Database);
    find(query: Partial<T>): Promise<Partial<T> | undefined>;
    findAll(query: Partial<T>): Promise<Partial<T>[]>;
    insert(data: Partial<T>): Promise<void>;
    update(query: Partial<T>, data: Partial<T>): Promise<void>;
    upsert(query: Partial<T>, data: Partial<T>): Promise<void>;
    delete(query: Partial<T>): Promise<void>;
    deleteAll(): Promise<void>;
    drop(): Promise<void>;
}
export { Memoria };
//# sourceMappingURL=Sqlite.d.ts.map