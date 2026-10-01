# Kiểm tra nội dung và giao diện

## Easter egg thay các trò có luật ngày 01/10/2026

- Gỡ giao diện, controller và test của các trò đóng dấu, xếp thứ tự, ghép ảnh, dấu chân và sổ điểm. Gỡ bốn ảnh preview của bản trò chơi; các file này vẫn có thể khôi phục từ Git. Không sửa profile_data.py hoặc bất kỳ ảnh gốc nào trong img.
- Mèo tam thể là ảnh raster alpha tái sử dụng từ Meow-Login, có khung nghỉ và khung mở miệng. Desktop 1440px: mèo nhỏ nằm ở góc trái dưới, ngoài vùng chữ. Mobile 390px: nằm cạnh CTA, không giao nhau với nút Nhìn lại. Menu hoặc album mở thì mèo ẩn.
- Audio sau reload có paused=true, readyState=0, currentTime=0 (preload none). Bấm mèo bằng chuột hoặc Enter: clip OGG local được phát, paused=false, readyState=4, currentTime tăng, duration khoảng 1.174 giây, trạng thái Meo. Khi kết thúc, mèo về khung nghỉ, audio dừng và currentTime về 0. Không khẳng định đã nghe qua loa vật lý chỉ từ các trạng thái này.
- Bấm liên tiếp không chồng hoặc khởi động lại tiếng trong cùng lượt. Nút tắt tiếng dừng ngay clip đang chạy; bấm mèo khi mute vẫn đổi biểu cảm nhưng audio paused=true. Bật lại và Enter phát được tiếng. Có guard theo generation cho promise phát âm thanh bị hủy, tránh callback cũ ghi đè trạng thái mute.
- Có đúng 9 wrapper ảnh và 18 lớp bàn chân trang trí. Tài nguyên tải được, naturalWidth lớn hơn 0, nền trong suốt. Hai lớp có z-index 1 và 3, nút ảnh ở lớp 2; trang trí pointer-events none, không lấy focus.
- Chuỗi sáu khung chụp từ hoạt ảnh thật ghi nhận: tay đi từ sau mép ảnh, ngón chân chạm phía trước, opacity lên 1, rồi về 0. Sau khoảng 1.1 giây, class is-paw-reaching được gỡ dù con trỏ vẫn trên ảnh. Không chạy vòng lặp hoặc pointer-follow liên tục.
- Reduced-motion: bàn tay chỉ hiện/ẩn tại một transform không đổi trong phần hiện; khung tiếp theo opacity=0 và class hoạt động được gỡ. Các chuyển động vươn/nhún bị loại bỏ, scroll-behavior=auto. Guard ẩn tab/rời trang được kiểm tra qua code, chưa mô phỏng được tab ẩn để chứng minh trực tiếp.
- Khi JavaScript tắt rồi reload: mèo hidden, không có lớp bàn tay, vẫn có đủ 5 tiêu đề phần và 9 nút ảnh, không tràn ngang. Đã bật lại JavaScript và xóa giả lập reduced-motion.
- Sau sửa mép bàn tay: viewport 320, 390, 580, 768, 1024, 1440px không tràn ngang, không có heading/p/dd tràn chữ. Ba ảnh du lịch vẫn bằng nhau và vuông; không thay bố cục đã cân.
- Album desktop mở và chuyển 1/9 sang 2/9; trên mobile mở ảnh Giữa màu xanh ở 6/9, ArrowRight sang 7/9 đúng /img/dulich2.jpg. Escape đóng và trả focus về nút ảnh đã mở. Mở album hủy tay mèo đang chạy. Menu mobile mở, ẩn mèo, chọn Chuyến đi đóng menu đúng.
- Kiểm tra bằng chuột/bàn phím thật trong trình duyệt in-app và viewport mô phỏng. Input.dispatchTouchEvent không được trình duyệt này hỗ trợ; nhánh pointerdown touch được kiểm tra qua code, không coi viewport mobile là chứng minh thao tác cảm ứng. Chưa thử trên điện thoại vật lý, Safari/Firefox hoặc loa vật lý, chưa đo FPS thiết bị yếu.
- 10/10 unittest Flask PASS, bao gồm nguồn ảnh/static, HTML escaping, traversal, không còn trò có luật, audio không autoplay và guard hiệu ứng. node --check cho main.js/easter-eggs.js và git diff --check PASS. Console không có warning/error trong lượt kiểm tra.
- Preview hiện tại: [mèo ở góc](preview-easter-cat.png), [bàn tay chạm ảnh](preview-easter-paw.png), [mobile](preview-easter-mobile.png). Trình duyệt được trả về viewport mặc định, JavaScript bật và không giữ giả lập chuyển động.

## Cân lại ảnh Chuyến đi ngày 01/10/2026

- Ba ảnh dùng chung khung vuông, ba cột bằng nhau. Trên desktop 1440px, ảnh khoảng 365.3x365.3px; tiêu đề và đoạn mô tả thẳng hàng, sai lệch dưới 1px do làm tròn layout.
- Từ 680px trở xuống xếp một cột. Kiểm tra cuối ở 320, 390, 580, 581, 680, 681, 768, 1024, 1440px: không tràn ngang hoặc tràn chữ; ba khung ảnh bằng nhau ở từng viewport.
- Đọc bố cục từ ảnh chụp desktop và mobile 390px. Không tạo một ảnh lớn tràn hai cột hoặc để một ảnh lẻ khác kích thước.
- Mở ảnh Giữa màu xanh trên mobile: album hiện đúng /img/dulich1.jpg, object-fit contain và vị trí 6/9. Đóng ảnh trả focus về nút mở. Ảnh gốc và lời mô tả không thay đổi.
- 8/8 nhóm unittest PASS, có thêm kiểm tra ba article dùng chung layout. git diff --check PASS; console không có warning/error trong lượt test.
- Bộ quét layout báo DEGRADED do thiếu parser; kết quả regex không được coi là chứng nhận sạch. Kiểm tra kích thước, hàng chữ và overflow được thực hiện trực tiếp trên DOM và ảnh chụp trình duyệt.
- Preview: [desktop](preview-travel.png), [mobile](preview-travel-mobile.png). Đây là viewport mô phỏng, không phải thử trên điện thoại vật lý. Viewport tạm được reset khi kết thúc.

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
