
import React from 'react'
import PropTypes from 'prop-types'
import 'react-table/react-table.css'
import { Editor } from 'slate-react'
import PasteLinkify from 'slate-paste-linkify'
import { Value } from 'slate'
import { isKeyHotkey } from 'is-hotkey'
import Button from 'material-ui/Button';
import { FormatBold, FormatItalic, Code, FormatSize,FormatUnderlined,
  FormatQuote, FormatListNumbered, FormatListBulleted,LooksTwo,LooksOne} from 'material-ui-icons'
const DEFAULT_NODE = 'paragraph'

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')


class DocBody extends React.Component {

  state = {
    value: this.props.doc.body,
  }
  plugins = [
    PasteLinkify({
      type: 'link',
      hrefProperty: 'url',
      collapseTo: 'end'
    })]

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type == type)
  }

  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type == type)
  }


  onChange = ({ value }) => {
    this.setState({ value })
    let v={target:{value:value}}
    this.props.onChange(v,this.props.doc,'body')
  }


  onKeyDown = (event, change) => {
    let mark

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      return
    }

    event.preventDefault()
    change.toggleMark(mark)
    return true
  }

  onClickMark = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().toggleMark(type)
    this.onChange(change)
  }

  onClickBlock = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change()
    const { document } = value

    // Handle everything but list buttons.
    if (type != 'bulleted-list' && type != 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        change
          .setBlock(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        change.setBlock(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type == type)
      })

      if (isList && isType) {
        change
          .setBlock(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        change
          .unwrapBlock(
            type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        change.setBlock('list-item').wrapBlock(type)
      }
    }

    this.onChange(change)
  }

  render() {
    return (
      <div>
        {this.renderToolbar()}
        {this.renderEditor()}
      </div>
    )
  }

  renderToolbar = () => {
    return (
      <div className="menu toolbar-menu">
        {this.renderMarkButton('bold',<FormatBold />)}
        {this.renderMarkButton('italic',<FormatItalic />)}
        {this.renderMarkButton('underlined',<FormatUnderlined />)}
        {this.renderMarkButton('code',<Code />)}
        {this.renderBlockButton('heading-one',<LooksOne />)}
        {this.renderBlockButton('heading-two',<LooksTwo />)}
        {this.renderBlockButton('block-quote',<FormatQuote />)}
        {this.renderBlockButton('numbered-list',<FormatListNumbered />)}
        {this.renderBlockButton('bulleted-list',<FormatListBulleted />)}
      </div>
    )
  }

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)
    const onClick = event => this.onClickMark(event, type)

    return (
    // eslint-disable-next-line react/jsx-no-bind
      <Button onClick={onClick}>
        {icon}
      </Button>
    )
  }

  renderBlockButton = (type, icon) => {
    const isActive = this.hasBlock(type)
    const onClick = event => this.onClickBlock(event, type)

    return (
    // eslint-disable-next-line react/jsx-no-bind
      <Button onClick={onClick}>
        {icon}
      </Button>
    )
  }

  renderEditor = () => {
    return (
      <div className="editor">
        <Editor
          placeholder="Enter some rich text..."
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          plugins={this.plugins}
          spellCheck
        />
      </div>
    )
  }

  renderNode = props => {
    const { attributes, children, node } = props
    switch (node.type) {
      case 'link':
        return <a {...attributes} href={node.data.get('url')}>{children}</a>
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
    }
  }

  renderMark = props => {
    const { children, mark } = props
    switch (mark.type) {
      case 'bold':
        return <strong>{children}</strong>
      case 'code':
        return <code>{children}</code>
      case 'italic':
        return <em>{children}</em>
      case 'underlined':
        return <u>{children}</u>
    }
  }
}

DocBody.propTypes={
  doc: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
export default DocBody;
