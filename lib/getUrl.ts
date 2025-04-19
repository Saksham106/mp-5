"use server";
import { Url } from "@/types";
import getCollection, { URL_COLLECTION } from "@/db";

export default async function getUrl(
  urlAfter: string
): Promise<Url | null> {
  console.log("fetching url:", urlAfter);
  
  const urlsCollection = await getCollection(URL_COLLECTION);
  const url = await urlsCollection.findOne({ urlAfter });
  
  if (!url) {
    return null;
  }
  
  return {
    id: url._id.toHexString(),
    urlBefore: url.urlBefore,
    urlAfter: url.urlAfter
  };
}