import { NextResponse } from "next/server";
import * as nodemailer from "nodemailer";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

export async function POST(req: any) {
  const formData = await req.formData();

  const email = formData.get("email");
  const message = formData.get("message");

  if (!email || !message) {
    console.log("no message");
    return NextResponse.json({ error: "some error" }, { status: 500 });
  }

  const oauth2Client = new OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  try {
    const accessToken = await oauth2Client.getAccessToken();
    console.log("got the token", accessToken);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      ssl: true,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    } as nodemailer.TransportOptions);

    const info = await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: "test",
      text: message + "from: " + email,
    });

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Internal error",
      },
      { status: 500 }
    );
  }
}
