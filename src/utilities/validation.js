import { body } from "express-validator";

export const registrationRules = [

  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters."),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters."),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain a number.")
];

export const loginRules = [

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")

];

export const vehicleRules = [

  body("category_id")
    .isInt()
    .withMessage("Please select a category."),

  body("year")
    .isInt({ min: 1900, max: 2100 })
    .withMessage("Enter a valid year."),

  body("make")
    .trim()
    .notEmpty()
    .withMessage("Vehicle make is required."),

  body("model")
    .trim()
    .notEmpty()
    .withMessage("Vehicle model is required."),

  body("mileage")
    .isInt({ min: 0 })
    .withMessage("Mileage must be a positive number."),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number."),

  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters.")
];

import { validationResult } from "express-validator";

export function validate(view, title) {
  return (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render(view, {
        title,
        errors: errors.array(),
        formData: req.body,
      });
    }

    next();
  };
}