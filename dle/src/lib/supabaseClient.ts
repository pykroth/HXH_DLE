import { PUBLIC_ANON_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(PUBLIC_ANON_URL, PUBLIC_SUPABASE_ANON_KEY);

export async function getRandomCharacterAndUpdate() {
    try {
        // Fetch all characters
        const { data: characters, error } = await supabase.from('Characters').select('*');
        if (error) {
            throw new Error('Error fetching characters: ' + error.message);
        }

        // Select a random character
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomCharacter = characters[randomIndex];

        console.log("Deleting rows from 'random_character' table...");
        const { error: deleteError } = await supabase.from('random_character').delete();
        if (deleteError) {
            throw new Error('Error deleting from random_character table: ' + deleteError.message);
        }

        // Add the random character to the 'random_character' table
        await supabase.from('random_character').upsert({ id: 1, character: randomCharacter });

        return randomCharacter;
    } catch (error) {
        throw new Error('Error generating random character and updating table: ' + error.message);
    }
}
