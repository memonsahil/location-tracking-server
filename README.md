# location-tracking-server

![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)
![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)
![Open Source Love svg2](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)

API to interact with a [mongoDB](https://www.mongodb.com/cloud/atlas/) database for the [Location Tracking](https://github.com/memonsahil/location-tracking) app. Built using [Express](https://expressjs.com/) and [Mongoose](https://mongoosejs.com/).

## Setup

1. Clone the repository.

2. Install ngrok globally to create a proxy URL to access the database from a real device:

```
npm i -g ngrok
```

3. Install the project:

```
cd location-tracking-server && npm i
```

4. Connect to the database:

```
npx nodemon src/index.js
```

5. Launch the ngrok server:

```
ngrok http 3000
```

6. Replace the baseURL in the [API](https://github.com/memonsahil/location-tracking/blob/master/src/api/tracker.js) within the location-tracking project with the ngrok forwarded URL.

After completing the above steps, the Location Tracking app will connect to the database on launch.

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

MIT &copy; [memonsahil](https://github.com/memonsahil)
