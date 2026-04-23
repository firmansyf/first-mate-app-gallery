import type { Metadata } from "next";
import Gallery from "./components/Gallery";
import Feed from "./components/Feed";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { AUTHOR_NAME, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  title: `${AUTHOR_NAME} — ${SITE_NAME} Online Gallery`,
  description: `Website resmi ${AUTHOR_NAME}, seorang software engineer. Lihat gallery foto, video, dan dokumentasi momen pribadinya di ${SITE_NAME}.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${AUTHOR_NAME} — ${SITE_NAME} Online Gallery`,
    description: SITE_DESCRIPTION,
    url: "/",
    type: "website",
  },
};

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const session = token ? verifyToken(token) : null;

  // Admin sees the feed with CreatePost, public sees the gallery grid
  if (session) {
    return <Feed />;
  }

  return <Gallery />;
}
