# Weather Dashboard Application

## Introduction

The Weather Dashboard application allows users to search for weather conditions in various cities around the world. It displays detailed weather information including temperature, humidity, wind speed, and forecasts for the next five days. Users can also save their favorite cities for quick access and view the weather for those cities at any time.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm (Node Package Manager).
- You have a GitHub account.

## Installation

To install the necessary dependencies and set up the project, follow these steps:

### Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone [https://github.com/yourusername/weather-dashboard.git](https://github.com/adi5689/weather_app_task.git)
cd weather-dashboard
```

### Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

or if you prefer Yarn:

```bash
yarn install
```

### Environment Variables

Create a `.env` file in the root of your project to store environment variables. The project uses `VITE_WEATHER_API_KEY` for the OpenWeatherMap API key and `VITE_JSON_SERVER_BASE_URL` for the JSON Server base URL. Replace the placeholders with your actual values:

```plaintext
VITE_WEATHER_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
VITE_JSON_SERVER_BASE_URL=http://localhost:3000
```

Ensure you have a valid OpenWeatherMap API key. You can obtain one by signing up on the [OpenWeatherMap website](https://openweathermap.org/).

### Running the Project

To start the development server, run:

```bash
npm run dev
```

To start the JSON-Server, run

```bash
npx json-server db.json
```

This command starts the Vite development server and the JSON-Server. 

## Usage

Once the application is running, you can interact with it as follows:

- **Search for a City**: Use the search bar at the top of the dashboard to enter the name of a city. Press Enter or click the Search button to see the weather for that city.
- **View Weather Details**: Click on a city in the favorites list to view its detailed weather information.
- **Add to Favorites**: Click the heart icon next to a city in the weather details view to add it to your favorites list.
- **Remove from Favorites**: Click the trash bin icon next to a city in the favorites list to remove it.
- **Switch Units**: Click the degree symbol next to the temperature to switch between Celsius and Fahrenheit.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Project Deployed Link: 
[[https://github.com/yourusername/weather-dashboard](https://weather-app-task-tawny.vercel.app/)]
