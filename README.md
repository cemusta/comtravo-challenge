[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/cemusta/comtravo-challenge/blob/master/LICENSE)
[![GitHub actions](https://github.com/cemusta/comtravo-challenge/workflows/Node.js%20CI/badge.svg)](https://github.com/cemusta/comtravo-challenge/actions)
[![CodeFactor](https://www.codefactor.io/repository/github/cemusta/comtravo-challenge/badge)](https://www.codefactor.io/repository/github/cemusta/comtravo-challenge)
[![codecov](https://codecov.io/gh/cemusta/comtravo-challenge/branch/master/graph/badge.svg)](https://codecov.io/gh/cemusta/comtravo-challenge)

# Contro Challenge

This repository contains a small nodejs/express app to tackle Comtravo's coding challenge below. Main challenge was asyncroniously consuming multiple mock 3rd party api's, merging results within a timeout limit.

## Challenge
```
Please plan and implement a service in Node.js which consumes 2 endpoints
(https://discovery-stub.comtravo.com/source1 & https://discovery-stub.comtravo.com/source2) 
exposed by discovery-stub service(details see below).

Your service should get flights from these 2 routes, merge them, remove duplicates and send to the client.
As an identity of the flight can be used the combination of flight numbers and dates.
Note that discovery-stub service is not stable, i.e. it can sometimes fail or reply after couple of seconds. 
The response time of your service shouldn't take longer than 1 second.

Please write tests for your implementation. 

Below is the info regarding discovery service:

The URL: https://discovery-stub.comtravo.com/
API Specs: https://discovery-stub.comtravo.com/api-docs/
```

## Deployed example

Heres the link for deployed example working on google cloud app engine standard

> https://comtravo-challenge-278911.appspot.com


## How to run

Install dependencies using, `npm install`, then you can directly start api in local environment.

```bash
npm start
```

App is starting with swagger ui so you can directly use it to invoke calls to api, from http://localhost:8080/api-docs/

## Environment Variables 

There are some env vars that need to be defined, you can check .env.template file and use it as a .env file template.

`API_USER` and `API_PASS` are not mandatory however 2nd source will always fail due to auth errors without them.

`API_TIMEOUT` is set to 980 miliseconds when not set and can be used to override timeout value for data providers.

`PORT` can be used to override default port which was 8000

## Tests and linting

for running tests, use:

```bash
npm run test
```

for checking linting, use:

```bash
npm run lint
```

### list of possible improvements for future

 - Model validations
 - Making data services more moduler