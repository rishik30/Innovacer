# Innovacer Project

## Technologies
* React
* Express
* Mongodb (Mongo Atlas)
* Docker

## Containers
* `frontend` with React on `https://localhost:3000` route
* `backend` with Express on `https://localhost:5000` route

## Dependencies
[Docker](https://docs.docker.com/docker-for-mac/install/) (mac)

[Docker](https://docs.docker.com/docker-for-windows/install/) and docker-compose (windows)

## Setup
* Clone the respository in your system
```
git clone https://github.com/rishik30/Innovacer.git
```
* Change active directory to cloned directory `Innovacer`
```
cd Innovacer/
```

* Build the docker image by running the following command
```
docker-compose build
```

* Run the built container
```
docker-compose up
```

* Access the project on client at `http://localhost:3000`
