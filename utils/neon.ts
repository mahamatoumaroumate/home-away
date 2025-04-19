import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
  } from '@aws-sdk/client-s3';
  
  const REGION = process.env.NEXT_PUBLIC_AWS_S3_REGION!;
  const BUCKET = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!;
  const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY!;
  const SECRET_KEY = process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY!;
  
  if (!REGION || !BUCKET || !ACCESS_KEY || !SECRET_KEY) {
    throw new Error("Missing AWS S3 environment variables!");
  }
  
  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
    },
  });
  
  // ✅ Upload file and return public URL
  export const uploadFileToS3 = async (file: File): Promise<string> => {
    const key = `${Date.now()}-${file.name}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });
  
    try {
      await s3Client.send(command);
      const url = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
      return url;
    } catch (error) {
      console.error("S3 Upload Error:", error);
      throw new Error("Failed to upload file to S3");
    }
  };
  
  // ✅ Extract S3 key from full URL
  const extractS3KeyFromUrl = (url: string): string | null => {
    try {
      const parsed = new URL(url);
      const key = decodeURIComponent(parsed.pathname).replace(/^\/+/, '');
      // const parsed = new URL('https://example.com/my/path'); -> console.log(parsed.pathname); // "/my/path"
     //decodeURIComponent(...)  This decodes any percent-encoded characters in the path. -> decodeURIComponent('/my%20path') // returns "/my path"
    //.replace(/^\/+/, '') This uses a regular expression to remove any leading slashes (/) from the string.
        //ex:   ^ means "start of string" and \/+ means "one or more / characters" example: "////secret" => "secret" and "/my/path" => "my/path"
      console.log("Extracted Key:", key); // Add this
      return key;
    } catch (err) {
      console.error("Invalid URL:", err);
      return null;
    }
  };
  
  
  // ✅ Delete file from S3 using its full URL
  export const deleteFileFromS3 = async (fileUrl: string) => {
    const key = extractS3KeyFromUrl(fileUrl);
    if (!key) {
      return { success: false, error: 'Invalid S3 URL: could not extract key' };
    }
  
    const command = new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    });
  
    try {
      await s3Client.send(command);
      return { success: true };
    } catch (error) {
      console.error("Error deleting file from S3:", error);
      return { success: false, error };
    }
  };
  