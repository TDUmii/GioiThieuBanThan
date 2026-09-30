# Mình, hôm nay

Portfolio là một album cá nhân, không phải bản giới thiệu lộ trình học tập. Giữ tông kem giấy, xanh đêm và đỏ gạch, font Quicksand/Patrick Hand cùng 9 ảnh gốc. Hero đặt ảnh hiện tại cạnh một ảnh trường cũ, chỉ ghi Ngày ấy và Hôm nay.

## Nội dung

Rút phần main từ khoảng 757 xuống 254 từ theo cách đếm khoảng trắng trong HTML đã render. Giữ chuyên ngành, nơi học, 4 kỷ niệm, 3 ảnh du lịch và ảnh chơi cùng động vật. Bỏ tagline, nhãn sở thích lặp lại lời mở đầu, các đoạn triết lý chung, chip/tựa phụ trùng nhau, điều hướng chương và đoạn kết không có thông tin mới. Menu còn 4 mục; nút về đầu trang nằm trong footer.

Không thêm tên thật, năm, giải thưởng, nơi làm việc hoặc thông tin liên hệ chưa được cung cấp. Toàn bộ nội dung cá nhân nằm trong profile_data.py. Trường cấp 3 và đại học vẫn có ngữ cảnh trong phần kỷ niệm, không dùng làm định nghĩa của cả trang.

## Icon và hoạt ảnh

Icon SVG cùng viewBox, nét 2.2 và đầu nét bo tròn. Mũi tên uốn cong nối Ngày ấy với Hôm nay, thay cho ký hiệu chữ. Nhãn hỗ trợ đọc màn hình vẫn được giữ dù bớt chữ hiển thị.

Điểm nhấn là hai ảnh được đặt lên trang sổ: ảnh cũ trước, ảnh hiện tại sau, nét nối được vẽ tiếp. Tổng chuỗi 720ms, chạy một lần khi hero xuất hiện. Không còn fade-rise lặp ở mọi section. Đường kỷ niệm tiến theo vị trí cuộn; album có chuyển ảnh có hướng 220ms và thao tác vuốt; dấu chân phản hồi ngắn khi hover/focus ảnh động vật.

Không thêm thư viện hoặc vòng animation chạy vô hạn. requestAnimationFrame chỉ gom sự kiện cuộn/resize; hiệu ứng finite được hủy khi tab ẩn hoặc bật reduced-motion. Mặc định nội dung và ảnh luôn hiển thị. Bản không JavaScript vẫn có menu và đọc được toàn bộ album.

## Layout

Khung tối đa 1160px. Menu mobile tại 820px, bố cục một cột tại 580px, điều chỉnh nhỏ tại 360px. Ảnh trường/STEM/đồ án dùng contain; ảnh cá nhân và du lịch có nút xem bản gốc. Tiêu đề không vượt 6rem, tracking không thấp hơn -0.035em.

## Tham khảo local

Đọc mã hiện tại ở D:/Code/UI-UX, không sửa các dự án đó và không sao chép ảnh, font hoặc cả thư mục sang đây:

- Wind-404/js/wind.js: nguyên tắc nét SVG vẽ theo độ dài và dừng hoạt ảnh khi tab ẩn. Áp dụng vào nét nối hai ảnh và quản lý motion.
- Sneaker-Wheel/js/wheel.js: ngưỡng vuốt, phân biệt trục ngang/dọc và chuyển trạng thái có hướng. Áp dụng cho album ảnh.
- Meow-Login/js/paw.js: phản hồi dấu chân với pointer/focus. Viết phiên bản SVG ngắn, hữu hạn cho phần động vật, không lấy ảnh mèo hoặc controller của dự án gốc.

Các ảnh và nội dung gốc của dự án vẫn riêng tư; publication chỉ bao gồm GioiThieuBanThan.
