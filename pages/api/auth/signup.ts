import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

type SignUpBody = {
  firstName: string;
  lastName: string; 
  email: string; 
  phone: string; 
  city: string; 
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === "POST") {
    const {firstName, lastName, email, phone, city, password}: SignUpBody = req.body;
    const errors: string[] = [];

    const validationSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "First name is invalid"
      },
      {
        valid: validator.isLength(lastName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "Last name is invalid"
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid"
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone is invalid"
      },
      {
        valid: validator.isLength(city, {min: 1}),
        errorMessage: "Phone is invalid"
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password is invalid"
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length > 0) {
      return res
        .status(400)
        .json({
          errorMessage: errors[0]
      });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (userWithEmail) {
      return res
        .status(400)
        .json({
          errorMessage: "Email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        city: city,
        email: email,
        phone: phone
      }
    });

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose
      .SignJWT({ email: user.email })
      .setProtectedHeader({alg})
      .setExpirationTime("24h")
      .sign(secret);

    setCookie("jwt", token, { req, res, maxAge: 24 * 60 * 6 });

    return res.status(200).json({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    });
  }

  return res.status(400).json("Unknown endpoint");
}