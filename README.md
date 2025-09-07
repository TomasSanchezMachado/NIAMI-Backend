# NIAMI-Backend

## Tecnologías utilizadas

- **TypeScript**: Tipado estático para JavaScript moderno.
- **Node.js**: Entorno de ejecución para el backend.
- **PostgreSQL**: Base de datos relacional.
- **MikroORM**: ORM para TypeScript/Node.js, facilita el manejo de entidades y migraciones.
- **Express**: Framework para crear servidores y APIs en Node.js.
- **dotenv**: Manejo de variables de entorno.
- **uuid**: Generación de identificadores únicos.
- **jsonwebtoken**: Autenticación y generación de tokens JWT.
- **bcryptjs**: Hashing y verificación de contraseñas.


## Estructura principal


La estructura principal del proyecto es la siguiente:

```text
NIAMI-Backend/
├── package.json
├── README.md
├── tsconfig.json
├── http/
│   ├── ingredient.http
│   ├── product.http
│   ├── promotion.http
│   ├── provider.http
│   └── user.http
├── src/
│   ├── index.ts
│   ├── mikro-orm.config.ts
│   ├── controllers/
│   │   ├── ingredient.controller.ts
│   │   ├── product.controller.ts
│   │   ├── promotion.controller.ts
│   │   ├── provider.controller.ts
│   │   └── user.controller.ts
│   ├── entities/
│   │   ├── BaseEntity.ts
│   │   ├── Category.ts
│   │   ├── Ingredient.ts
│   │   ├── Order.ts
│   │   ├── OrderItem.ts
│   │   ├── Product.ts
│   │   ├── Promotion.ts
│   │   ├── Provider.ts
│   │   ├── Supplier.ts
│   │   └── User.ts
│   ├── middlewares/
│   ├── migrations/
│   │   └── Migration20250826181250.ts
│   ├── routes/
│   │   ├── ingredient.routes.ts
│   │   ├── product.routes.ts
│   │   ├── promotion.routes.ts
│   │   ├── provider.routes.ts
│   │   └── user.routes.ts
│   └── services/
│       ├── ingredient.service.ts
│       ├── product.service.ts
│       ├── promotion.service.ts
│       ├── provider.service.ts
│       └── user.service.ts
```

Breve descripción de carpetas principales:
- `src/entities/`: Entidades del dominio.
- `src/migrations/`: Migraciones de base de datos.
- `src/controllers/`: Controladores de las rutas de la API.
- `src/routes/`: Definición de rutas de la API.
- `src/services/`: Lógica de negocio y servicios.
- `src/middlewares/`: Aun nada.
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
- El proyecto actualmente implementa la estructura base de un backend en Node.js con TypeScript, integrando MikroORM para la gestión de entidades y migraciones en PostgreSQL. Incluye modelos de dominio, rutas, controladores y servicios para las entidades principales (ingredientes, productos, promociones, proveedores y usuarios). Permite realizar operaciones CRUD básicas sobre estas entidades a través de endpoints definidos (extensión futura del sistema).
- En la carpeta `src/entities` hay entities de mas.

