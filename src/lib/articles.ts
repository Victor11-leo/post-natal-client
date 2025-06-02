'use server'
import { db } from "@/db/config"
import { articles, questionnaires } from "@/db/schema"
import { eq } from "drizzle-orm"

export const createArticle = async (rawData) => {
    try {    
        const res = await db.insert(articles).values(rawData)
        console.log(res);
        return 'success'
    } catch (error) {
        console.log(error.message);
        return 'error'
    }
}

export const updateArticle = async (rawData) => {
    try {    
        const res = await db.update(articles)
        .set(rawData)
        .where(eq(articles.id,rawData.id))
        console.log(res);
        return 'success'
    } catch (error) {
        console.log(error.message);
        return 'error'
    }
}

export const deleteArticle = async (rawData) => {
    try {    
        const res = await db.delete(articles)        
        .where(eq(articles.id,rawData.id))
        console.log(res);
        return 'success'
    } catch (error) {
        console.log(error.message);
        return 'error'
    }
}

export const createQuestionnaire = async (rawData) => {
    try {    
        const res = await db.insert(questionnaires).values(rawData)
        console.log(res);
        return 'success'
    } catch (error) {
        console.log(error.message);
        return 'error'
    }
}