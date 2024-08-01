## Naruto

### Endpoints

### Character

- **GET /naruto**: Retrieve a list of all characters.
- **POST /naruto**: Add a new character to the database.
- **PUT /naruto/:id**: Update a character in the database.
- **DELETE /naruto/:id**: Remove a character from the database.

### Image

- **POST /image**: Upload an image for a character.
- **GET /image/name/:name**: Retrieve an image by character name.
- **GET /image/:id**: Retrieve an image by ID.
- **GET /image/character/:id**: Retrieve an image by character ID.
- **DELETE /image/:id**: Remove an image from the database.

### Shadow

- **POST /shadow**: Add a shadow image for a character.
- **GET /shadow/:id**: Retrieve a shadow image by ID.
- **GET /shadow/character/:id**: Retrieve a shadow image by character ID.
- **DELETE /shadow/:id**: Remove a shadow image from the database.

### Jutsu

- **POST /jutsu**: Add a jutsu video for a character.
- **GET /jutsu/:id**: Retrieve a jutsu video by ID.
- **GET /jutsu/character/:id**: Retrieve a jutsu video by character ID.
- **GET /jutsu/name/:name**: Retrieve a jutsu video by jutsu name.
- **DELETE /jutsu/:id**: Remove a jutsu video from the database.

### Quote

- **POST /quote**: Add a quote for a character.
- **GET /quote/:id**: Retrieve a quote by ID.
- **GET /quote/character/:id**: Retrieve quotes by character ID.
- **DELETE /quote/:id**: Remove a quote from the database.