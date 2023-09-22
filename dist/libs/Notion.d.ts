import { Client } from '@notionhq/client';
import { User, PropertyFilter, insertRow } from '../types/NotionCustom';
declare class NotionService {
    Notion: Client;
    db: any;
    storage: string;
    constructor({ token, databaseId, storage }: {
        token: any;
        databaseId: any;
        storage: any;
    });
    getUsers: () => Promise<User[]>;
    getDatabase: () => Promise<import("@notionhq/client/build/src/api-endpoints").GetDatabaseResponse>;
    getDatabaseProperties: () => Promise<Record<string, {
        type: "number";
        number: {
            format: "number" | "real" | "percent" | "number_with_commas" | "dollar" | "canadian_dollar" | "singapore_dollar" | "euro" | "pound" | "yen" | "ruble" | "rupee" | "won" | "yuan" | "lira" | "rupiah" | "franc" | "hong_kong_dollar" | "new_zealand_dollar" | "krona" | "norwegian_krone" | "mexican_peso" | "rand" | "new_taiwan_dollar" | "danish_krone" | "zloty" | "baht" | "forint" | "koruna" | "shekel" | "chilean_peso" | "philippine_peso" | "dirham" | "colombian_peso" | "riyal" | "ringgit" | "leu" | "argentine_peso" | "uruguayan_peso";
        };
        id: string;
        name: string;
    } | {
        type: "formula";
        formula: {
            expression: string;
        };
        id: string;
        name: string;
    } | {
        type: "select";
        select: {
            options: {
                id: string;
                name: string;
                color: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
            }[];
        };
        id: string;
        name: string;
    } | {
        type: "multi_select";
        multi_select: {
            options: {
                id: string;
                name: string;
                color: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
            }[];
        };
        id: string;
        name: string;
    } | {
        type: "status";
        status: {
            options: {
                id: string;
                name: string;
                color: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
            }[];
            groups: {
                id: string;
                name: string;
                color: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
                option_ids: string[];
            }[];
        };
        id: string;
        name: string;
    } | {
        type: "relation";
        relation: {
            type: "single_property";
            single_property: {
                [x: string]: never;
            };
            database_id: string;
        } | {
            type: "dual_property";
            dual_property: {
                synced_property_id: string;
                synced_property_name: string;
            };
            database_id: string;
        };
        id: string;
        name: string;
    } | {
        type: "rollup";
        rollup: {
            rollup_property_name: string;
            relation_property_name: string;
            rollup_property_id: string;
            relation_property_id: string;
            function: "max" | "empty" | "range" | "count" | "count_values" | "not_empty" | "unique" | "show_unique" | "percent_empty" | "percent_not_empty" | "sum" | "average" | "median" | "min" | "earliest_date" | "latest_date" | "date_range" | "checked" | "unchecked" | "percent_checked" | "percent_unchecked" | "count_per_group" | "percent_per_group" | "show_original";
        };
        id: string;
        name: string;
    } | {
        type: "title";
        title: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "rich_text";
        rich_text: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "url";
        url: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "people";
        people: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "files";
        files: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "email";
        email: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "phone_number";
        phone_number: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "date";
        date: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "checkbox";
        checkbox: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "created_by";
        created_by: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "created_time";
        created_time: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "last_edited_by";
        last_edited_by: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "last_edited_time";
        last_edited_time: {
            [x: string]: never;
        };
        id: string;
        name: string;
    }>>;
    getDatabasePropertiesKeys: () => Promise<string[]>;
    getDatabasePropertiesValues: () => Promise<({
        type: "number";
        number: {
            format: "number" | "real" | "percent" | "number_with_commas" | "dollar" | "canadian_dollar" | "singapore_dollar" | "euro" | "pound" | "yen" | "ruble" | "rupee" | "won" | "yuan" | "lira" | "rupiah" | "franc" | "hong_kong_dollar" | "new_zealand_dollar" | "krona" | "norwegian_krone" | "mexican_peso" | "rand" | "new_taiwan_dollar" | "danish_krone" | "zloty" | "baht" | "forint" | "koruna" | "shekel" | "chilean_peso" | "philippine_peso" | "dirham" | "colombian_peso" | "riyal" | "ringgit" | "leu" | "argentine_peso" | "uruguayan_peso";
        };
        id: string;
        name: string;
    } | {
        type: "formula";
        formula: {
            expression: string;
        };
        id: string;
        name: string;
    } | {
        type: "select";
        select: {
            options: {
                id: string;
                name: string;
                color: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
            }[];
        };
        id: string;
        name: string;
    } | {
        type: "multi_select";
        multi_select: {
            options: {
                id: string;
                name: string;
                color: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
            }[];
        };
        id: string;
        name: string;
    } | {
        type: "status";
        status: {
            options: {
                id: string;
                name: string;
                color: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
            }[];
            groups: {
                id: string;
                name: string;
                color: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
                option_ids: string[];
            }[];
        };
        id: string;
        name: string;
    } | {
        type: "relation";
        relation: {
            type: "single_property";
            single_property: {
                [x: string]: never;
            };
            database_id: string;
        } | {
            type: "dual_property";
            dual_property: {
                synced_property_id: string;
                synced_property_name: string;
            };
            database_id: string;
        };
        id: string;
        name: string;
    } | {
        type: "rollup";
        rollup: {
            rollup_property_name: string;
            relation_property_name: string;
            rollup_property_id: string;
            relation_property_id: string;
            function: "max" | "empty" | "range" | "count" | "count_values" | "not_empty" | "unique" | "show_unique" | "percent_empty" | "percent_not_empty" | "sum" | "average" | "median" | "min" | "earliest_date" | "latest_date" | "date_range" | "checked" | "unchecked" | "percent_checked" | "percent_unchecked" | "count_per_group" | "percent_per_group" | "show_original";
        };
        id: string;
        name: string;
    } | {
        type: "title";
        title: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "rich_text";
        rich_text: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "url";
        url: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "people";
        people: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "files";
        files: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "email";
        email: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "phone_number";
        phone_number: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "date";
        date: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "checkbox";
        checkbox: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "created_by";
        created_by: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "created_time";
        created_time: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "last_edited_by";
        last_edited_by: {
            [x: string]: never;
        };
        id: string;
        name: string;
    } | {
        type: "last_edited_time";
        last_edited_time: {
            [x: string]: never;
        };
        id: string;
        name: string;
    })[]>;
    insertRow: (data: insertRow) => Promise<import("@notionhq/client/build/src/api-endpoints").CreatePageResponse>;
    getRows: () => Promise<import("@notionhq/client/build/src/api-endpoints").QueryDatabaseResponse>;
    getRow: (id: string) => Promise<import("@notionhq/client/build/src/api-endpoints").GetPageResponse>;
    getFilterRow: (filter: PropertyFilter) => Promise<import("@notionhq/client/build/src/api-endpoints").QueryDatabaseResponse>;
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