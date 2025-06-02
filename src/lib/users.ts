'use server'
import { db } from "@/db/config";
import { users } from "@/db/schema";

export const userRegistration = async (formData:FormData) => {
    const rawFormData = {
        email:formData.get('email'),
        username:formData.get('password'),
        password:formData.get('password')
    }

    console.log(rawFormData);
    try {
       
        console.log("Singed up")
    } catch (error) {
        console.log(error);        
    }
}

export const userLogIn = async () => {
    try {
        
    } catch (error) {
        console.log(error);        
    }
}

export const usersFetch = async () => {
    try {
        
    } catch (error) {
        console.log(error);        
    }
}