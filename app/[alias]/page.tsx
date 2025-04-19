import getUrl from "@/lib/getUrl";
import { redirect } from "next/navigation";

export default async function AliasRedirect({ params, }: { params: Promise<{ alias: string }>; }) {
  const { alias } = await params;
  if (!alias) {
    return redirect("/");
  }
  
  const urlData = await getUrl(alias);
  if (!urlData) {
    return redirect("/");
  }
  
  return redirect(urlData.urlBefore);
}