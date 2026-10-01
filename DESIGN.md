# Mình, hôm nay

Portfolio là một album cá nhân, không phải bản giới thiệu lộ trình học tập. Giữ tông kem giấy, xanh đêm và đỏ gạch, font Quicksand/Patrick Hand cùng 9 ảnh gốc. Hero đặt ảnh hiện tại cạnh một ảnh trường cũ, chỉ ghi Ngày ấy và Hôm nay.

## Nội dung

Sau bản rút gọn, bổ sung mô tả theo yêu cầu ngày 01/10/2026: phần giới thiệu gồm hai đoạn về công nghệ và cuộc sống thường ngày, mỗi kỷ niệm có một đoạn kể riêng, ba ảnh du lịch có lời mô tả khung cảnh và phần động vật có lời kể đầy đủ hơn. Nội dung vẫn viết ở ngôi thứ nhất, không lặp nhãn hoặc biến trang thành bản lộ trình học tập. Menu còn 4 mục; nút về đầu trang nằm trong footer.

Không thêm tên thật, năm, giải thưởng, nơi làm việc hoặc thông tin liên hệ chưa được cung cấp. Toàn bộ nội dung cá nhân nằm trong profile_data.py. Trường cấp 3 và đại học vẫn có ngữ cảnh trong phần kỷ niệm, không dùng làm định nghĩa của cả trang.

## Icon và hoạt ảnh

Icon SVG cùng viewBox, nét 2.2 và đầu nét bo tròn. Mũi tên uốn cong nối Ngày ấy với Hôm nay, thay cho ký hiệu chữ. Nhãn hỗ trợ đọc màn hình vẫn được giữ dù bớt chữ hiển thị.

Điểm nhấn là hai ảnh được đặt lên trang sổ: ảnh cũ trước, ảnh hiện tại sau, nét nối được vẽ tiếp. Tổng chuỗi 720ms, chạy một lần khi hero xuất hiện. Không còn fade-rise lặp ở mọi section. Đường kỷ niệm tiến theo vị trí cuộn; album có chuyển ảnh có hướng 220ms và thao tác vuốt; dấu chân phản hồi ngắn khi hover/focus ảnh động vật.

Không thêm thư viện hoặc vòng animation chạy vô hạn. requestAnimationFrame chỉ gom sự kiện cuộn/resize; hiệu ứng finite được hủy khi tab ẩn hoặc bật reduced-motion. Mặc định nội dung và ảnh luôn hiển thị. Bản không JavaScript vẫn có menu và đọc được toàn bộ album.

## Ghé chơi trong album

Thêm lớp tương tác tự nguyện từ đầu tới cuối: đóng dấu lên ảnh hiện tại, xếp bốn dấu mốc theo thứ tự bài viết, ghép ba cặp ảnh chuyến đi và theo sáu bước chân. Ba trò dùng details native, mặc định thu gọn để ảnh và lời kể vẫn dẫn đường. Sổ ghé chơi ở cuối giữ bốn dấu hoàn thành trong lần xem hiện tại; không dùng cookie, storage, API, âm thanh hoặc giới hạn thời gian. Chơi lại một trò giữ dấu đã đạt; Chơi lại cả chuyến xóa toàn bộ tiến độ.

Motion mang chất giấy và mực: dấu được đặt lên ảnh, ảnh mở theo nét cắt ngang, dấu chân phản hồi khi chạm, lời cảm ơn hiện khi đủ bốn dấu. Không có confetti toàn màn hình, cursor giả hoặc motion loop. Hiệu ứng hữu hạn, hủy khi tab ẩn hoặc bật reduced-motion; reduced-motion vẫn có màu, dấu và lời phản hồi tĩnh. Timer 850ms chỉ dùng để úp lại hai ảnh ghép sai, được xóa khi chơi lại, đóng trò hoặc tab ẩn.

Tách giao diện trò trong templates/_play.html, style trong static/css/play.css, state và controller trong static/js/play.js. Logic trò được test bằng Node built-in, không thêm package. Nếu JavaScript không khởi tạo được, toàn bộ vùng trò vẫn hidden; năm phần nội dung và menu không JavaScript tiếp tục đọc được.

## Layout

Khung tối đa 1160px. Menu mobile tại 820px, bố cục một cột tại 580px, điều chỉnh nhỏ tại 360px. Ảnh trường/STEM/đồ án dùng contain; ảnh cá nhân và du lịch có nút xem bản gốc. Tiêu đề không vượt 6rem, tracking không thấp hơn -0.035em.

Phần Chuyến đi dùng ba cột bằng nhau, ảnh vuông cùng kích thước; tiêu đề và đoạn mô tả bắt đầu trên cùng hàng. Không có ảnh chính lớn hoặc modifier wide. Tablet giữ ba cột gọn; từ 680px trở xuống xếp một cột theo thứ tự ảnh, tiêu đề, lời kể để tránh ép nội dung vào cột quá hẹp. Khung vuông chỉ là cách hiển thị CSS, album vẫn mở ảnh gốc đầy đủ.

## Tham khảo local

Đọc mã hiện tại ở D:/Code/UI-UX, không sửa các dự án đó và không sao chép ảnh, font hoặc cả thư mục sang đây:

- Wind-404/js/wind.js: nguyên tắc nét SVG vẽ theo độ dài và dừng hoạt ảnh khi tab ẩn. Áp dụng vào nét nối hai ảnh và quản lý motion.
- Sneaker-Wheel/js/wheel.js: ngưỡng vuốt, phân biệt trục ngang/dọc và chuyển trạng thái có hướng. Áp dụng cho album ảnh.
- Meow-Login/js/paw.js: phản hồi dấu chân với pointer/focus. Viết phiên bản SVG ngắn, hữu hạn cho phần động vật, không lấy ảnh mèo hoặc controller của dự án gốc.

Các ảnh và nội dung gốc của dự án vẫn riêng tư; publication chỉ bao gồm GioiThieuBanThan.
