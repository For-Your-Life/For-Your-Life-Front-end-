import React, { useEffect, useState } from 'react';
import Button from '../button/button';
// import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// convertToRaw: editorState 객체가 주어지면 원시 JS 구조로 변환.
import { EditorState, convertToRaw, ContentState } from 'draft-js';
// convertToRaw로 변환시켜준 원시 JS 구조를 HTML로 변환.
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false },
);
const htmlToDraft =
  typeof window === 'object' && require('html-to-draftjs').default;
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const TextEditor = ({ content, update, newPost }) => {
  const htmlToEditor = content ? content : `<p></p>`;
  // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const router = useRouter();
  const onEditorStateChange = editorState => {
    // editorState에 값 설정
    setEditorState(editorState);
  };
  const editorToHtml = draftToHtml(
    convertToRaw(editorState.getCurrentContent()),
  );

  useEffect(() => {
    const blocksFromHtml = htmlToDraft(htmlToEditor);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap,
      );
      // ContentState를 EditorState기반으로 새 개체를 반환.
      // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
    // 처음 마운트됬을 때만 실행되야 된다.
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <Editor
        // 에디터와 툴바 모두에 적용되는 클래스
        wrapperClassName="wrapper-class"
        // 에디터 주변에 적용된 클래스
        editorClassName="editor"
        // 툴바 주위에 적용된 클래스
        toolbarClassName="toolbar-class"
        // 툴바 설정
        toolbar={{
          options: [
            'blockType',
            'fontSize',
            'textAlign',
            'colorPicker',
            'link',
            'embedded',
            'emoji',
            'image',
            'remove',
            'history',
          ],
          // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
          history: { inDropdown: false },
        }}
        placeholder="내용을 작성해주세요."
        // 한국어 설정
        localization={{
          locale: 'ko',
        }}
        // 초기값 설정
        editorState={editorState}
        // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
        onEditorStateChange={onEditorStateChange}
      />
      <div className="update">
        <Button
          text={`취소`}
          size={`18px`}
          width={`auto`}
          margin={`2rem`}
          backgroundColor={`#70d0dd`}
          fontColor={`white`}
          onClick={() => router.push('/inquiry')}
        />
        <Button
          text={`완료`}
          size={`18px`}
          width={`auto`}
          margin={`2rem`}
          backgroundColor={`#70d0dd`}
          fontColor={`white`}
          onClick={() => {
            return update ? update(editorToHtml) : newPost(editorToHtml);
          }}
        />
      </div>

      <style jsx>
        {`
          .container {
            height: auto;
            overflow-y: scroll;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          .update {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
};

export default TextEditor;
