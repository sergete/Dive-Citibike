# Usa la imagen mínima de Python
FROM python:3.12-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema necesarias para Chromium
RUN apt-get update && apt-get install -y \
    chromium \
	chromium-driver \
    && rm -rf /var/lib/apt/lists/*

# Instalar uv (gestor de paquetes Python)
RUN pip install uv

# Copiar los archivos de dependencias y el código fuente
COPY . .

# Instalar dependencias con uv
RUN uv pip compile pyproject.toml -o requirements.txt
RUN pip install -r requirements.txt

# Establecer el path de Chromium y ChromeDriver
ENV PYTHONUNBUFFERED=1
ENV CHROME_BIN=/usr/bin/chromium
ENV CHROMEDRIVER_BIN=/usr/bin/chromium-driver

# Comando para mantener el contenedor activo
ENTRYPOINT ["python", "scraper.py", "&&", "tail", "-f", "/dev/null"]
