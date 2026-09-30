# Kiểm tra bản nâng cấp portfolio

Ngày kiểm tra: 30/09/2026. Ứng dụng được chạy bằng `run.cmd`, Flask tại `http://127.0.0.1:5059/`, debug tắt. Sol 6.1 (`gpt-6.1-sol`) hỗ trợ phần tương tác và kiểm thử; các kết quả trình duyệt dưới đây được kiểm tra lại sau khi tích hợp template và CSS.

## Kiểm tra tự động

- 4/4 nhóm unittest PASS trong môi trường `.venv` của dự án.
- Trang chủ render đủ 9 ảnh gốc.
- Route ảnh, CSS, JS, favicon và 3 font trả về nội dung đúng file local.
- File không tồn tại và các đường dẫn traversal thường/encoded trả về 404.
- Nội dung và thuộc tính HTML được escape.
- `node --check static/js/main.js` PASS; `git diff --check` không có lỗi khoảng trắng.

## Kiểm tra trình duyệt sau tích hợp

- Viewport 320x800, 390x844, 768x1024, 1024x768 và 1440x900: không tràn ngang; các heading, đoạn văn và khung ảnh không vượt vùng nội dung.
- Ảnh hero hiển thị rõ người, không bị kéo giãn theo kích thước gốc. Ảnh timeline dùng khung contain để giữ nội dung ảnh trường, STEM, học viện và bảo vệ đồ án.
- Menu mobile: mở, đóng bằng Escape, trả focus về nút menu; chọn Chuyến đi/Góc dịu dàng đóng menu và cập nhật mục đang đọc.
- Album: mở ảnh từ trang, tải thành công cả 9 file, chuyển bằng nút và phím mũi tên; vòng từ 9 về 1 và từ 1 về 9.
- Tab từ nút cuối về nút đóng; Shift+Tab từ nút đóng về nút cuối. Focus nằm trong dialog.
- Đóng bằng nút và Escape: khôi phục overflow và focus về ảnh đã mở.
- Chế độ giảm chuyển động: CSS scroll-behavior là auto và không cần hiệu ứng để đọc nội dung.
- Tắt JavaScript và reload: cả 6 tiêu đề phần có display block, opacity 1; nội dung không bị giấu bởi lớp reveal.
- Các ảnh trong main đều có thuộc tính alt; không có ảnh với src trống. Các URL ảnh, script và stylesheet trong DOM cùng origin localhost.
- Console không có warning/error trong lượt kiểm tra.
- Patrick Hand có đủ glyph tiếng Việt trong template và nội dung profile. Font và giấy phép nằm trong dự án.

## Giới hạn và trạng thái bàn giao

Kiểm tra bằng trình duyệt in-app trên desktop, với các kích thước viewport mô phỏng. Chưa kiểm tra trên thiết bị vật lý hoặc Safari/Firefox. Đây không phải chứng nhận accessibility hoặc pentest. Bộ dò giao diện dùng chế độ regex dự phòng do thiếu thư viện parser; cảnh báo ảnh lightbox không có src đã được sửa bằng một ảnh khởi tạo hợp lệ.

Sau kiểm tra, JavaScript được bật lại, giả lập giảm chuyển động và viewport được gỡ. Tab preview được giữ mở để xem. Các ảnh cá nhân gốc không bị chỉnh sửa. Hai file font Caveat thử nghiệm của lượt này được thay bằng Patrick Hand và không đưa vào commit.

Ảnh xem trước: [desktop](preview-desktop.png), [timeline](preview-journey.png), [mobile](preview-mobile.png).
