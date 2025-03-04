import {Account, Avatars, Client, Functions, OAuthProvider} from "react-native-appwrite"
import * as Linking from 'expo-linking'

export const config ={
    platform:'com.jsm.propolist',
    endpoin: process.env.XPO_PUBLIC_APRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APRITE_PROJECT_ID,
}

export const client = new Client()

client
    .setEndpoint(config.endpoin!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

export const avatar = new Avatars(client)
export const account =new Account(client)
import { openAuthSessionAsync } from 'expo-web-browser';

export async function login() {
    try {
        const redirectUri = Linking.createURL('/')

        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri)

        if(!response) throw new Error("failed to login");
        
        const browserResult = await openAuthSessionAsync (
            response.toString(),
            redirectUri
        )

        if(browserResult.type !== "success") throw new Error("failed to login");
        
        const url = new URL(browserResult.url)

        const secret = url.searchParams.get('secret')?.toString()
        const userId = url.searchParams.get('userId')?.toString()

        if(!secret || !userId)throw new Error("failed to login");

        const session = await account.createSession(userId, secret)

        if(!session) throw new Error("failed to login");
        
        return true;

    }catch (error) {
        console.error(error)
        return false
    }
}

export async function logout() {
    try{
        await account.deleteSession('current')
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getUser() {
    try {
        const response = await account.get()

        if (response.$id) {
            const userAvatar = avatar.getInitials(response.name)

            return {
                ...response,
                avatar: userAvatar.toString()

            }
        }
    } catch (error) {
        console.error(error)
        return null
    }
}