import { Editor } from '@tinymce/tinymce-react';

interface TinyEditorProps {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  content: string;
}

export default function TinyEditor({
  setContent,
  content,
}: TinyEditorProps) {
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
          ) => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append('file', blobInfo.blob(), blobInfo.filename());
              fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
              })
                .then(res => res.json())
                .then(data => {
                  if (data.url) resolve(data.url);
                  else reject('No image url returned');
                })
                .catch(() => reject('Image upload failed'));
            });
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