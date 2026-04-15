import { Client } from "minio";

function parseEndpoint(raw: string) {
  const stripped = raw.replace(/^https?:\/\//, "").replace(/:\d+$/, "");
  return stripped;
}

const minioClient = new Client({
  endPoint: parseEndpoint(process.env.MINIO_ENDPOINT!),
  port: Number(process.env.MINIO_PORT || 9000),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
});

const BUCKET = process.env.MINIO_BUCKET || "first-mate";

async function ensureBucket() {
  const exists = await minioClient.bucketExists(BUCKET);
  if (!exists) {
    await minioClient.makeBucket(BUCKET);

    const policy = JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: { AWS: ["*"] },
          Action: ["s3:GetObject"],
          Resource: [`arn:aws:s3:::${BUCKET}/*`],
        },
      ],
    });
    await minioClient.setBucketPolicy(BUCKET, policy);
  }
}

export async function uploadToMinio(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  await ensureBucket();

  await minioClient.putObject(BUCKET, filename, buffer, buffer.length, {
    "Content-Type": contentType,
  });

  const publicUrl = process.env.MINIO_PUBLIC_URL;
  if (publicUrl) {
    return `${publicUrl}/${BUCKET}/${filename}`;
  }

  const protocol = process.env.MINIO_USE_SSL === "true" ? "https" : "http";
  const port = process.env.MINIO_PORT || 9000;
  return `${protocol}://${process.env.MINIO_ENDPOINT}:${port}/${BUCKET}/${filename}`;
}
