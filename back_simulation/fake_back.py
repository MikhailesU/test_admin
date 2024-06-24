from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/users")
async def get_json():
    with open('db.json', 'r') as resp:
        box = resp.readlines()
        box = ''.join(box)
        return box
    
@app.post("/users")
async def post_json(request: Request):
    data = str(await request.json())
    with open('db.json', 'r') as previosly:
        corrected_data = ''.join(previosly.readlines()).replace("true", "True").replace("false", "False")
        box=eval(corrected_data)
        with open('db.json', 'w') as resp:
            box[int(eval(data)['id'])]['username']= eval(data)['username']
            box[int(eval(data)['id'])]['email']= eval(data)['email'] 
            box[int(eval(data)['id'])]['country']= eval(data)['country']
            box[int(eval(data)['id'])]['city']= eval(data)['city']
            json.dump(box, resp, ensure_ascii=False)
    return {"message": "Data received successfully"}

@app.post("/authorization")
async def authorization(request: Request):
    data = str(await request.json())
    with open ('login-password.json', 'r') as auth:
        auth=''.join(auth.readlines())
        if eval(data)['login'] == eval(auth)[0]['login'] and eval(data)['password'] == eval(auth)[0]['password']:
            return {'isCorrect': 'true'}
        else:
            return {"isCorrect": "false"}