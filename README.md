# Student Connect Application / Notification portal
## How to Build 

Run the clean install to create the jar file
````
./mvnw clean install
````

## Create a Docker Image

Run the following command in the root directory of the project
````
docker build -t student_connect:st_con_v1.0 .
````

## How to run
Run the Docker Image (Update the values of the environment variables)
````
docker run -p 8080:8080 \ 
--env DB_HOST=value \
--env DB_PORT=value \
--env DB_NAME=value \
--env DB_USER=value \
--env DB_PASSWORD=value \ 
--env DB_CONNECTION_TIMEOUT=value \ 
--env DB_POOL_SIZE=value \
--env JPA_DDL_AUTO=value \
--env SMTP_HOST=value \
--env SMTP_PORT=value \
--env SMTP_USER=value \
--env SMTP_PASSWORD=value \ 
--env SMTP_AUTH=value \
--env SMTP_STARTTLS_ENABLE=value \ 
--env AZURE_AD_ENABLED=value \
--env AZURE_AD_TENANT_ID=value \
--env AZURE_AD_CLIENT_ID=value \
--env AZURE_AD_CLIENT_SECRET=value \ 
--env SMS_ACCOUNT_ID=value \ 
--env SMS_AUTH_TOKEN=value \
--env SMS_FROM_NUMBER=value \
--env SPRING_PROFILES_ACTIVE=value \ 
--env JAVA_OPTS=value \
student_connect:st_con_v1.0
````

## Environment Variables in the application
Using fllowing environment variables

````
Database environment variables
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
ENV SMTP_USER=value
ENV SMTP_PASSWORD='app password'
ENV SMTP_AUTH=true
ENV SMTP_STARTTLS_ENABLE=true

#Azure AD environment variables
ENV AZURE_AD_ENABLED=true
ENV AZURE_AD_TENANT_ID=value of tenant id
ENV AZURE_AD_CLIENT_ID=value of client id
ENV AZURE_AD_CLIENT_SECRET=value if client secret

#SMS environment variables
ENV SMS_ACCOUNT_ID=twilio sms account id
ENV SMS_AUTH_TOKEN=twilio auth token
ENV SMS_FROM_NUMBER=twilio from number

ENV SPRING_PROFILES_ACTIVE=prod

ENV JAVA_OPTS="-Xms256m -Xmx512m"
````

## Reference Documentation 

How security works:
https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-azure-active-directory

https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/spring-security-support?tabs=SpringCloudAzure4x

