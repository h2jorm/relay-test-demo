import React, {PropTypes} from 'react'

require('./editor.less')

export default class Editor extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    submit: PropTypes.func.isRequired
  }
  static defaultProps = {
    id: '',
    title: '',
    content: ''
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.submit({
      id: this.props.id,
      title: this.refs.title.value,
      content: this.refs.content.value
    })
    this.refs.title.value = this.refs.content.value = ''
  }
  render() {
    return (
      <div className="component-editor">
        <h2>Editor</h2>
        <form onSubmit={::this.handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="title"
              ref="title"
              defaultValue={this.props.title}
            />
          </div>
          <div>
            <textarea
              placeholder="content"
              ref="content"
              defaultValue={this.props.content}>
            </textarea>
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    )
  }
}
