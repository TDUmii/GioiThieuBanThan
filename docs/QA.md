# Kiểm tra nội dung và giao diện

## Bổ sung mô tả ngày 01/10/2026

- Giới thiệu gồm hai đoạn về công nghệ và cuộc sống thường ngày. Bốn dấu mốc đều có lời kể mở rộng; ba ảnh du lịch có đoạn mô tả riêng; phần động vật được viết đầy đủ hơn.
- Giữ tiêu đề, màu sắc, 9 ảnh gốc, icon và hoạt ảnh của bản trước. Không thêm tên, năm học, giải thưởng, địa điểm du lịch hoặc thông tin liên hệ chưa được cung cấp.
- Đọc và kiểm tra hiển thị desktop 1440x900, mobile 390x844. Các đoạn văn không bị cắt; khoảng cách giữa hai đoạn giới thiệu được tách rõ.
- Đo viewport 320, 390, 768, 1024, 1440px: scrollWidth bằng clientWidth, không có đoạn văn, tiêu đề hoặc dd tràn ngang. Đây là viewport mô phỏng, không phải thử trên điện thoại vật lý.
- Menu mobile vẫn mở và đóng khi chọn Về mình. Console không có warning/error trong lượt kiểm tra.
- 7/7 nhóm unittest PASS, bao gồm kiểm tra mô tả mở rộng được render đúng và HTML escaping của các trường mới. git diff --check PASS.
- Cập nhật ảnh xem trước desktop, dấu mốc, mobile và thêm [phần giới thiệu](preview-about.png). Browser được trả về viewport bình thường sau kiểm tra.

## Bản rút gọn và hoạt ảnh ngày 30/09/2026

Ngày kiểm tra: 30/09/2026. Flask local tại 127.0.0.1:5059, debug tắt. Một vòng kiểm tra gộp desktop/mobile, sửa caption ảnh và pha chờ animation trong một batch, rồi xác nhận lại.

## Nội dung và ảnh

- Nội dung main từ khoảng 757 xuống 254 từ theo cách đếm khoảng trắng trong HTML đã render.
- Mở đầu là Mình, hôm nay; ảnh hiện tại đi cùng ảnh trường cũ. Không dùng lộ trình THPT tới đại học làm lời giới thiệu chính.
- Ngày ấy và Hôm nay nối bằng icon SVG; không còn ký hiệu mũi tên chữ trong HTML.
- 9 nút album, đủ 9 ảnh gốc. Cả 9 file tải thành công, naturalWidth lớn hơn 0.
- Caption Hôm nay nằm ngoài vùng ảnh cũ ở viewport 320, 390 và 1440px sau sửa.
- Các ảnh gốc trong img không bị chỉnh sửa. Không lấy ảnh hoặc file ngoài dự án để publication.

## Giao diện và thao tác

- Viewport 320x800, 390x844, 768x1024, 1024x768, 1440x900: không tràn ngang; heading, đoạn văn, dd và figure không vượt vùng nội dung.
- Chuyển động hero được quan sát qua opacity/transform ở hai thời điểm, sau đó trả về opacity 1 và góc xoay tĩnh của ảnh.
- Đường kỷ niệm thay đổi scaleY theo vị trí cuộn; chapter-01 được đánh dấu current ở đầu phần Nhìn lại.
- Dấu chân phản hồi khi focus ảnh động vật, có thay đổi opacity và transform. Hiệu ứng hữu hạn, không chạy loop.
- Drag ngang trong album ở viewport 390px: ảnh 1 chuyển sang ảnh 2. Phím mũi tên chuyển ngược và vòng từ 1 về 9.
- Tab ở nút cuối quay về nút đóng, Shift+Tab đi ngược; Escape đóng và trả focus về ảnh vừa mở. Overflow body được khôi phục.
- Menu mobile mở/đóng bằng Escape, trả focus về nút menu; chọn liên kết đóng menu.
- Tắt JavaScript và reload: 5 tiêu đề phần có display block, opacity 1; menu là grid, header static và không tràn ngang.
- Reduced-motion dùng scroll-behavior auto; nội dung không phụ thuộc hoạt ảnh để hiển thị. Mã JS có đường hủy các animation đang chạy khi preference đổi hoặc tab ẩn.
- Console không có warning/error trong lượt test.
- Các màu chữ chính được kiểm tra từ computed styles: chữ phụ trên giấy, chữ đỏ gạch trên giấy và chữ phụ trên nền xanh đêm đều có contrast trên 4.5:1. Không thay thế cho audit WCAG đầy đủ.
- Font Quicksand 500/700 và Patrick Hand có đủ glyph cho nội dung tiếng Việt mới.

## Tự động và giới hạn

6/6 nhóm unittest PASS trong .venv: render, assets, 404/traversal, escaping, cặp quá khứ/hiện tại với SVG và các đích điều hướng/9 nút album. node --check và git diff --check PASS.

Kiểm tra bằng trình duyệt in-app trên desktop và viewport mô phỏng; drag ngang dùng input trình duyệt, chưa xác nhận trên điện thoại vật lý hoặc Safari/Firefox. Cơ chế pause của tab ẩn được kiểm tra qua mã, không khẳng định đo FPS trên thiết bị yếu. Preview cuối được trả về viewport bình thường, JavaScript bật và không giữ giả lập reduced-motion.

Tham khảo local được ghi trong DESIGN.md. Không sửa hoặc publication bất kỳ file nào trong D:/Code/UI-UX.

Ảnh xem trước: [desktop](preview-desktop.png), [nhìn lại](preview-journey.png), [mobile](preview-mobile.png).
