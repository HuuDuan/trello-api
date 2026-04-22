````
# HuuDuan - Trello API

A RESTful API for a Trello-like application built with Node.js, Express.js, and MongoDB. This API provides endpoints for managing boards, columns, cards, users, and invitations, with real-time features using Socket.io.

## Features

- **Board Management**: Create, update, delete, and manage boards
- **Column Management**: Organize boards with columns
- **Card Management**: Add, edit, move, and delete cards within columns
- **User Management**: User registration, authentication, and profile management
- **Invitation System**: Invite users to boards with email notifications
- **Real-time Updates**: Socket.io integration for live updates
- **File Upload**: Cloudinary integration for image uploads
- **Email Notifications**: Brevo (Sendinblue) for email services
- **Authentication**: JWT-based authentication with access and refresh tokens
- **Validation**: Joi for request validation
- **Error Handling**: Comprehensive error handling middleware

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time**: Socket.io
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Joi
- **File Storage**: Cloudinary
- **Email Service**: Brevo (Sendinblue)
- **Password Hashing**: bcryptjs
- **Development**: Babel, ESLint, Nodemon

## Prerequisites

- Node.js >= 18.16.0
- npm >= 9.8.1
- yarn >= 1.22.19
- MongoDB

## Installation

1. Clone the repository:
   ```bash
   git clone <https://github.com/HuuDuan/trello-api.git>
   cd trello-api
````

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The server will start on `http://localhost:8017` (or the port specified in `LOCAL_DEV_APP_PORT`).

### Production Mode

```bash
npm run production
# or
yarn production
```

### Linting

```bash
npm run lint
# or
yarn lint
```

### Building

```bash
npm run build
# or
yarn build
```

## API Endpoints

The API provides the following main endpoints:

### Boards

- `GET /v1/boards` - Get all boards
- `POST /v1/boards` - Create a new board
- `GET /v1/boards/:id` - Get a specific board
- `PUT /v1/boards/:id` - Update a board
- `DELETE /v1/boards/:id` - Delete a board

### Columns

- `GET /v1/columns` - Get all columns
- `POST /v1/columns` - Create a new column
- `GET /v1/columns/:id` - Get a specific column
- `PUT /v1/columns/:id` - Update a column
- `DELETE /v1/columns/:id` - Delete a column

### Cards

- `GET /v1/cards` - Get all cards
- `POST /v1/cards` - Create a new card
- `GET /v1/cards/:id` - Get a specific card
- `PUT /v1/cards/:id` - Update a card
- `DELETE /v1/cards/:id` - Delete a card

### Users

- `GET /v1/users` - Get all users
- `POST /v1/users` - Register a new user
- `GET /v1/users/:id` - Get a specific user
- `PUT /v1/users/:id` - Update a user
- `DELETE /v1/users/:id` - Delete a user

### Invitations

- `GET /v1/invitations` - Get all invitations
- `POST /v1/invitations` - Create a new invitation
- `GET /v1/invitations/:id` - Get a specific invitation
- `PUT /v1/invitations/:id` - Update an invitation
- `DELETE /v1/invitations/:id` - Delete an invitation

### Status Check

- `GET /v1/status` - Check API status

For detailed API documentation, refer to the route files in `src/routes/v1/`.

## License

This project is private and proprietary.

## Author

HuuDuan

```

```
