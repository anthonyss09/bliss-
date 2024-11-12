import isEmail from "../helpers/isEmail";

async function handleContactMessage({
  email,
  message,
}: {
  email: string;
  message: string;
}) {
  if (!isEmail(email)) {
    throw new Error("Please provide a valid email address.");
  }
  if (!message) {
    throw new Error("Please add a message.");
  }
  const formData = new FormData();
  formData.append("email", email);
  formData.append("message", message);

  try {
    const response = await fetch("/api/v1/contact", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default handleContactMessage;
