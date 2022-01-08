# Pull base image
FROM python:3.8.5-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code

# Install dependencies
RUN \
  apk update && \
  apk add --no-cache postgresql-libs && \
  apk add --no-cache --virtual .build-deps gcc musl-dev python3-dev postgresql-dev libffi-dev

RUN pip install --upgrade pip

COPY requeriments.txt .

RUN pip install -r requeriments.txt

# Copy project
COPY . /code/
