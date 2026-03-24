# 🔮 Mystic Draw - Ứng dụng Bói bài Tarot (React + TypeScript)

Đây là phiên bản hiện đại hóa của ứng dụng bói bài Tarot, đã được chuyển đổi từ vanilla JavaScript sang React. Tài liệu này hướng dẫn cách thiết lập và làm việc với cấu trúc dự án mới.

## 🛠️ Hướng dẫn Nhanh

Để chạy ứng dụng trên máy local, hãy làm theo các bước sau:

1.  **Cài đặt các gói phụ thuộc (Dependencies)**:
    ```bash
    npm install
    ```

2.  **Chạy máy chủ phát triển (Development Server)**:
    ```bash
    npm run dev
    ```

3.  **Mở ứng dụng**:
    Truy cập địa chỉ [http://localhost:5173](http://localhost:5173) trên trình duyệt của bạn.

## 💻 Các Lệnh Phát triển

| Lệnh | Hành động |
| :--- | :--- |
| `npm run dev` | Khởi chạy máy chủ phát triển Vite với tính năng cập nhật nhanh (HMR). |
| `npm run build` | Xây dựng phiên bản sản xuất trong thư mục `/dist`. |
| `npm run preview` | Xem trước bản build sản xuất trên máy local. |
| `npm run lint` | Chạy ESLint để kiểm tra chất lượng code và lỗi TypeScript. |

## 📂 Cấu trúc Phân mục Dự án

- **`src/App.tsx`**: Logic chính của ứng dụng và quản lý trạng thái (state).
- **`src/components/`**: Chứa toàn bộ các thành phần giao diện (Deck, Card, Modal, v.v.).
- **`src/constants/tarotData.ts`**: Tệp dữ liệu trung tâm chứa thông tin của 78 lá bài và ý nghĩa của chúng.
- **`src/hooks/useSound.ts`**: Hook tùy chỉnh để quản lý âm thanh phản hồi.
- **`src/types.ts`**: Định nghĩa các Interface và Type cho dữ liệu bài Tarot.
- **`public/`**: Chứa các tài nguyên tĩnh như hình ảnh lá bài (`/Cards`) và tệp âm thanh.

## 🎨 Tùy chỉnh Ứng dụng

- **Ý nghĩa & Lời khuyên**: Chỉnh sửa tệp `src/constants/tarotData.ts` để thay đổi mô tả hoặc lời khuyên của các lá bài.
- **Giao diện (Styles)**: Chỉnh sửa `src/index.css` cho các kiểu style toàn cục hoặc thêm CSS modules cho từng component cụ thể.
- **Tài nguyên (Assets)**: Thêm hình ảnh hoặc âm thanh mới vào thư mục `public/` và cập nhật các hằng số tương ứng trong code.

