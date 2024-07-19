import React, { useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { EditorContext } from '../pages/editor.pages'
import Tag from './tags.component.jsx';
import axios from 'axios';
import { UserContext } from '../App.jsx';
import { useNavigate } from 'react-router-dom';

const PublishForm = () => {
    let charecterLimit = 200;
    let tagLimit = 10;

    const navigate = useNavigate();

    const {blog, blog: {banner, title, description, tags, content}, setEditorState, setBlog, bannerFile } = useContext(EditorContext);

    const { userAuth: { access_token } } = useContext(UserContext)

    const handleCross = () => {
        setEditorState("editor");
    }

    const handleBlogTitleChange = (e) => {
        setBlog({...blog, title: e.target.value});
    }

    const handleDescriptionChange = (e) => {
        setBlog({...blog, description:e.target.value})
    }

    const handleAddTag = (e) => {
        if(e.keyCode == 13 || e.keyCode == 188){
            e.preventDefault();

            const tag = e.target.value;

            if(!tag.length){
                return toast.error("Please write a tag to add it");
            }

            if(tags.length < tagLimit){
                if(!tags.includes(tag)){
                    setBlog({ ...blog, tags: [ ...tags, tag ] })
                }
            }
            else{
                toast.error(`You can add at max ${tagLimit} tags`)
            }
            e.target.value = "";
        }
    }
    const publishBlog = async (e) => {
        e.preventDefault();

        if(e.target.className.includes("disable")){
            return;
        }

        if(!title.length){
            return toast.error("Write title to publish")
        }

        if(!description.length || description.length>charecterLimit){
            return toast.error("Write description between 1 to 200 letters")
        }

        if(!tags.length){
            return toast.error("Wrute atleast one tag")
        }

        const loadingToast = toast.loading("Publishing...")
        e.target.classList.add('disable');
        
        

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content.blocks);
        formData.append('banner', bannerFile);
        formData.append('tags', tags);
        formData.append('description', description); 


        

        try{
            const result = await axios.post('http://localhost:7000/blog-post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access_token}`
            }
            
            })
            
            toast.success("blog published");

            setTimeout(() => {
                navigate("/");
            },500)

        } catch ({ response }){
            toast.dismiss(loadingToast);
            toast.error(response);
        }
        e.target.classList.remove('disable');
        
    }

  return (
   <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-10">
                <Toaster />
                <button className="absolute right-[5%] top-[5%]" onClick={handleCross}>
                    <i className="text-xl fi fi-br-cross-small"></i>
                </button>

                <div className='max-w-[550px] mx-auto'>
                    <p className="text-dark-grey text-center text-4xl mb-1">Preview</p>
                    <div className="w-full aspect-video rounded-lg overflow-hidden mt-4">
                        <img src={banner} alt="Banner" className="w-full h-full object-cover" />
                    </div>

                    <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
                        {title}
                    </h1>
                    <p className='font-gelasio text-xl leading-7 mt-4 break-words'>
                        {description}
                    </p>
                </div>

                <div className="mt-4">
                    <p className='text-dark-grey text-2xl mb-2 mt-9'>Blog Title</p>
                    <input
                        type='text'
                        placeholder='Blog Title'
                        defaultValue={title}
                        className='input-box pl-4 w-full'
                        onChange={handleBlogTitleChange}
                    />
                    <p className='text-dark-grey text-2xl mb-2 mt-9'>Short description about your blog</p>
                    <textarea
                        maxLength={charecterLimit}
                        defaultValue={description}
                        className='h-40 resize-none leading-7 input-box pl-4 w-full'
                        onChange={handleDescriptionChange}
                    />

                    <p className="mt-1 text-dark-grey text-right">{charecterLimit - description.length} characters left</p>

                    <p className='mt-9 mb-2 text-dark-grey text-2xl'>Related Topics</p>
                    <div className="relative input-box pl-2 py-2 pb-4">
                        <input 
                            type='text'
                            placeholder='Write Topics'
                            className='sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white w-full'
                            onKeyDown={handleAddTag}
                        />
                        {tags.map((tag, i) => (
                            <Tag tag={tag} key={i} />
                        ))}
                    </div>

                    <button onClick={publishBlog} className="btn-dark px-8 mt-6 w-full lg:w-auto">Publish</button>
                </div>
            </section>
        </div>
  )
}

export default PublishForm