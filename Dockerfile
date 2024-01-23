FROM postgres:latest

# 환경 변수 설정 (옵션)
ENV POSTGRES_DB=test
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=1234

# 컨테이너에서 실행될 초기 SQL 스크립트
COPY init.sql /docker-entrypoint-initdb.d/

# docker build -t mslee978/e1db .
# docker run --name e1db -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d mslee978/e1db