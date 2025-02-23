# Dive-Citibike

# Pendiente de realizar README por falta de tiempo

## Crear fichero de variables de entorno en la raíz (.env) con estos valores
```bash
# MongoDB Environment
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_EXPRESS_USERNAME=admin
MONGO_EXPRESS_PASSWORD=password

MONGO_URI="mongodb://mongodb:27017"
MONGO_DB_NAME=tripdata
MONGO_COLLECTION_NAME=links
```

## Ejecutar docker-compose
```bash
docker-compose up -d
```

### Si hay errores y necesitas relanzar con cambios puedes utilizar este comando para compilar las imágenes de nuevo
```bash
docker-compose up -d --build
```

### Cargar MongoDB
No he tenido tiempo de actualizar por lo que la primera carga es manual, después podemos habilitar ofelia para realizar cron
```bash
docker exec -it "tasks" sh -c "python scraper.py"
```

### Una vez terminado puedes eliminar todo con el comando
```bash
docker-compose down --rmi all --volumes
```

## API Endpoints
BASE_PATH = "http://127.0.0.1:8081/api/v1/trips/bikes"

### Get data endpoint
#### Devuelve una lista con date_id y data
$BASE_PATH/data/{year}
+
Optional QueryParam month

### Get stats endpoint
#### Devuelve una lista con date_id y data
$BASE_PATH/stats/{year}/{month}

### Get dates endpoint
#### Devuelve un mapa en el que el ID es el año y una lista de fechas para las que hay URLs, el valor "0" Significa que no tiene mes asociado
$BASE_PATH/dates
