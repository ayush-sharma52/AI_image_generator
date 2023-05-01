import {surpriseMePrompts }from '../constants/index'
import fileSaver from "file-saver";

export const getRandomPrompt=(prompt)=>{
const randomPromptIndex=Math.floor(
    Math.random()*surpriseMePrompts.length);
const randomPrompt=surpriseMePrompts[randomPromptIndex];

if(randomPrompt===prompt)
return getRandomPrompt(prompt);

return randomPrompt
};

export async function downloadImage({_id,photo}) {

    fileSaver.saveAs(photo,`download-${_id}.jpg`);

}
