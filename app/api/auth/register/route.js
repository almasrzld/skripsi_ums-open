import { NextResponse } from "next/server";
import connectDB from "@/libs/mongoose";
import Admin from "@/models/Admin";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectDB();

    const isExist = await Admin.findOne({ email });
    if (isExist) {
      return NextResponse.json(
        { message: "Admin sudah terdaftar" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    return NextResponse.json(
      { message: "Admin berhasil dibuat" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { message: "Gagal membuat admin" },
      { status: 500 }
    );
  }
}
