from datetime import datetime
from fastapi import Body, Depends, FastAPI, Request, UploadFile
from pydantic import BaseModel
import base64

from PgHelper import PgHelper
import json
import os
from jose import jwt

app = FastAPI()


db_host = os.getenv("PGHOST","")
db_password = os.getenv("PGPASSWORD","")
db_user = os.getenv("PGUSER","")
db_port = os.getenv("PGPORT","")
db_name = os.getenv("PGDATABASE","")
env_name = os.getenv("env_name","")


class File(BaseModel):
    id:str
    date_created: datetime
    created_by: str
    content: str
    original_file_name: str

class CreateFile(BaseModel):
    content: str
    original_file_name: str

def get_user_from_token(req: Request)->str:
        token = req.headers["Authorization"].split(' ')[1]
        
        #TODO verify token in AuthAPI each time
        decoded = jwt.decode(token, '',options={"verify_signature": False})

        usrId = decoded['id']
        print(f'Parsed token from request for user with id: {usrId}')
        return usrId


@app.get("/health")
async def root():
    cursor, _ = PgHelper(db_host, db_name, db_port,db_user, db_password).connect()

    if cursor is None:
    #TODO set different status code ie 423
       return {f"Documents API ERROR mode, does not have access to the database."}
    return {f"Documents API is up and running in {env_name}"}


#TODO: secure this endpoint
@app.get("/files")
async def get_files()->dict:
    cursor, _ = PgHelper(db_host, db_name, db_port,db_user, db_password, True).connect()
    cursor.execute("select * from files")
    r = cursor.fetchall()
    return r

@app.get("/files/{id}", tags=["files"])
async def get_single_file(id: str) -> dict:
    cursor, _ = PgHelper(db_host, db_name, db_port,db_user, db_password, True).connect()
    cursor.execute("select * from files where id = %s",(id,))
    res = cursor.fetchall()
    return res

@app.post("/file")
async def post_file(createFile:CreateFile, userId: str = Depends(get_user_from_token)):
    cursor, _ = PgHelper(db_host, db_name, db_port,db_user, db_password).connect()
    cursor.execute("INSERT INTO public.files( id, date_created, created_by, content, original_file_name) VALUES(gen_random_uuid(), now(), %s, %s, %s) returning id", (userId,createFile.content, createFile.original_file_name))

    return { "id": cursor.fetchone()[0] }

@app.get("/get-user-id")
async def get_user_id(userId: str = Depends(get_user_from_token)):
    return {'user_id':userId}



@app.post("/file/binary")
async def post_file(file: UploadFile, userId: str = Depends(get_user_from_token)):
    base64encoded = str(base64.b64encode(await file.read()),"utf-8")
    cursor, _ = PgHelper(db_host, db_name, db_port,db_user, db_password).connect()
    cursor.execute("INSERT INTO public.files( id, date_created, created_by, content, original_file_name) VALUES(gen_random_uuid(), now(), %s, %s, %s) returning id", (userId, base64encoded, file.filename))

    return { "id": cursor.fetchone()[0] }

