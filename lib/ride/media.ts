import type { StaticImageData } from "next/image";
import coldEmail from "@/assets/media/scans/cold-email.jpg";
import tanayReply from "@/assets/media/scans/tanay-reply.jpg";
import waitlist from "@/assets/media/scans/waitlist.jpg";
import zomatoReply from "@/assets/media/scans/zomato-reply.jpg";
import zyntohouse from "@/assets/media/scans/zyntohouse.jpg";

// Everything the page still needs from Sahil, in one place. Fill a field in and its labelled
// placeholder on the page is replaced by the real thing; leave it empty and the placeholder stays.
// Photos and videos: put files in public/media/ and write their paths here starting with /media/.
// Scans: put files in assets/media/scans/ and import them, so each one's shape comes with it.

/** Real photos only: warm, unfiltered. JPG or WebP, around 1600px on the long side. */
export const photos: Record<"leCordonBleu" | "restaurant", string | undefined> = {
  /** Stop 05: Le Cordon Bleu, Paris (4:3). From the school's website, cropped below their logo bar. */
  leCordonBleu: "/media/photos/le-cordon-bleu.jpg",
  /** Road's end: the restaurant I imagine (16:9). An image I made; the bike's badges are painted out. */
  restaurant: "/media/photos/restaurant.jpg",
};

/** Short loops: MP4 (H.264), 10–25 seconds, around 5 MB at most. They play muted while on screen; a clip with `sound` gets a switch. */
export const videos: Record<"cooking", { src?: string; poster?: string; sound?: boolean }> = {
  /** Stop 06: me cooking in the kitchen, 25 seconds, with its sound (off until the visitor turns it on). */
  cooking: { src: "/media/video/cooking.mp4", poster: "/media/video/cooking.jpg", sound: true },
};

/** Scans and screenshots of real things. Crop to the line that matters; blur email addresses and other people's names. */
export const scans: Record<"zyntohouse" | "waitlist" | "coldEmail" | "zomatoReply" | "tanayReply", StaticImageData | undefined> = {
  /** Stop 10 · Scan 01: the Zyntohouse homepage, cropped clear of the browser's own buttons. */
  zyntohouse,
  /** Stop 10 · Scan 02: the lulu waitlist page. */
  waitlist,
  /** Stop 11 · Scan 03: my cold email to Deepinder Goyal (Jul 5, 2026), cropped below the search bar with his address. */
  coldEmail,
  /** Stop 11 · Scan 04: Zomato HR's reply (Jul 28, 2026), the engineering interview invite. The sender's name is blurred. */
  zomatoReply,
  /** Stop 12 · Scan 05: Tanay's reply to my comment, on his YouTube video. */
  tanayReply,
};

/** The garage's links. */
export const contact: { linkedin?: string; email?: string; website?: string } = {
  linkedin: "https://www.linkedin.com/in/sahil-ladhania/",
  email: "sahilladhania5@gmail.com",
  website: "https://www.sahilladhania.com/",
};
