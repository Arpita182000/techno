import { Box, Card, Grid, TextField, Typography } from '@mui/material'
import JoditEditor from 'jodit-react'
// import 'jodit/build/jodit.min.css';
import './campign.style.css'

import React, { useMemo, useRef, useState } from 'react'
import CustomInput from '../common/fields/CustomInput';

const TextEditor = ({editorSubject, 
  setEditorSubject, 
  editorContent,setEditorImage, setEditorContent,editorImage, handleEditorSubject}: any) => {
  console.log("calling editorContent", editorContent);
  
  const [data, setData] = useState(editorContent ?? "");
  const buttons = [
    "undo",
    "redo",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "superscript",
    "subscript",
    "|",
    "align",
    "|",
    "ul",
    "ol",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "link",
    "table",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "fullsize",
    "selectall",
    "print",
    "|",
    "source",
    "|",

    {
      name: "copyContent",
      tooltip: "Copy HTML to Clipboard",
      iconURL: "images/copy.png",
      exec: function (editor: any) {
        let html = editor.value;
        // copyStringToClipboard(html);
      },
    },
  ];

  const editorConfig = useMemo(() => {
    return {
      readonly: false,
      toolbar: true,
      spellcheck: true,
      language: "en",
      toolbarButtonSize: "medium",
      toolbarAdaptive: false,
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      askBeforePasteHTML: true,
      askBeforePasteFromWord: true,
      //defaultActionOnPaste: "insert_clear_html",
      buttons: buttons,
      uploader: {
        insertImageAsBase64URI: true,
      },
      width: 800,
      height: 842,
    };
  }, [])

  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={4}>
        <Card variant="outlined" sx={{ height: '80vh', borderRadius: '1rem', }}>
        <img  src={editorImage}/>
        </Card>

      </Grid>
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Subject</Typography>
            <TextField fullWidth variant='outlined' size='small' value={editorSubject} 
            onChange={(e: any) => setEditorSubject(e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Body
            </Typography>
            <JoditEditor
              value={data}
              config={editorConfig}
              onChange={(value: any) => setEditorContent(value)} // {data.current = value}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* <button onClick={() => console.log(data)}>submit</button> */}
    </Grid>
  )
}

export default TextEditor;