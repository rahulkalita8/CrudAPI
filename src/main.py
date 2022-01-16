import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from helper import Helper
from constants import Constants
from validation import Validation


class Details(BaseModel):
    """
    Class model for Get Call
    """
    username: str
    phonenumber: str
    error: str


class Upsert(BaseModel):
    """
    Model class for both adding a new entry and updating an existing entry
    """
    username: str
    phonenumber: str


class Delete(BaseModel):
    """"
    Model class for deleting an existing entry
    """
    username: str


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def getDetails(name: str):
    """
    Get API to retrieve information of an user
    :param name: username
    :return: JSON Response
    """
    
    username = name.strip()
    validation_msg = Validation.validate(username)

    if validation_msg:
        return {"status": 400, "message": validation_msg, "error": Constants.ERROR_MESSAGE}

    data = Helper.read_JSON()

    response = {"status": 200, "message": None, "error": None}
    if data is None or username not in data:
        response["status"] = 400
        response["error"] = Constants.ERROR_MESSAGE
        response["message"] = Constants.NO_SUCH_USER
        return response
    
    response["message"] = "Found user {} with phone number {}".format(username, data[username])
    return response


@app.post("/add")
def add_new_entry(entry: Upsert):
    """
    POST Call to add a new entry into the phonebook
    :param entry: New entry of Upsert class
    :return: JSON Response
    """

    username = entry.username.strip()
    phonenumber = entry.phonenumber.strip()
    validation_msg = Validation.validate(username, phonenumber)

    if validation_msg:
        return {"status": 400, "message": validation_msg, "error": Constants.ERROR_MESSAGE}

    data = Helper.read_JSON()

    if data is None:
        data = dict()

    if username in data:
        return {"status": 400, "message": Constants.USER_ALREADY_EXISTS_ERROR, "error": Constants.ERROR_MESSAGE}
    
    data[username] = phonenumber
    Helper.write_to_JSON(data)
    return {"status": 200, "message": "{} {}".format("Add", Constants.SUCCESS), "error": None}


@app.put("/update")
def update_entry(entry: Upsert):
    """
    PUT Call to update an existing entry into the phonebook
    :param entry: New entry of Upsert class
    :return: JSON Response
    """
    
    username = entry.username.strip()
    phonenumber = entry.phonenumber.strip()
    validation_msg = Validation.validate(username, phonenumber)

    if validation_msg:
        return {"status": 400, "message": validation_msg, "error": Constants.ERROR_MESSAGE}

    data = Helper.read_JSON()

    if data is None:
        return {"status": 400, "message": Constants.NO_SUCH_USER, "error": Constants.ERROR_MESSAGE}    

    if username.strip() in data:
        data[username] = phonenumber
        Helper.write_to_JSON(data)
        return {"status": 200, "message": "{} {}".format("Update", Constants.SUCCESS), "error": None}

    return {"status": 400, "message": Constants.NO_SUCH_USER, "error": Constants.ERROR_MESSAGE}
    

@app.delete("/delete")
def delete_entry(entry: Delete):
    """
    DELETE Call to update an existing entry into the phonebook
    :param entry: New entry of Delete class
    :return: JSON Response
    """

    username = entry.username.strip()
    
    validation_msg = Validation.validate(username)

    if validation_msg:
        return {"status": 400, "message": validation_msg, "error": Constants.ERROR_MESSAGE}

    data = Helper.read_JSON()

    if data is None:
        return {"status": 400, "message": Constants.NO_SUCH_USER, "error": Constants.ERROR_MESSAGE} 

    if username in data:
        data.pop(username)
        Helper.write_to_JSON(data)
        return {"status": 200, "message": "{} {}".format("Delete", Constants.SUCCESS), "error": None}

    return {"status": 400, "message": Constants.NO_SUCH_USER, "error": Constants.ERROR_MESSAGE}
    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
