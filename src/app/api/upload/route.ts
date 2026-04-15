import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { uploadToMinio } from "@/lib/minio";
import { v4 as uuid } from "uuid";
import path from "path";

export async function POST(req: NextRequest) {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name) || ".bin";
  const filename = `${uuid()}${ext}`;

  const isVideo = file.type.startsWith("video/");
  const mediaType = isVideo ? "video" : "image";

  const url = await uploadToMinio(buffer, filename, file.type);

  return NextResponse.json({ url, mediaType });
}
