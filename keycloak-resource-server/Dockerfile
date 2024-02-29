# Stage 1
FROM gradle:8.4-jdk17-alpine as backend-builder
COPY --chown=gradle:gradle . /sources-build
WORKDIR /sources-build
RUN gradle build --no-daemon

# Stage 2
FROM openjdk:17-jdk-slim
WORKDIR /application
ENV SPRING_PROFILES_ACTIVE=dev
COPY --from=backend-builder /sources-build/keycloak-resource-server/build/libs/keycloak-resource-server-1.0.0.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
