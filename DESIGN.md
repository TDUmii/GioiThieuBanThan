# Mình, hôm nay

Portfolio là một album cá nhân, không phải bản giới thiệu lộ trình học tập. Giữ tông kem giấy, xanh đêm và đỏ gạch, font Quicksand/Patrick Hand cùng 9 ảnh gốc. Hero đặt ảnh hiện tại cạnh một ảnh trường cũ, chỉ ghi Ngày ấy và Hôm nay.

## Nội dung

Sau bản rút gọn, bổ sung mô tả theo yêu cầu ngày 01/10/2026: phần giới thiệu gồm hai đoạn về công nghệ và cuộc sống thường ngày, mỗi kỷ niệm có một đoạn kể riêng, ba ảnh du lịch có lời mô tả khung cảnh và phần động vật có lời kể đầy đủ hơn. Nội dung vẫn viết ở ngôi thứ nhất, không lặp nhãn hoặc biến trang thành bản lộ trình học tập. Menu còn 4 mục; nút về đầu trang nằm trong footer.

Không thêm tên thật, năm, giải thưởng, nơi làm việc hoặc thông tin liên hệ chưa được cung cấp. Toàn bộ nội dung cá nhân nằm trong profile_data.py. Trường cấp 3 và đại học vẫn có ngữ cảnh trong phần kỷ niệm, không dùng làm định nghĩa của cả trang.

## Icon và hoạt ảnh

Icon SVG cùng viewBox, nét 2.2 và đầu nét bo tròn. Mũi tên uốn cong nối Ngày ấy với Hôm nay, thay cho ký hiệu chữ. Nhãn hỗ trợ đọc màn hình vẫn được giữ dù bớt chữ hiển thị.

Điểm nhấn là hai ảnh được đặt lên trang sổ: ảnh cũ trước, ảnh hiện tại sau, nét nối được vẽ tiếp. Tổng chuỗi 720ms, chạy một lần khi hero xuất hiện. Không còn fade-rise lặp ở mọi section. Đường kỷ niệm tiến theo vị trí cuộn; album có chuyển ảnh có hướng 220ms và thao tác vuốt. Icon dấu chân chỉ là trang trí tĩnh.

Không thêm thư viện hoặc vòng animation chạy vô hạn. requestAnimationFrame chỉ gom sự kiện cuộn/resize; hiệu ứng finite được hủy khi tab ẩn hoặc bật reduced-motion. Mặc định nội dung và ảnh luôn hiển thị. Bản không JavaScript vẫn có menu và đọc được toàn bộ album.

## Phạm vi tương tác

Theo yêu cầu ngày 01/10/2026, gỡ toàn bộ sự kiện mèo: mèo ở góc, âm thanh, nút loa, tay mèo trên ảnh và phản hồi dấu chân khi hover/focus. Xóa mã, style và tài nguyên riêng của các hiệu ứng này. Không khôi phục các trò có luật hoặc điểm. Giữ nguyên nội dung, ảnh gốc, bố cục, icon tĩnh, menu, album và hoạt ảnh không liên quan.

## Layout

Khung tối đa 1160px. Menu mobile tại 820px, bố cục một cột tại 580px, điều chỉnh nhỏ tại 360px. Ảnh trường/STEM/đồ án dùng contain; ảnh cá nhân và du lịch có nút xem bản gốc. Tiêu đề không vượt 6rem, tracking không thấp hơn -0.035em.

Phần Chuyến đi dùng ba cột bằng nhau, ảnh vuông cùng kích thước; tiêu đề và đoạn mô tả bắt đầu trên cùng hàng. Không có ảnh chính lớn hoặc modifier wide. Tablet giữ ba cột gọn; từ 680px trở xuống xếp một cột theo thứ tự ảnh, tiêu đề, lời kể để tránh ép nội dung vào cột quá hẹp. Khung vuông chỉ là cách hiển thị CSS, album vẫn mở ảnh gốc đầy đủ.

## Nguyên tắc tương tác

Các tương tác dùng những nguyên tắc sau:

- Nét SVG được vẽ theo độ dài và hoạt ảnh dừng khi tab ẩn. Áp dụng vào nét nối hai ảnh và quản lý motion.
- Thao tác vuốt có ngưỡng kích hoạt, phân biệt trục ngang/dọc và chuyển trạng thái có hướng. Áp dụng cho album ảnh.

Phạm vi mã nguồn và tài liệu chỉ bao gồm các file của dự án.
