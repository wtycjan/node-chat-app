FROM ubuntu:latest
ENV TZ=Europe/Warsaw
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y build-essential
RUN apt-get -y install git
RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN cd ~
COPY . node-chat-app/
WORKDIR node-chat-app
RUN ls
