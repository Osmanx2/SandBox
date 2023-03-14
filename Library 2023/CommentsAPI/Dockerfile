FROM openjdk:17-alpine
VOLUME /tmp
ARG JAVA_OPTS
ENV JAVA_OPTS=$JAVA_OPTS
COPY build/libs/commentsapi-0.0.1-SNAPSHOT.jar commentsapi.jar
EXPOSE 3010
ENTRYPOINT exec java $JAVA_OPTS -jar commentsapi.jar
# For Spring-Boot project, use the entrypoint below to reduce Tomcat startup time.
#ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar commentsapi.jar


#./gradlew build
