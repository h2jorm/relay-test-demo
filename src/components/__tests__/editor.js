jest.dontMock('../editor')

import React from 'react'
import {
  isCompositeComponent,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  Simulate
} from 'react-addons-test-utils'
const Editor = require('../editor')

describe('Editor', () => {

  let editor, submitMock
  beforeEach(() => {
    submitMock = jest.genMockFn()
    editor = renderIntoDocument(
      <Editor
        id="4008123123"
        submit={submitMock}
      />
    )
  })
  function clickSubmitBtn() {
    Simulate.submit(
      findRenderedDOMComponentWithTag(editor, 'form')
    )
  }

  it('should have default value of title, content', () => {
    expect(editor.refs.title.value).toBe('')
    expect(editor.refs.content.value).toBe('')
  })
  it('should call submitMock when submitting the form', () => {
    clickSubmitBtn()
    const {title,content} = editor.refs
    expect(submitMock).toBeCalledWith({
      id: '4008123123',
      title: title.value,
      content: content.value,
    })
  })
  it('should clear input and textarea after submition', () => {
    const DUMMY_WORD = 'dummy word'
    const {title, content} = editor.refs
    title.value = content.value = DUMMY_WORD
    clickSubmitBtn()
    expect(title.value).toBe('')
    expect(content.value).toBe('')
  })
  it('should set initial value of refs according to props value', () => {
    const TITLE = 'hello'
    const CONTENT = 'world'
    let editor = renderIntoDocument(
      <Editor
        title={TITLE}
        content={CONTENT}
        submit={submitMock}
      />
    )
    expect(editor.refs.title.value).toBe(TITLE)
    expect(editor.refs.content.value).toBe(CONTENT)
  })

})
