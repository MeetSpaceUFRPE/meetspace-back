FROM python:3.9

WORKDIR /usr/src/app

COPY requirements.txt requirements.txt
COPY app.py app.py

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 3000

CMD ["python", "app.py"]