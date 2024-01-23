## Task Manager API

Task Manager API is a Node.js application that provides CRUD operations for tasks, subtasks, and users. It includes JWT authentication, input validation, and utilizes cron jobs for task scheduling, voice calls, and priority adjustments based on due dates.

## Features

- CRUD operations for tasks, subtasks, and users
- JWT authentication
- Input validation for data integrity
- Cron jobs for task scheduling, voice calls, and priority adjustments

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm
- MongoDB

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/AmanPurohit2002/openInApp-backend-task.git
    cd server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up your MongoDB database and update the configuration in `config/config.js`.

4. Run the server:

    ```bash
    npm run dev
    ```

## Usage

To use the API, check the [API Endpoints](#api-endpoints) section for details on available routes and functionality.

## API Endpoints

- `/api/tasks`: CRUD operations for tasks
- `/api/subtasks`: CRUD operations for subtasks
- `/api/users`: CRUD operations for users

For detailed information about each endpoint, refer to the API documentation.

## Authentication

The API uses JWT for authentication. Include the generated token in the Authorization header of your requests.

## Validation

Input validation is implemented to ensure data integrity. Invalid requests will receive appropriate error responses.

## Cron Jobs

Cron jobs are utilized for:

- Task scheduling
- Voice calls
- Priority adjustments based on due dates

Refer to the codebase and documentation for detailed implementation.

## Contributing

Feel free to contribute by opening issues or submitting pull requests. Follow the [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE.md).
