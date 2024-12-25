from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def index():
  return {
    'data': {
      'name': 'Bodhisatta'
    }
  }
  
@app.get("/hello/{name}")
def func(name):
  g = f"hello {name}, how are you doing?"
  return {
    'data': g
  }