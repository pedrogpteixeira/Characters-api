## World

### Endpoints

### Country

- **GET /world/country**: Retrieve a list of all countries.
- **POST /world/country**: Add a new country to the database.
- **GET /world/country/:id**: Retrieve a country by ID.
- **GET /world/country/name/:name**: Retrieve a country by name.
- **DELETE /world/country/:id**: Remove a country from the database.
- **GET /world/country/continent/:id**: Retrieve a list of countries by continent ID.
- **GET /world/country/continent/name/:name**: Retrieve a list of countries by continent name.

### Continent

- **GET /world/continent**: Retrieve a list of all continents.
- **POST /world/continent**: Add a new continent to the database.
- **GET /world/continent/:id**: Retrieve a continent by ID.
- **GET /world/continent/name/:name**: Retrieve a continent by name.
- **DELETE /world/continent/:id**: Remove a continent from the database.

### Image

- **POST /world/image**: Upload an image for a character.
- **GET /world/image/name/:name**: Retrieve an image by character name.
- **GET /world/image/:id**: Retrieve an image by ID.
- **GET /world/image/character/:id**: Retrieve an image by character ID.
- **DELETE /world/image/:id**: Remove an image from the database.
