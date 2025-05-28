# Vehicle Rental App - Frontend

This is the frontend for the Vehicle Rental application, built with React, Vite, Material UI, and Tailwind CSS. It provides a multi-step form for users to book vehicles.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or later recommended)
- **npm** (usually comes with Node.js)

## Getting Started

Follow these steps to get the frontend application up and running on your local machine.

### 1. Navigate to the Frontend Directory

If you have cloned the main project repository, navigate into the `frontend` directory:

```bash
cd path/to/your/vehicle-rental-app/frontend
```

### 2. Install Dependencies

Install the necessary Node.js packages:

```bash
npm install
```

This will install React, Material UI, Tailwind CSS, Axios, React Hook Form, date-fns, react-toastify, and other related dependencies.

### 3. Environment Variables

The frontend needs to know the base URL of your backend API. This is configured using an environment variable.

1.  Create a `.env` file in the `frontend` root directory:
    ```bash
    touch .env
    ```
2.  Open the `.env` file and add the following, replacing the URL if your backend runs on a different port or host:

    ```env
    VITE_API_BASE_URL=http://localhost:5001/api
    ```

    - **Important:** Vite projects use environment variables prefixed with `VITE_`.
    - The `src/api/axiosConfig.js` file is set up to use this variable to make API calls.

### 4. Running the Application

- **Start the development server:**

  ```bash
  npm run dev
  ```

  This will start the Vite development server, typically on `http://localhost:5173` (the exact port will be shown in your terminal). The application will automatically reload if you make changes to the code.

- **Ensure your backend server is also running** for the API calls to work.

### 5. Building for Production

To create an optimized production build:

```bash
npm run build
```

The build artifacts will be placed in the `dist/` directory. This folder can then be deployed to a static site hosting service.

## Key Libraries Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast frontend build tool and development server.
- **Material UI (MUI)**: Component library for UI elements like Buttons, TextFields, DatePickers, Alerts.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for making API calls to the backend.
- **React Hook Form**: For efficient form state management and validation.
- **date-fns**: For date utility functions.
- **react-toastify**: For displaying toast notifications.
