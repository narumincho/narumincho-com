FROM ubuntu:20.04

COPY ["target/release", "."]

CMD [ "./narumincho_com" ]