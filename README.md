# location-tracking-server

![Maintenance](https://img.shields.io/badge/Maintained%3F-no-red.svg)
![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)
![Open Source Love svg2](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)

API to interact with a mongoDB database for the [Location Tracking](https://github.com/memonsahil/location-tracking) app. Built using [Express](https://expressjs.com/) and [Mongoose](https://mongoosejs.com/).

## Setup

1. Install the project using npm:

```
$ cd location-tracking-server && npm install
```

2. Install ngrok globally to create a proxy URL for the database:

```
$ npm install -g ngrok
```

3. Connect to the database:

```
$ npm run db
```

4. Launch the ngrok server:

```
$ npm run tunnel
```

5. Replace the baseURL in the [API](https://github.com/memonsahil/location-tracking/blob/master/src/api/tracker.js) within the location-tracking project with the ngrok forwarded URL.

After completing the above steps, the Location Tracking app will connect to the database on launch.

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

MIT &copy; [memonsahil](https://github.com/memonsahil)
