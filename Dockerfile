FROM postgres:latest

# 환경 변수 설정 (옵션)
ENV POSTGRES_DB=e1blog
ENV POSTGRES_USER=e1admin
ENV POSTGRES_PASSWORD=H/KMC123

# 컨테이너에서 실행될 초기 SQL 스크립트
COPY init.sql /docker-entrypoint-initdb.d/

# docker build -t mslee978/e1db .
# docker run --name e1db -p 5432:5432 -d mslee978/e1db