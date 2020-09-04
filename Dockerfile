FROM python:3.6

RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install pigz

ADD requirements.txt /tmp/requirements.txt
RUN pip install --trusted-host pypi.python.org -r /tmp/requirements.txt

WORKDIR /app
COPY . /app

EXPOSE 5000
ENV PORT 5000

CMD gunicorn -b 0.0.0.0:5000 app:app