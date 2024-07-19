//importing tools

import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'

const uploadImageByFile = (file) => {
    let reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = () => {
            resolve({
                success: 1,
                file: {
                    url: reader.result // This will be the base64 URL of the image
                }
            });
        };

        reader.onerror = (error) => {
            reject({
                success: 0,
                message: error.message
            });
        };

        reader.readAsDataURL(file);
    });
};


const uploadImageByUrl = (e) => {
    let link = new Promise((resolve, reject) => {
        try{
            resolve(e)
        }
        catch(err){
            reject(err)
        }
    })

    return link.then(url => {
        return {
            success: 1,
            file: {url} 
        }
    })
}


export const tools = {
    embed: Embed,
    list: {
        class: List,
        inlineToolbar: true
    },
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByUrl: uploadImageByUrl,
                uploadByFile: uploadImageByFile
            }
        }
    },
    header: {
        class: Header,
        config: {
            placeholder: "Type Heading...",
            levels: [1,2,3],
            defaultLevel: 2
        }
    },
    quote: {
        class: Quote,
        inlineToolbar: true
    },
    marker: Marker,
    inlineCode: InlineCode
}