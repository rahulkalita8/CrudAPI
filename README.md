# Crud API

The porject demonstrates 4 APIs performing the CRUD operation

### APIs

| API    | Name    | Description                     | Query Params | Body                                              |
|--------|---------|---------------------------------|--------------|---------------------------------------------------|
| GET    | /       | Retrieve a phone number         | name         | -                                                 |
| POST   | /add    | Add a new phone number          | -            | ```{ "username": "string", "phonenumber": "string" }``` |
| PUT    | /update | Update an existing phone number | -            | *Same as POST Call*                           |
| DELETE | /delete | Delete a phone number           | -            | ```{ "username": "string"}``` |
| GET    | /docs   | Get Swagger documentation       | -            | |


## Structure

The program is divided into two part


1. Server Side - Backend
2. Client Side - FrontEnd

### Server Side

Language Used
1. Python 3.6

#### Requirements
1. Python 3.6 or later (preferred)

After installing python, install all the libraries present in requirements.txt

```
python -r requirements.txt
```

#### How to run

Run the command `python .src/main.py`
The server should run on port:8000

### Client Side

Language User
1. ReactJS

### How to install

#### Requirements
1. NodeJS 16.x or greater (Preferred)

After installing Node, install all the dependencies present in package.json

```
# Go to client direction first and then install
cd client
npm install
```

### How to Run

Just run the command `npm run start`
The client should run on port:3000




