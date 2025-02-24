# Dive-Citibike

# How you approached the problem
He centrado mis esfuerzos en resolver la prueba de código quizá sin tener en cuenta el resto de prueba a nivel teórico, en este caso asumo que no he gestionado bien los tiempos, o que el código desarrollado es extenso en comparación con lo que se pedía en la prueba, eso implica en que he subido un día tarde este documento explicando mi código.

# Assumptions or decisions made
## Backend
Se ha utilizado fastapi cómo se pedía pero he añadido un módulo más, al pedir descarga de enlaces opté por hacer web scraping de la web proporcionada y añadir una BBDD nosql como MongoDB para guardar en formato json los resultados.

El backend tiene la siguiente estructura:
1.  Tasks:
    1.  Web scraping para obtener los enlaces
    2.  En función del valor de fecha en los enlaces obtenemos el `data_id` que representa el id.
    3.  Dentro del `data_id` encontramos el campo `data` que contiene una lista de enlaces, en caso de que una fecha tenga más de un valor, y `stats` con el cálulo de la pregunta opcional `3A`
    4.  A mejorar: Añadir ThreadPoolExector para realizar los cálculos de manera asíncrona acelerando el proceso

2.  App:
    1.  Endpoint para obtener todas las fechas disponibles, se obtienen todas las keys de la BBDD y se transforman con formato {`year`: [`month`]}
    2.  Endpoint para obtener los enlaces en función del año y opcionalmente el parámetro mes.
    3.  Endpoint para obtener las estadísticas (Aunque no bien probado)

## Frontend
Se cogió el template de un dashboard y se adaptó, es la parte que más me ha costado puesto que no soy desarrollador de frontend y adaptarlo me ha llevado tiempo, no tiene gran funcionalidad si la BBDD no está cargada, sólo se ha completado el punto 2 de la prueba para listar y descargar los links.

Se ha utilizado React 19, Vite y Tailwindcss4

## Opcional
### 3A
Para completar la parte opcional 3A he implementando un servicio `StatsService` lo que hace es descargar el fichero en stream mediante batches y guardarlo en formato zip, descomprimimos el fichero en un directorio con el mismo nombre del fichero quitando el formato zip y csv, leemos todos los ficheros de tipo CSV dentro del directorio y lo cargamos en un Dataframe, este Dataframe es el de la librería Polars, la he elegido porque parece que tiene mejor gestión de memoria que Pandas, sobre todo está orientado a grandes volúmenes de datos.

1.  Para la cuestión: Top 5 stations with the most starts (showing # of starts)
    1.  Agrupamos por la columna: `start_station_id` y mediante el método len() obtenemos el número de apariciones de cada `start_station_id`, luego lo ordenamos de manera descendiente y nos quedamos con los 5 primeros valores
    2.  Obtenemos los ids en formato lista para buscar los nombres más tarde en el dataframe original
    3.  Por último lo pasamos en formato lista de diccionarios con las estadísticas calculadas.

2.  Para la cuestión: What days of the week are most rides taken on?
    1.  A partir de la columna `started_at` sacamos el día de la semana númerico y el día en formato `string`.
    2.  Agrupamos columnas: `weekday` y `day`
    3.  Calculamos el count mediante la función len()
    4.  Ordenamos de manera descendente
    5.  Obtenemos los 5 primeros registros


# Questions to resolve
## Consider the next scenario: The application has been a success and is being used by many clients, both synchronously through the web platform you developed and asynchronously through an event-driven system. As a result, the API is now starting to receive millions of requests per day.
### How would you ensure the solution scales and the API has a low latency? You don’t need to implement anything related to this.

Cuando sea posible debemos asegurar por lo menos que el servicio sea escalable horizontalmente, en AWS podríamos hacerlo con un balanceador de carga y un auto scaling group.

A nivel interno de la aplicación, podríamos aplicar caché con Redis en las peticiones que tienen poca variabilidad, y sobre todo tener los datos precargados en BBDD, evitando cálculos en tiempo real

### How and what would you monitor if you had to go to production with your solution? You don’t need to implement anything related to this.

En cuanto a monitorización, depende, lo ideal sería usar una aplicación consolidada cómo datadog o Dynatrace, aunque depende del presupuesto, para una opción más asequible podría ser Grafana y Prometheus o herramientas de la nube, por ejemplo Dashboards en Cloudwatch.

## As the application has been a success, now we need to implement an authentication method for accessing the API.
### What authentication method should we use and why? (There is no good answer, just explain any method or framework that you know and mention its benefits and disadvantages: JWT, OAUTH ..etc). You don’t need to implement anything related to this.

JWT podría ser la opción que más se suele utilizar, pero hay que asegurar la caducidad del token generado en caso de producirse brechas de seguridad.

OAUTH permite integración con varios providers, lo que nos da flexibilidad pero dependeríamos de un servicio externo

### Describe the changes needed at the front-end level to be able to authenticate with the API properly. You don’t need to implement anything related to this.

Para asegurar nesitamos implementar una pantalla de login para proporcionar las credenciales, no podemos añadirlo en la web o cómo variables de entorno, lo vería cómo un fallo de seguridad para una web pública, luego las llamadas deberán llevar el header `Authentication`, esto con axios podría implementarios mediante los interceptors, por lo que no habría que añadirlo en cada llamada.


# Pasos para ejecutar el código
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

## Frontend URL
http://127.0.0.1:3000
