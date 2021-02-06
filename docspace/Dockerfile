FROM openjdk:alpine as build
RUN apk add --no-cache maven
ADD pom.xml home/docspace_code/
RUN cd /home/docspace_code && mvn dependency:go-offline
ADD src home/docspace_code/src/
RUN cd /home/docspace_code && mvn install
RUN mkdir -p /home/docspace

FROM openjdk:alpine
COPY --from=build /home/docspace_code/target/docspace*.jar /home/docspace/docspace.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "/home/docspace/docspace.jar"]
