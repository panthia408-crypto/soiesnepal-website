import { client } from "@/lib/sanity";
import { generalMembersQuery } from "@/lib/queries";
import MembersClient from "./MembersClient";

export const revalidate = 60;

async function getMembers() {
  try {
    const data = await client.fetch(generalMembersQuery);
    return data?.length ? data : [];
  } catch {
    return [];
  }
}

export default async function MembersPage() {
  const batches = await getMembers();
  return <MembersClient batches={batches} />;
}
