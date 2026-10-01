# Cài đặt và chạy

## Yêu cầu

- Python 3 và pip.
- Kết nối internet cho lần cài thư viện đầu tiên.

Mở terminal trong thư mục chứa `app.py`.

## Windows

Chạy:

```powershell
.\run.cmd
```

Script tự tạo môi trường `.venv`, cài thư viện từ `requirements.txt` và khởi động ứng dụng.

Hoặc cài và chạy thủ công:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe app.py
```

Nếu không có lệnh `python`, dùng `py -3` để tạo môi trường.

## macOS / Linux

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python app.py
```

## Mở và dừng ứng dụng

Sau khi chạy, mở [http://127.0.0.1:5059/](http://127.0.0.1:5059/).

Nhấn `Ctrl+C` trong terminal để dừng. Mặc định ứng dụng chỉ lắng nghe trên localhost và không bật debug.

## Đổi cổng

Windows PowerShell:

```powershell
$env:PORT = "5060"
.\.venv\Scripts\python.exe app.py
```

macOS / Linux:

```bash
PORT=5060 .venv/bin/python app.py
```

Sau đó mở [http://127.0.0.1:5060/](http://127.0.0.1:5060/).
