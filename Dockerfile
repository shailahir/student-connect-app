FROM eclipse-temurin:17-jdk-alpine

# Refer to Maven build -> finalName
ARG JAR_FILE=target/student-connect-0.0.1-SNAPSHOT.jar

# cd /opt/app
WORKDIR /opt/app
EXPOSE 8080

# cp target/spring-boot-web.jar /opt/app/app.jar
COPY ${JAR_FILE} app.jar

# Database environment variables
ENV DB_JDBC_NAME=postgresql
ENV DB_HOST=host.docker.internal
ENV DB_PORT=5432
ENV DB_NAME=student_connect_db
ENV DB_USER=postgres
ENV DB_PASSWORD=password
ENV DB_CONNECTION_TIMEOUT=60000
ENV DB_POOL_SIZE=5

# JPA environment variables
ENV JPA_DATABASE_PLATFORM=org.hibernate.dialect.PostgreSQLDialect
ENV JPA_SHOW_SQL=false
ENV JPA_FORMAT_SQL=false
ENV JPA_DDL_AUTO=validate

# Email environment variables
ENV SMTP_HOST=smtp.gmail.com
ENV SMTP_PORT=587
ENV SMTP_USER=user
ENV SMTP_PASSWORD=app_password
ENV SMTP_AUTH=true
ENV SMTP_STARTTLS_ENABLE=true

#Azure AD environment variables
ENV AZURE_AD_ENABLED=true
ENV AZURE_AD_TENANT_ID=value
ENV AZURE_AD_CLIENT_ID=value
ENV AZURE_AD_CLIENT_SECRET=value

#SMS environment variables
ENV SMS_ACCOUNT_ID=value
ENV SMS_AUTH_TOKEN=value
ENV SMS_FROM_NUMBER=value
ENV SPRING_PROFILES_ACTIVE=prod

ENV JAVA_OPTS="-Xms256m -Xmx512m"

# java -jar /opt/app/app.jar
ENTRYPOINT ["java", "-jar","app.jar"]