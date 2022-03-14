# Web-TODO-List-Application

A To-Do List Application

## Style Standards and Conventions

This project follows [AirBnB React Style Guide](https://github.com/airbnb/javascript/tree/master/react). We are following Pascal Case for naming files/folders. Developers are expected to follow the same in the future as well for consistency.

An example of Pascal Case would be:

`Raw: user login count`

`Pascal Case: UserLoginCount`

## Unit Testing Dependencies

- React Testing Library and MiniTest for running unit tests and generating code coverage reports.

## Pre-Requisites

- To-Do List application requires NodeJS v16.14.0 to be installed.
- Git Bash should be installed and path to its bin folder should be set to the environment variables.
- Ruby v3.0.3 is also required to be installed on the system.

## Instructions to Setup and Run the application

### Clone the project from the GitHub repo.

- User must have Ruby and Node.js installed on their systems.

- Go to the UI folder, run command npm install to install are the required packages for UI.
- To config the entire UI into one file and use it with Rails back-end run the following command.

```shell
$ npm run bundle
```

- Go to the project folder install bundler and then run the command:

```shell
 bundle install
```

- This will add all the required dependencies for the backend to run efficiently.
- Now on the terminal run “rails server -p 8000” or just rails server (to run your project on port 3000).

- Before this step make sure that these ports are not in use by any other application.

- Setup the .env file for all the secret CLIENT_ID and PASSWORD to utilize google OAuth system and a perfect functioning of the project.

### Run the application

Runs the app in the development mode.

Open [http://localhost:8000/](http://localhost:8000/) or [http://localhost:3000/](http://localhost:3000/) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

#### Loggers

All the Loggers can be viewed on the inspect section of the browser with the results consoled.

### Run automated unit tests

Run the automated unit tests for the repository.

For UI part:

```shell
$ npm run test
```

For Back-end part:

```shell
$ rails test
```

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)

About ruby and ruby on rails you can learn more from [Ruby Documentation](https://www.ruby-lang.org/en/documentation/).

To learn React, check out the [React documentation](https://reactjs.org/)

To learn Ruby on Rails, check out [Ruby on Rails Documentation](https://guides.rubyonrails.org/getting_started.html)
