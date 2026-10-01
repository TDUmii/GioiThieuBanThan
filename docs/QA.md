# Kiểm tra nội dung và giao diện

## Trò nhỏ xuyên suốt album ngày 01/10/2026

- Có bốn tương tác: đóng dấu ảnh, xếp thứ tự bốn dấu mốc, ghép ba cặp ảnh và theo sáu bước chân. Các trò nằm cạnh nội dung tương ứng, mặc định thu gọn; Sổ ghé chơi nằm cuối trang.
- Desktop: đóng dấu hai lần vẫn chỉ tính một dấu; chọn sai thứ tự có gợi ý và không tăng điểm; chọn đủ bốn mốc đúng đạt dấu thứ hai. Ghép đủ sáu tile thành ba cặp đạt dấu thứ ba. Theo sáu bước chân bằng Enter đạt dấu thứ tư, hiện lời cảm ơn và trạng thái 4/4.
- Memory: thử ghép sai, từ chối chọn thêm trong lúc chờ, timer tự úp hai ảnh; chơi lại khi đang chờ xóa lượt và timer. Đóng/mở lại bằng Enter, kể cả nhanh, không giữ ảnh mở hoặc lời hướng dẫn cũ. Đã sửa callback đóng summary trước default action để không phụ thuộc toggle event bị gộp.
- Keyboard: summary native mở bằng Enter; tile ảnh lật bằng Enter; dấu chân chuyển focus sang vị trí tiếp theo. Album gốc vẫn đóng bằng Escape và trả focus về ảnh mở; menu mobile đóng bằng Escape.
- Chơi lại cả chuyến xóa cả bốn dấu, các cặp ảnh, thứ tự đã chọn, dấu trên ảnh và lời cảm ơn. Chơi lại riêng từng trò vẫn giữ dấu đã đạt của chuyến hiện tại.
- Khi ba trò mở, viewport 320, 390, 580, 768, 1024, 1440px không tràn ngang; nút, lời kể, slot và sổ dấu không tràn vùng chứa. Xem trực tiếp desktop 1440x900 và mobile 390x844, các tile và dấu chân vẫn đủ lớn để chạm.
- Sáu ảnh trong memory tải thành công, naturalWidth lớn hơn 0 và opacity về 1 sau lật. 9 nút xem ảnh gốc vẫn độc lập với trò chơi; không chỉnh sửa file img.
- Giả lập reduced-motion: ảnh ở opacity 1, dấu kỷ niệm xuất hiện ở transform tĩnh và điểm vẫn tăng. Tắt JavaScript rồi reload: cả năm vùng trò có hidden/display none, năm phần nội dung vẫn có mặt, nav mobile là grid, không tràn ngang. Đã trả về JavaScript bật và không giữ giả lập reduced-motion.
- 9/9 unittest Flask và 6/6 Node test PASS. Node kiểm tra shuffle, thứ tự sai/lặp, khóa memory khi ghép sai, settle/reset, đổi dấu chân và tính dấu duy nhất. node --check, git diff --check PASS; console không có warning/error trong lượt kiểm tra.
- Bộ quét layout vẫn DEGRADED vì thiếu parser; không dùng nó để khẳng định giao diện sạch. Chứng cứ ở trên lấy từ trạng thái DOM, input thật và ảnh chụp trình duyệt.
- Preview: [đầu trang](preview-play-hero.png), [ghép ảnh](preview-play-memory.png), [dấu chân và sổ dấu](preview-play-paw.png), [mobile](preview-play-mobile.png). Chưa thử trên điện thoại vật lý hoặc Safari/Firefox; việc hủy animation khi tab ẩn được kiểm tra qua code, không đo FPS trên thiết bị yếu.

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
