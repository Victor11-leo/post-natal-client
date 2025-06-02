import { db } from "@/db/config";
import { questionnaires } from "@/db/schema";

import { eq } from "drizzle-orm";

interface Article {
  id: number;
  title: string | null;
  content: string | null;
  excerpt: string | null;
  featuredImage: string | null;
  tags: string[] | null;
}

const page = async ({params}:{params: Promise<{slug:string}>}) => {
  const {slug} = await params
  const article = await db.select().from(questionnaires).where(eq(questionnaires.id, slug));  
  console.log(article);
  return (
    <div>    

    </div>
  )
}

export default page