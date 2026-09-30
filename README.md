# Dấu mốc tạo nên tôi

Portfolio cá nhân kể về hành trình từ cấp 3 đến ngày tốt nghiệp đại học, được dựng bằng Flask và ảnh local.

## Chạy local

Trên Windows, chạy:

```text
run.cmd
```

Sau đó mở `http://127.0.0.1:5059/`.

Hoặc chạy thủ công:

```powershell
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe app.py
```

## Chỉnh nội dung

Nội dung hiển thị nằm trong `profile_data.py`. Ảnh được giữ trong thư mục `img/` để trang chạy được cả khi không có internet.

## Phạm vi repository

Repository này chỉ chứa các file thuộc dự án `GioiThieuBanThan`, không chứa các thư mục anh em trong `D:\Code\PythonMaster`.
