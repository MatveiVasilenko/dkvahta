import React from 'react'
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CK = ({
    title,
    placeholder,
    classes,
    dataItem,
    setDataItem,
    attribute
}) => {
    console.log(dataItem[attribute])

    return (
        <div>
        {/* <h2>{title}</h2>
        <CKEditor
            value={dataItem[attribute]}
            editor={ ClassicEditor }
            data={placeholder}
            config ={{
                // plugins: [ HtmlEmbed ],
                // toolbar: [ 'htmlEmbed']
            }}
            onReady={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log( 'Editor is ready to use!', editor );
            } }
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                setDataItem({
                    ...dataItem,
                    [attribute]: data
                })
            } }
        /> */}
    </div>
    )
}
export default CK