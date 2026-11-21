@echo off
cd /d "d:\Devlopment\Ektazept\ektazept-web"
npm run build > build_output.txt 2>&1
exit /b %ERRORLEVEL%
