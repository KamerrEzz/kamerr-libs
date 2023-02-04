# Table Content

- [Table Content](#table-content)
- [Sqlite utils](#sqlite-utils)
  - [Example](#example)
  - [Sqlite Extends Class](#sqlite-extends-class)



# Sqlite utils

## Example

```js
import * as sqlite3 from 'sqlite3';
import { Memoria } from '@kamerrezz/libs';

const db = new sqlite3.Database('database.sqlite');

const userModel = {
	id: 'INTEGER PRIMARY KEY',
	name: 'TEXT',
	email: 'TEXT',
	age: 'INTEGER',
};

const userMemoria = new Memoria() < typeof userModel > ('users', userModel, db);

async function main() {
	// Insertar un nuevo usuario
	await userMemoria.insert({
		name: 'John Doe',
		email: 'john.doe@example.com',
		age: 30,
	});

	// Actualizar el correo electrónico del usuario
	await userMemoria.update(
		{ name: 'John Doe' },
		{ email: 'new.email@example.com' }
	);

	// Obtener un usuario por su nombre
	const user = await userMemoria.find({ name: 'John Doe' });
	console.log(user); // { id: 1, name: 'John Doe', email: 'new.email@example.com', age: 30 }

	// Obtener todos los usuarios
	const users = await userMemoria.findAll({});
	console.log(users); // [ { id: 1, name: 'John Doe', email: 'new.email@example.com', age: 30 } ]

	// Eliminar un usuario por su nombre
	await userMemoria.delete({ name: 'John Doe' });

	// Eliminar todos los usuarios
	await userMemoria.deleteAll();

	// Eliminar la tabla de usuarios
	await userMemoria.drop();

	db.close();
}

main();
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
