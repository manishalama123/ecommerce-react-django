import * as yup from "yup"

export const registerFormValidationSchema = yup.object().shape({
    first_name: yup
        .string()
        .required("First name is required")
        .matches(/^[A-Za-z]+$/, "First name should contain only letters"),

    last_name: yup
        .string()
        .required("Last name is required")
        .matches(/^[A-Za-z]+$/, "Last name should contain only letters"),

    username: yup
        .string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),

    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),

    password2: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),

})

export const loginFormValidationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
})

export const productFormValidationSchema = yup.object().shape({
    title: yup.string().required("Product name is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .positive("Price must be greater than 0")
      .required("Price is required"),
    quantity: yup
      .number()
      .typeError("Quantity must be a number")
      .integer("Quantity must be an integer")
      .min(1, "Quantity must be at least 1")
      .required("Quantity is required"),
    
    image: yup
      .mixed()
      .test("fileRequired", "Image is required", (value) => {
        return value && value.length > 0;
      })
      .test("fileType", "Only image files are allowed", (value) => {
        if (!value || !value.length) return true; // Skip if no file (handled by required test)
        const file = value[0];
        return file && file.type.startsWith('image/');
      })
      .test("fileSize", "File size must be less than 10MB", (value) => {
        if (!value || !value.length) return true; // Skip if no file
        const file = value[0];
        return file && file.size <= 10 * 1024 * 1024; // 10MB in bytes
      }),
  });