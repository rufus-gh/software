@echo off
REM Batch script to create empty markdown files for the website's content

REM List of markdown files to create (based on your sidebar links)
set MARKDOWN_FILES=frontend-web-dev backend-web-dev pwas http-vs-https dns ftp-vs-sftp encryption-keys hash-values digital-signatures ssl-certs tls tcp-ip smtp-pop3-imap data-packets data-mining metadata ssm orm-vs-sql

REM Loop through the list and create empty markdown files
for %%F in (%MARKDOWN_FILES%) do (
    echo. > "%%F.md"
)

echo Empty markdown files created successfully!
pause