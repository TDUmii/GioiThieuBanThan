# Mình, hôm nay

Portfolio là một album cá nhân, không phải bản giới thiệu lộ trình học tập. Giữ tông kem giấy, xanh đêm và đỏ gạch, font Quicksand/Patrick Hand cùng 9 ảnh gốc. Hero đặt ảnh hiện tại cạnh một ảnh trường cũ, chỉ ghi Ngày ấy và Hôm nay.

## Nội dung

Sau bản rút gọn, bổ sung mô tả theo yêu cầu ngày 01/10/2026: phần giới thiệu gồm hai đoạn về công nghệ và cuộc sống thường ngày, mỗi kỷ niệm có một đoạn kể riêng, ba ảnh du lịch có lời mô tả khung cảnh và phần động vật có lời kể đầy đủ hơn. Nội dung vẫn viết ở ngôi thứ nhất, không lặp nhãn hoặc biến trang thành bản lộ trình học tập. Menu còn 4 mục; nút về đầu trang nằm trong footer.

Không thêm tên thật, năm, giải thưởng, nơi làm việc hoặc thông tin liên hệ chưa được cung cấp. Toàn bộ nội dung cá nhân nằm trong profile_data.py. Trường cấp 3 và đại học vẫn có ngữ cảnh trong phần kỷ niệm, không dùng làm định nghĩa của cả trang.

## Icon và hoạt ảnh

Icon SVG cùng viewBox, nét 2.2 và đầu nét bo tròn. Mũi tên uốn cong nối Ngày ấy với Hôm nay, thay cho ký hiệu chữ. Nhãn hỗ trợ đọc màn hình vẫn được giữ dù bớt chữ hiển thị.

Điểm nhấn là hai ảnh được đặt lên trang sổ: ảnh cũ trước, ảnh hiện tại sau, nét nối được vẽ tiếp. Tổng chuỗi 720ms, chạy một lần khi hero xuất hiện. Không còn fade-rise lặp ở mọi section. Đường kỷ niệm tiến theo vị trí cuộn; album có chuyển ảnh có hướng 220ms và thao tác vuốt; dấu chân phản hồi ngắn khi hover/focus ảnh động vật.

Không thêm thư viện hoặc vòng animation chạy vô hạn. requestAnimationFrame chỉ gom sự kiện cuộn/resize; hiệu ứng finite được hủy khi tab ẩn hoặc bật reduced-motion. Mặc định nội dung và ảnh luôn hiển thị. Bản không JavaScript vẫn có menu và đọc được toàn bộ album.

## Easter egg, không phải trò có luật

Thay các trò và sổ điểm bằng những bất ngờ nhỏ, đúng yêu cầu ngày 01/10/2026: người xem có cảm giác một chú mèo đang tò mò cùng mình lật album. Nội dung cá nhân, không phải thao tác chơi, vẫn là trọng tâm. Không thêm lời mời dài hoặc hướng dẫn có luật.

Điểm nhấn là bàn chân mèo có cổ tay giấu sau mép ảnh, vươn ra, chạm mặt ảnh rồi tự rút trong 1100ms. Chỉ chạy khi pointer/focus khám phá ảnh, không tự chạy theo cuộn và không bám liên tục theo chuột. Hai lớp ảnh raster alpha, z-index và clip giúp ngón chân đi qua phía trước trong khi phần cổ tay ở phía sau. Mỗi ảnh có cooldown 1800ms; chỉ một bàn tay hoạt động một lúc, không chiếm click hoặc thay con trỏ.

Mèo ở góc trang trên desktop rộng, bên cạnh CTA hero trên màn hình nhỏ để không che lời kể. Mèo yên khi không tương tác, bấm mới đổi khung mở miệng và phát tiếng thật. Không âm thanh khi hover, không chồng nhiều tiếng; có nút tắt tiếng và trạng thái đọc màn hình. Biểu cảm hữu hạn, dừng khi tab ẩn hoặc mở album. Reduced-motion không nhún mèo, tay chỉ hiện/ẩn 450ms ở vị trí tĩnh. Không thêm dependency, storage hoặc vòng lặp animation.

Tách style và controller trong static/css/easter-eggs.css và static/js/easter-eggs.js. Tái sử dụng chọn lọc ba ảnh alpha của Meow-Login và tiếng meo CC0 đã có trong dự án đó, kèm nguồn và giấy phép ở static/eggs/ATTRIBUTION.md. Không tạo tranh mèo bằng CSS/SVG và không cần tạo ảnh mới.

## Layout

Khung tối đa 1160px. Menu mobile tại 820px, bố cục một cột tại 580px, điều chỉnh nhỏ tại 360px. Ảnh trường/STEM/đồ án dùng contain; ảnh cá nhân và du lịch có nút xem bản gốc. Tiêu đề không vượt 6rem, tracking không thấp hơn -0.035em.

Phần Chuyến đi dùng ba cột bằng nhau, ảnh vuông cùng kích thước; tiêu đề và đoạn mô tả bắt đầu trên cùng hàng. Không có ảnh chính lớn hoặc modifier wide. Tablet giữ ba cột gọn; từ 680px trở xuống xếp một cột theo thứ tự ảnh, tiêu đề, lời kể để tránh ép nội dung vào cột quá hẹp. Khung vuông chỉ là cách hiển thị CSS, album vẫn mở ảnh gốc đầy đủ.

## Tham khảo local

Đọc mã hiện tại ở D:/Code/UI-UX, không sửa các dự án đó hoặc sao chép cả thư mục sang đây:

- Wind-404/js/wind.js: nguyên tắc nét SVG vẽ theo độ dài và dừng hoạt ảnh khi tab ẩn. Áp dụng vào nét nối hai ảnh và quản lý motion.
- Sneaker-Wheel/js/wheel.js: ngưỡng vuốt, phân biệt trục ngang/dọc và chuyển trạng thái có hướng. Áp dụng cho album ảnh.
- Meow-Login/js/paw.js và assets/cats, assets/interactive, assets/audio: ý tưởng tay mèo vươn từ phía sau, các khung mèo tam thể, bàn chân alpha và tiếng meo. Viết controller hữu hạn riêng cho album, không sao chép controller gốc. Chỉ các file tài nguyên thực sự dùng được đưa vào static/eggs kèm attribution và giấy phép.

Các ảnh và nội dung gốc của dự án vẫn riêng tư; publication chỉ bao gồm GioiThieuBanThan.
