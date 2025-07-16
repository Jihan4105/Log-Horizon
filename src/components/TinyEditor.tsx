"use client"

import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyEditor() {
  const [content, setContent] = useState("")
  
  return (
    <div>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_APIKEY}
        init={{
          plugins: [
            // Core editing features
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
            // Your account includes a free trial of TinyMCE premium feature
          ],
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
         images_upload_handler: async (
            blobInfo: any, 
            success: (url: string) => void,
            failure: (err: string) => void
          ) => {
            try {
              const formData = new FormData();
              formData.append("file", blobInfo.blob(), blobInfo.filename());

              const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData,
              });

              const data = await res.json();

              if (!data.url) {
                throw new Error("Upload failed: Missing URL");
              }

              console.log(window.location.origin, data.url)

              const absoluteUrl = `${window.location.origin}${data.url}`;
              console.log("Image upload success, URL:", absoluteUrl);
              success(absoluteUrl); 
            } catch (error) {
              console.error("Upload error:", error);
              failure("Image upload failed.");
            }
          },
        }}
        initialValue=""
        onEditorChange={newContent => {
          setContent(newContent)
        }}
        value={content}
      />
    </div>
  );
};