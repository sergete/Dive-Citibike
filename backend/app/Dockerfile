# Usa Python 3.12 slim para minimizar la imagen
FROM python:3.12-slim

#ENV MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD}
#ENV MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME}
#ENV MONGO_EXPRESS_USERNAME=${MONGO_EXPRESS_USERNAME}
#ENV MONGO_EXPRESS_PASSWORD=${MONGO_EXPRESS_PASSWORD}
#ENV MONGO_URI=${MONGO_URI}
#ENV MONGO_DB_NAME=${MONGO_DB_NAME}
#ENV MONGO_COLLECTION_NAME=${MONGO_COLLECTION_NAME}

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar uv (gestor de paquetes Python)
RUN pip install uv

# Copiar el archivo de dependencias y el código fuente
COPY . .

# Instalar dependencias con uv
RUN uv pip compile pyproject.toml -o requirements.txt
RUN pip install -r requirements.txt

ENV PYTHONUNBUFFERED=1

# Comando para ejecutar la aplicación con Uvicorn
ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8081"]
