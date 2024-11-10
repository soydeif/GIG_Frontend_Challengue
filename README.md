# Gaming Innovation Group JavaScript Challenge - Client Side Address Book

This project is a Single Page Application (SPA) address book built with TypeScript, React, and CSS.

![image](https://github.com/user-attachments/assets/a1906a5c-17fb-42be-aa5d-1954f9cd894a)




## Functionality

- **View to list all contacts**: The app displays a list of contacts.
- **View to add, delete, and edit contacts**: You can create new contacts, edit existing ones, and delete contacts.
- **Data Persistence**: The contact data is stored on the client-side, meaning that when you reload the app, the data remains intact (using `localStorage` and `SessionStorage`).
- **Validation**:
  Input fields are validated to ensure that:
  - First name is required.
  - Last name is required.
  - Email is required and must be a valid email address.
  - Country must be selected from a dropdown populated with data from the `country-list` module.

## Libraries and Frameworks Used

- **React**: JavaScript library for building user interfaces.
- **React Hook Form**: Library to handle form validation and management.
- **React Router DOM**: For navigation and routing in the SPA.
- **uuid**: To generate unique IDs for contacts.
- **country-list**: For populating the country dropdown.
- **React Hot Toast**: For showing toast notifications.
- **Jest**: For running unit tests on the application.
- **ESLint**: For linting and ensuring code quality.

## Other Requirements

- **Compatibility**: Compatible with Node.js 10.x and NPM 6.x. Works in the latest versions of Chrome and Firefox.
- **Technology Choices**: Built with React and TypeScript on the frontend. Webpack is used for bundling and optimizing the development and production builds.
- **Architecture**: Modular architecture, feature-based, and component-centric.
- **Code Practices**: Emphasizes DRY, clean code principles, and testability.

## Getting Started

### Prerequisites

1. Install Node.js 10.x and NPM 6.x on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/soydeif/GIG_Frontend_Challengue.git

   ```

2. Navigate to the project directory:

   ```bash
   cd challengue_frontend_gig

   ```

3. Install dependencies:

```bash
 npm install
```

### Running the Project

To start the development server, run:

```bash
 npm run dev
```

To build the project for production, run:

```bash
 npm run build
```

To preview the production build, run:

```bash
 npm run start
```

To run the tests, use:

```bash
npm run test
```

Regards
