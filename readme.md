# Saheart

Saheart is a horoscope application with a mobile frontend and a C# ASP.NET Core backend.

## Project Structure

- **/mobile**: React Native + Expo frontend. Published on Google Play as _Saheart – Essential star Guide_.
- **/server**: Backend API written in C# using ASP.NET Core.

## Getting Started

### Mobile Frontend

```sh
cd mobile
npm install
npm run
```

See [`mobile/README.md`](mobile/README.md) for more details.

### Server Backend

```sh
cd server/saheart-server
# Configure your .env file in env/.env
dotnet run
```

See [`server/README.md`](server/README.md) for backend details.

## Licensing

- The root project is licensed under the [Apache License 2.0](LICENSE).
- The server backend is licensed under the [GNU GPL v3](server/LICENSE.txt).

## Additional Information

- Privacy policy is available at `server/saheart-server/wwwroot/privacy-policy.html`.
- For questions or contributions, please open an issue or pull request.
