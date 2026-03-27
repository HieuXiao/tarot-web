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

### 2) Khởi động Redis (bắt buộc)

Tạo Redis container (chạy lần đầu):

```bash
docker run -d --name tarot-redis -p 6379:6379 redis:7-alpine
```

Nếu đã có container thì chỉ cần start lại:

```bash
docker start tarot-redis
```

### 3) Chạy backend

```bash
npm run server
```

### 4) Chạy frontend (terminal khác)

```bash
npm run dev
```

### 5) Hoặc chạy frontend + backend cùng lúc (sau khi Redis đã chạy)

```bash
npm run dev:full
```

Sau khi chạy thành công:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3002
- Swagger UI: http://localhost:3002/api-docs

### Lệnh kiểm tra nhanh khi lỗi kết nối

Kiểm tra Redis có đang chạy:

```bash
docker ps --filter name=tarot-redis
```

Kiểm tra Redis trả lời trong container:

```bash
docker exec tarot-redis redis-cli ping
```

Kiểm tra cổng backend 3002 có mở không (PowerShell):

```powershell
Test-NetConnection -ComputerName localhost -Port 3002
```

Kiểm tra cổng Redis 6379 có mở không (PowerShell):

```powershell
Test-NetConnection -ComputerName localhost -Port 6379
```

Stop Redis container khi không dùng:

```bash
docker stop tarot-redis
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
- `GET /api/current-state`: Lấy trạng thái bộ bài đang dở theo session hiện tại
- `GET /api/draw?imgSrc=...`: Trả về ý nghĩa một lá (hoặc random nếu không truyền `imgSrc`)
- `GET /api/draw/two`: Rút ngẫu nhiên 2 lá
- `GET /api/draw/three`: Rút ngẫu nhiên 3 lá

## Session và Deploy

Phiên bản hiện tại đã dùng session cookie để giữ trạng thái trải bài cho từng người dùng.

- Backend lưu deck theo session id.
- Session được lưu trên Redis (không dùng MemoryStore).
- Frontend gửi cookie bằng `credentials: 'include'` trong tất cả request API.
- Khi F5, frontend gọi `GET /api/current-state` để khôi phục phiên đang dở.

### Biến môi trường cần cấu hình

Backend:

- `FRONTEND_ORIGIN`: domain frontend được phép gọi API. Ví dụ: `https://your-frontend-domain.com`
- `SESSION_SECRET`: secret dùng để ký session cookie
- `REDIS_URL`: địa chỉ Redis dùng để lưu session. Ví dụ: `redis://127.0.0.1:6379`
- `SESSION_PREFIX`: tiền tố key session trong Redis (mặc định: `mystic:`)
- `CROSS_SITE_COOKIE`: đặt `true` nếu frontend và backend khác site/domain (cookie `SameSite=None; Secure`)

Frontend (Vite):

- `VITE_API_BASE_URL`: base URL API cho production. Ví dụ: `https://your-backend-domain.com/api`

Lưu ý production:

- Cần đảm bảo Redis luôn sẵn sàng; nếu Redis down thì backend sẽ không khởi động (fail fast để tránh mất session ngầm).

## Cấu trúc thư mục ngắn gọn

- `src/`: mã nguồn frontend React + TypeScript
- `src/components/`: UI components (Deck, Card, Modal, ...)
- `src/api/`: hàm gọi API backend
- `src/constants/`: dữ liệu Tarot và constants
- `server/`: Express server và dữ liệu Tarot phía backend
- `public/`: assets tĩnh (ảnh lá bài, favicon, ...)