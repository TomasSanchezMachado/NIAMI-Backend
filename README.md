# NIAMI-Backend

## Tecnologías utilizadas

- **TypeScript**: Tipado estático para JavaScript moderno.
- **Node.js**: Entorno de ejecución para el backend.
- **PostgreSQL**: Base de datos relacional.
- **MikroORM**: ORM para TypeScript/Node.js, facilita el manejo de entidades y migraciones.
- **dotenv**: Manejo de variables de entorno.
- **uuid**: Generación de identificadores únicos.

## Estructura principal

- `src/entities/`: Entidades del dominio (User, Product, Order, etc).
- `src/migrations/`: Migraciones de base de datos.
- `mikro-orm.config.ts`: Configuración de MikroORM y conexión a la base de datos.
- `src/index.ts`: Punto de entrada del proyecto.

## ¿Cómo probarlo?

1. **Clona el repositorio**
	```bash
	git clone <url-del-repo>
	cd NIAMI-Backend
	```

2. **Instala las dependencias**
	```bash
	npm install
	```

3. **Configura las variables de entorno**
	- Crea un archivo `.env` en la raíz con los siguientes valores (ajusta según tu entorno):
	  ```env
	  DB_HOST=localhost
	  DB_PORT=5432
	  DB_USER=postgres
	  DB_PASSWORD=postgres
	  DB_NAME=niami
	  ```

4. **Ejecuta las migraciones**
	```bash
	npx mikro-orm migration:up
	```

5. **Inicia el proyecto en modo desarrollo**
	```bash
	npm run dev
	```
	O compílalo y ejecútalo:
	```bash
	npm run build
	npm start
	```

## Notas

- El proyecto actualmente solo define el modelo de datos y la estructura base. Hay que extenderlo agregando rutas, controladores y lógica de negocio.
- En la carpeta `src/entities` podes ver cómo están modeladas las entidades(Hay de mas).

