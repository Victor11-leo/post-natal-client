import { db } from "@/db/config";
import { articles } from "@/db/schema";
import ArticlePage from "./ArticlePage";
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
  const article = await db.select().from(articles).where(eq(articles.id, slug));  
  console.log(article);
  return (
    <div>    
      <ArticlePage
      {...article}
      />
    </div>
  )
}

export default page