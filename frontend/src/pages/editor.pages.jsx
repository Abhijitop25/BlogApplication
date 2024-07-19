import React, { createContext, useContext, useState } from 'react'
import { UserContext } from '../App'

import { Navigate } from 'react-router-dom'
import BlogEditor from '../components/blog-editor.component';
import PublishForm from '../components/publish-form.component';

export const EditorContext = createContext({ })

const EditorPage = () => {

    const blogStructure = {
        title: "",
        banner: "",
        content: [],
        tags: [],
        description: "",
        author: { personl_info: { } }
    }

    const [editorState, setEditorState] = useState("editor");
    const [blog, setBlog] = useState(blogStructure);
    const [textEditor, setTextEditor] = useState({ isReady: false })
    const [bannerFile, setBannerFile] = useState(null);
    const { userAuth: { access_token } } = useContext(UserContext)
    
  return (
    <EditorContext.Provider value={{blog, setBlog, editorState, setEditorState, textEditor, setTextEditor, bannerFile, setBannerFile}}>
        {
            access_token === null ?
            <Navigate to='/signin' />
            :
            editorState === "editor" ?
            <BlogEditor />
            :
            <PublishForm />
        }
    </EditorContext.Provider>
  )
}

export default EditorPage