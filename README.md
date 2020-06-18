# CodingChallenge
## hotel-reservations-task

For this project was used [Node.js](https://nodejs.org/) version 12.13.0 and [npm](https://www.npmjs.com/) version 6.12.0.

## Testing Application

Run `npm run tests` to run tests. Before run tests run command `npm install` to install dependencies.

# Project goal:

- Task is to write a small programm, class and/or function to check the availibity. In addition: Please
implement the test cases described below to automically test your algorithm.

# Project notes:

- Days are represented as the number of days from a certain date, e.g. `day 0, day 1, day 2, ...`; We will limit
bookings to `1` year, that is `365` days.
- All rooms are identical and may be assumed to be numbered. The size of your hotel is `size <= 1000`.
- Guest do not change the room during their stay, but always stay within the room they moved in
initially.
- If a booking request arrives and we can accept it, we accept it directly. We do not wait for later requests.

# Solutions:
- ### APP core

  - `src/core`
  - Handles all logic for creating booking requests.

- ### Models

  - HotelModel

    ```
    Hotel {
        size: number;
        rooms: Room[]
    }
    ```

  - RoomModel
    
    ```
    Room {
        roomId: number;
        reservedDays: number[];
        availableDays: number[];
    }
    ```
- ### APP tests

  - `src/index.test.ts`
  - Contains all tests for the program.

# Technical choices:
- # [TypeScript](https://graphql.org/)  
    - TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
- # [Jest](https://jestjs.io/)  
    - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
    - It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!
