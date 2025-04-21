# 1. Frontend build
FROM node:20-slim AS frontend
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
COPY ../backend/shared ../backend/shared
RUN npm run build


# 2. Backend build
FROM node:20-slim AS backend-builder
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install

COPY backend/ ./
RUN npm run build


# 3. Final runtime image
FROM node:20-slim
WORKDIR /app

# Устанавливаем только runtime-зависимости
COPY backend/package*.json ./backend/
RUN npm install --omit=dev --prefix ./backend

# Копируем собранные артефакты
COPY --from=backend-builder /app/backend/dist /app/backend/dist
COPY --from=frontend /app/frontend/dist /app/backend/public

WORKDIR /app/backend
EXPOSE 3000

CMD ["node", "dist/src/main"]
