import AsyncStorage from '@react-native-async-storage/async-storage'
import { decksList } from './_DATA';

export const DECK_STORAGE_KEY = "mobileflashcards:decks"

/**
 * @description Get All Decks from AsyncStorage
 * @returns {object} data
 */
export async function getDecks() {
    try{
        const data = await AsyncStorage.getItem(DECK_STORAGE_KEY);
        if(data === null) {
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decksList));
        }
        return data === null ? decksList : JSON.parse(data);
    }
    catch(error){
        console.log("[api.js] -> getDecks -> ",error);
    }
}

/**
 * @description Get specific Deck By title
 * @param {*} title 
 * @returns {object} data
 */
export async function getDeck(title) {
    try{
        const data = await AsyncStorage.getItem(DECK_STORAGE_KEY);
        console.log("[api.js] -> getDeck -> ", JSON.parse(data)[title]);
        return JSON.parse(data)[title];
    }catch(error){
        console.log("[api.js] -> getDeck -> ",error);
    }
}

/**
 * @description Create a new Collections of Questions
 * @param {*} title 
 */
export async function saveDeckTitle(title){
    try{
        await AsyncStorage.mergeItem(
            DECK_STORAGE_KEY,
            JSON.stringify({
                [title]:{
                    title,
                    questions: []
                }
            })
        );
    }catch(error){
        console.log("[api.js] -> saveDeckTitle -> ", error);
    }
}

/**
 * @description Remove a Deck from asyncStorage
 * @param {*} id 
 */
export async function removeDeckFromStorage(id) {
    try{
        const decksData = await AsyncStorage.getItem(DECK_STORAGE_KEY);
        const decksList = JSON.parse(decksData);
        decksList[id] = undefined;
        delete decksList[id];
        await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decksList));
    }catch(error){
        console.log("[api.js] -> removeDeckFromStroage -> ", error);
    }
}

/**
 * @description Add the cart into the Deck
 * @param {*} title is Deck Name
 * @param {*} card  is question with answer
 */
export async function addCardToDeck(title, card){
    try{
        const deck = await getDeck(title);
        await AsyncStorage.mergeItem(
            DECK_STORAGE_KEY,
            JSON.stringify({
                [title]:{
                    questions: [...deck.questions].concat(card)
                }
            })
        );
    }catch(error){
        console.log("[api.js] -> addCartToDeck -> ", error);
    }
}

/**
 * @description Reset All data into origin
 */
export async function resetDecks(){
    try{
        await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decksList));
    }catch(error){
        console.log("[api.js] -> resetDecks -> ", error);
    }
}