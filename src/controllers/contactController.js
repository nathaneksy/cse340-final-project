import {
  createContactMessage,
  getAllContactMessages,
} from "../models/contactModel.js";

export function buildContactPage(req, res) {
  res.render("contact/index", {
    title: "Contact Us",
    errors: [],
    formData: {},
  });
}
export async function submitContactForm(
  req,
  res,
  next
) {
  try {

    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    await createContactMessage(
      name,
      email,
      subject,
      message
    );

    res.redirect("/contact");

  } catch (error) {
    next(error);
  }
}

export async function buildManageMessages(
  req,
  res,
  next
) {
  try {

    const messages =
      await getAllContactMessages();

    res.render(
      "contact/manage",
      {
        title: "Contact Messages",
        messages,
      }
    );

  } catch (error) {
    next(error);
  }
}