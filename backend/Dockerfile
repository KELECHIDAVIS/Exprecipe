# ---------- build stage ----------
FROM gradle:8.5-jdk17 AS build         # JDK + Gradle pre‑installed
WORKDIR /workspace

# copy build scripts first (leverages Docker cache for faster rebuilds)
COPY settings.gradle* build.gradle* gradle.properties gradle/ ./

# download dependencies without the entire source (again, speeds up rebuilds)
RUN gradle dependencies --no-daemon

# now copy the sources and build the bootJar
COPY src ./src
RUN gradle bootJar --no-daemon        # outputs build/libs/yourapp‑*.jar

# ---------- run stage -------------
FROM eclipse-temurin:17-jre            # tiny JRE‑only image
WORKDIR /app
COPY --from=build /workspace/build/libs/*.jar app.jar

# Bind to the port Render injects (default 8080 locally)
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["sh","-c","java -jar /app/app.jar --server.port=${PORT}"]

