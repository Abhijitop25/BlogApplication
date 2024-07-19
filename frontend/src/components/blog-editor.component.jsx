import React, { useContext, useEffect } from 'react'
import logo from '../imgs/logo.png'
import pic from '../imgs/blog banner.png'
import { useState } from 'react'
import { EditorContext } from '../pages/editor.pages'
import EditorJS from '@editorjs/editorjs'
import { tools } from './tools.component.jsx'
import {toast, Toaster} from 'react-hot-toast'

const BlogEditor = () => {

    useEffect(() => {
        setTextEditor(new EditorJS({
            holderId: 'textEditor',
            data: content,
            tools: tools,
            placeholder: 'Your Story Here'
        }))
    },[])

    
    
    const {blog,  blog: {title, banner, content, tags, des}, setBlog, editorState, setEditorState, textEditor, setTextEditor, setBannerFile} = useContext(EditorContext)

    
    
    const handlePublishEvent = async () => {
        if(!banner.length){
            return toast.error("Upload a Banner")
        }
        if(!title.length){
            return toast.error("Write a Title for Blog")
        }

        if(textEditor.isReady){
            const data = await textEditor.save();
            if(data.blocks.length){
                setBlog({...blog, content: data});
                setEditorState("publish")
            }
            else{
                toast.error("Write Somthing in the Editor")
            }
        }
        
    }
    
    const handleBannerUpload = (e) => {
        const img = e.target.files[0];
        if (img) {
            const imgUrl = URL.createObjectURL(img);
            setBlog({...blog, banner: imgUrl})
            setBannerFile(img);
        }
    }
  return (
    <>
        <Toaster />
        <nav className="navbar">

        <img src={logo} className='flex-none w-10 h-10' />
        <div className='text-2xl line-clamp-1 w-full'>
            {title.length ? title : "New Blog"}
        </div>
        <div className="flex gap-4 ml-auto">
            <button onClick={handlePublishEvent} className='btn-dark'>
                Publish
            </button>
            <button className='btn-light'>
                Save Draft
            </button>

        </div>
        
        </nav>

         <section>
            <div className='mx-auto max-w-[900px] w-full '>
                <div className='relative hover:opacity-80 hover:transition-[2s] aspect-video bg-black border-4 border-grey'>
                    <label htmlFor='uploadBanner'>
                        <img src={banner.length ? banner : pic} className='z-20'/>
                        <input 
                            id='uploadBanner'
                            type="file" 
                            accept='.png, .jpg, .jpeg'
                            hidden
                            onChange={handleBannerUpload}
                        />
                    </label>
                </div>

                <textarea name="blog-title" placeholder='Blog Title' value={title} onChange={(e) => setBlog({...blog, title: e.target.value})} className="text-4xl font-medium w-full h-40 outline-none mt-8">

                </textarea>

                <div id='textEditor' className='font-gelasio border-2 border-grey'>

                </div>
            </div>
         </section>
    </>
  )
}

export default BlogEditor