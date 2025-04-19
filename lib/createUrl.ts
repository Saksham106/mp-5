"use server";
import { Url } from "@/types";
import getCollection, { URL_COLLECTION } from "@/db";

export default async function createUrl(
  urlBefore: string,
  customAlias: string
): Promise<Url | string> {
  console.log("creating new url");
  
  try {
    const response = await fetch(urlBefore, { 
      method: "HEAD", 
      redirect: "follow",
      signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok || response.status >= 400) {
      return "The URL is not accessible. Please check and try again.";
    }
  } catch (error) {
    console.error("URL validation error:", error);
    return "Could not validate the URL. It may be inaccessible or blocked.";
  }
  
  const p = {
    urlBefore: urlBefore,
    urlAfter: customAlias,
  };


  const urlsCollection = await getCollection(URL_COLLECTION);
  const duplicateAlias = await urlsCollection.findOne({ urlAfter: customAlias });
    if (duplicateAlias) {
        return "This alias is already taken";
    }
  const res = await urlsCollection.insertOne({ ...p });

  if (!res.acknowledged) {
    throw new Error("DB insert failed");
  }

  return { ...p, id: res.insertedId.toHexString() };
}

