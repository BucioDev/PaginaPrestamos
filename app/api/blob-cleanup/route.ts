import { list, del } from "@vercel/blob";

export async function GET(request: Request) {
  const auth = request.headers.get("Authorization");

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { blobs } = await list({
    prefix: "qrcodes/",
  });

  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 3);

  let deleted = 0;

  for (const blob of blobs) {
    if (new Date(blob.uploadedAt) < twoMonthsAgo) {
      await del(blob.url);
      deleted++;
    }
  }

  return Response.json({
    success: true,
    deleted,
  });
}