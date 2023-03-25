# Table Content

- [Table Content](#table-content)
- [Sqlite utils](#sqlite-utils)
  - [Example](#example)
  - [Sqlite Extends Class](#sqlite-extends-class)



# Sqlite utils

## Example

```js
import * as sqlite from 'sqlite3';
import { Memoria } from '@kamerrezz/libs';

const db = new sqlite.Database('db.sqlite');

const User = {
	id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
	name: 'TEXT',
	image: 'TEXT',
	email: 'TEXT',
	profile: 'INTEGER',
	rank: 'TEXT',
	points: 'INTEGER',
};

const UserSQL = new Memoria('users', User, db);

for (let i = 10; i < 20; i++) {
    UserSQL.insert({
        name: 'Kamerrezz ' + i,
        image: 'https://cdn.discordapp.com/avatars/702000000000000000',
        email: 'asdasd@asdas.com',
        profile: 1 as any,
        rank: 'user',
    }).then(console.log).catch(console.error);
}

let id = 1 as any;
UserSQL.find({ id }).then(console.log).catch(console.error);
UserSQL.findAll({ rank: 'user'}).then(console.log).catch(console.error);
UserSQL.update({ id }, { name: 'BulzyKrown' }).then(console.log).catch(console.error);
UserSQL.upsert({ id }, { name: 'BulzyKrown 5' }).then(console.log).catch(console.error);
UserSQL.delete({ id }).then(console.log).catch(console.error);
UserSQL.deleteAll().then(console.log).catch(console.error);
UserSQL.drop().then(console.log).catch(console.error);
```

## Sqlite Extends Class

```js
import sqlite3 from 'sqlite3';
import Memoria from './Memoria';

const database = new sqlite3.Database('./db.sqlite3');

const usuariosModel = {
	id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
	name: 'TEXT',
	email: 'TEXT',
	age: 'INTEGER',
};

class Usuarios extends Memoria<typeof usuariosModel> {
	constructor(database: sqlite3.Database) {
		super('usuarios', usuariosModel, database);
	}

	async getUsuarioByName(name: string) {
		return this.find({ name });
	}
}

const usuarios = new Usuarios(database);

(async () => {
	const nuevoUsuario = { name: 'Juan', email: 'juan@example.com', age: 30 };
	await usuarios.create(nuevoUsuario);
	const usuario = await usuarios.getUsuarioByName('Juan');
	console.log(usuario);
})();
```
