# savemysales

### Installation

The front and back ends of savemysales are Dockerized for convenience and standardization. The only dependency is [Docker](https://docs.docker.com/install/) itself.

### Building the Containers

The instructions below should be run from the root of the repository and will build runnable Docker images.

_frontend_

```sh
docker build -t savemysales-frontend -f Dockerfile.frontend .
```
_api_

```sh
docker build -t savemysales-api -f Dockerfile.api .
```

### Running the Containers

When built, the containers can be run by the commands below. In a browser, navigate to `localhost:5000` to interact with the application.

_frontend_

```sh
docker run -d -t -p 5000:5000 savemysales-frontend
```
_api_

```sh
docker run -d -t -p 5001:5001 savemysales-api
```

### API

#### /utilityData

_Methods Allowed_


`GET`

_Example Successful Response Value_

```json
{
    "body": {
        "values": [
            10,
            10
        ],
        "factors": [
            2,
            2,
            5
        ]
    }
}
```