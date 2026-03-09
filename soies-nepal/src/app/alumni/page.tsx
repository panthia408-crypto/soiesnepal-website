import { client } from "@/lib/sanity";
import { alumniQuery, alumniBatchQuery } from "@/lib/queries";
import AlumniClient from "./AlumniClient";

export const revalidate = 60;

const defaultAlumni = [
  { _id: "1", name: "Abiral Raj Baniya Chhetri", currentPosition: "Revenue Management Officer, Yeti Airlines", Batch: 2062 },
  { _id: "2", name: "Agni Kumar Maleku", currentPosition: "N/A", Batch: 2062 },
  { _id: "3", name: "Anil Kandel", currentPosition: "Currently in Australia", Batch: 2062 },
  { _id: "4", name: "Anisha Shakya", currentPosition: "Currently in USA", Batch: 2062 },
  { _id: "5", name: "Ankit Shrestha", currentPosition: "Lecturer", Batch: 2062 },
  { _id: "6", name: "Ashok Acharya", currentPosition: "Currently in Australia", Batch: 2062 },
  { _id: "7", name: "Basanta Babu Surraf", currentPosition: "N/A", Batch: 2062 },
  { _id: "8", name: "Bishnu Prasad Bhattarai", currentPosition: "N/A", Batch: 2062 },
];

async function getAlumni() {
  try {
    const [individual, batches] = await Promise.all([
      client.fetch(alumniQuery),
      client.fetch(alumniBatchQuery),
    ]);

    // Merge batch-imported alumni into the main list
    const batchAlumni = (batches || []).flatMap(
      (batch: { _id: string; batchYear: number; members: { name: string; currentPosition?: string; description?: string; photoUrl?: string }[] }) =>
        (batch.members || []).map((m, i) => ({
          _id: `${batch._id}-${i}`,
          name: m.name,
          currentPosition: m.currentPosition || "",
          description: m.description || "",
          Batch: batch.batchYear,
          photoUrl: m.photoUrl || "",
        }))
    );

    const all = [...(individual || []), ...batchAlumni];
    return all.length ? all : defaultAlumni;
  } catch {
    return defaultAlumni;
  }
}

export default async function AlumniPage() {
  const alumni = await getAlumni();
  return <AlumniClient alumni={alumni} />;
}
