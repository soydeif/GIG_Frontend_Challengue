export const validationRules = {
  firstName: {
    required: "First name is required",
    minLength: {
      value: 3,
      message: "First name must be at least 2 characters",
    },
    maxLength: {
      value: 30,
      message: "First name must be less than 30 characters",
    },
    validate: {
      noSpaces: (value: string) =>
        !/\s/.test(value) || "First name cannot contain spaces",
    },
  },
  lastName: {
    required: "Last name is required",
    minLength: { value: 3, message: "Last name must be at least 2 characters" },
    maxLength: {
      value: 30,
      message: "Last name must be less than 30 characters",
    },
    validate: {
      noSpaces: (value: string) =>
        !/\s/.test(value) || "Last name cannot contain spaces",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/,
      message: "Enter a valid email address (e.g., user@example.com)",
    },
    validate: {
      noSpaces: (value: string) =>
        !/\s/.test(value) || "Email cannot contain spaces",
    },
  },
  country: {
    required: "Country is required",
  },
};
