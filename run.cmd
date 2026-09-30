@echo off
setlocal
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" (
    where py >nul 2>nul
    if errorlevel 1 (
        python -m venv .venv
    ) else (
        py -3 -m venv .venv
    )
    if errorlevel 1 (
        echo Khong tao duoc moi truong Python.
        exit /b 1
    )
)

rem Check dependencies even if a previous installation was interrupted.
".venv\Scripts\python.exe" -m pip --disable-pip-version-check install -r requirements.txt
if errorlevel 1 (
    echo Khong cai duoc dependencies. Hay kiem tra Python va ket noi mang.
    exit /b 1
)

".venv\Scripts\python.exe" app.py
exit /b %errorlevel%
