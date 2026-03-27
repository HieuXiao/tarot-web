# Mystic Draw - Tarot Web App

Mystic Draw là ứng dụng bói bài Tarot chạy trên web, cho phép xáo bộ bài, rút 1/2/3 lá, xem ý nghĩa xuôi/ngược và lời khuyên cho từng lá.

## Tác dụng

- Mô phỏng trải bài Tarot trực quan trên giao diện web.
- Hỗ trợ rút bài ngẫu nhiên và xem diễn giải theo từng lá.
- Cung cấp API backend để frontend lấy dữ liệu deck/meaning.
- Có Swagger UI để test API nhanh trong quá trình phát triển.

## Tech Stack

- Frontend: React 19, TypeScript, Vite
- Styling: CSS thuần
- Backend: Node.js, Express
- API docs: Swagger (swagger-jsdoc + swagger-ui-express)
- Tooling: ESLint, TypeScript, concurrently

## Cách chạy dự án

### 1) Cài dependencies

```bash
npm install
```

### 2) Chạy cả frontend và backend cùng lúc

```bash
npm run dev:full
```

Sau khi chạy thành công:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3002
- Swagger UI: http://localhost:3002/api-docs

### 3) Chạy riêng từng phần (tuỳ chọn)

Chạy frontend:

```bash
npm run dev
```

Chạy backend:

```bash
npm run server
```

## Scripts chính

| Script | Mô tả |
| :--- | :--- |
| `npm run dev` | Chạy frontend bằng Vite (HMR). |
| `npm run server` | Chạy backend Express tại cổng 3002. |
| `npm run dev:full` | Chạy đồng thời frontend + backend. |
| `npm run build` | Build production ra thư mục `dist/`. |
| `npm run preview` | Preview bản build production. |
| `npm run lint` | Kiểm tra lint toàn bộ dự án. |

## API chính

- `GET /ping`: Health check
- `GET /api/shuffle`: Trả về bộ bài đã xáo
- `GET /api/draw?imgSrc=...`: Trả về ý nghĩa một lá (hoặc random nếu không truyền `imgSrc`)
- `GET /api/draw/two`: Rút ngẫu nhiên 2 lá
- `GET /api/draw/three`: Rút ngẫu nhiên 3 lá

## Cấu trúc thư mục ngắn gọn

- `src/`: mã nguồn frontend React + TypeScript
- `src/components/`: UI components (Deck, Card, Modal, ...)
- `src/api/`: hàm gọi API backend
- `src/constants/`: dữ liệu Tarot và constants
- `server/`: Express server và dữ liệu Tarot phía backend
- `public/`: assets tĩnh (ảnh lá bài, favicon, ...)