## Naruto

### Endpoints

### Character

- **GET /naruto**: Retrieve a list of all characters.
- **POST /naruto**: Add a new character to the database.
- **PUT /naruto/:id**: Update a character in the database.
- **DELETE /naruto/:id**: Remove a character from the database.

### Image

- **POST /naruto/image**: Upload an image for a character.
- **GET /naruto/image/name/:name**: Retrieve an image by character name.
- **GET /naruto/image/:id**: Retrieve an image by ID.
- **GET /naruto/image/character/:id**: Retrieve an image by character ID.
- **DELETE /naruto/image/:id**: Remove an image from the database.

### Shadow

- **POST /naruto/shadow**: Add a shadow image for a character.
- **GET /naruto/shadow/:id**: Retrieve a shadow image by ID.
- **GET /naruto/shadow/character/:id**: Retrieve a shadow image by character ID.
- **DELETE /naruto/shadow/:id**: Remove a shadow image from the database.

### Jutsu

- **POST /naruto/jutsu**: Add a jutsu video for a character.
- **GET /naruto/jutsu/:id**: Retrieve a jutsu video by ID.
- **GET /naruto/jutsu/character/:id**: Retrieve a jutsu video by character ID.
- **GET /naruto/jutsu/name/:name**: Retrieve a jutsu video by jutsu name.
- **DELETE /naruto/jutsu/:id**: Remove a jutsu video from the database.

### Quote

- **POST /naruto/quote**: Add a quote for a character.
- **GET /naruto/quote/:id**: Retrieve a quote by ID.
- **GET /naruto/quote/character/:id**: Retrieve quotes by character ID.
- **DELETE /naruto/quote/:id**: Remove a quote from the database.