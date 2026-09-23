FROM node:22-slim

WORKDIR /app

COPY package.json ./

# La caché de npm se conserva entre intentos: si la red se corta,
# el siguiente intento no vuelve a descargar lo que ya bajó
RUN --mount=type=cache,target=/root/.npm \
    npm install --no-audit --no-fund \
    --fetch-retries=5 \
    --fetch-retry-mintimeout=20000 \
    --fetch-retry-maxtimeout=120000 \
    --fetch-timeout=600000

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]