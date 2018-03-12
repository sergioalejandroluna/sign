
import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'slate-react'
import PasteLinkify from 'slate-paste-linkify'
import { isKeyHotkey } from 'is-hotkey'
import { Grid, Button, withStyles  } from 'material-ui';
import { FormatBold, FormatItalic, Code,FormatUnderlined,
  FormatQuote, FormatListNumbered, FormatListBulleted,LooksTwo,LooksOne} from 'material-ui-icons'
import { Value } from 'slate'

const DEFAULT_NODE = 'paragraph'
const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')
const styles = theme => ({

  root:{
    border: '1px solid '+theme.palette.grey[400],
    marginTop: '20px',
    marginBottom: '20px',
  }
})

class DocBody extends React.Component {

  constructor(props){
    super(props)
    let val= props.doc.body;
    if (!(val instanceof Value))
      val=Value.fromJSON(props.doc.body)
    this.state = {
      value: val,
      id: props.doc.id,
    }
    this.plugins = [
      PasteLinkify({
        type: 'link',
        hrefProperty: 'url',
        collapseTo: 'end'
      })]

  }

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type === type)
  }

  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type === type)
  }


  onChange = ({ value }) => {
    this.setState({ value })
    this.props.onChange('body',value)
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
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
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
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        change
          .setBlock(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        change
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
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
      <Grid container className={this.props.classes.root}  >
        {this.renderEditor()}
        {this.renderToolbar()}
      </Grid>
    )
  }

  renderToolbar = () => {
      return (
        <Grid container justify="center" direction='row'  >
          {this.renderMarkButton('bold',<FormatBold />)}
          {this.renderMarkButton('italic',<FormatItalic />)}
          {this.renderMarkButton('underlined',<FormatUnderlined />)}
          {this.renderMarkButton('code',<Code />)}
          {this.renderBlockButton('heading-one',<LooksOne />)}
          {this.renderBlockButton('heading-two',<LooksTwo />)}
          {this.renderBlockButton('block-quote',<FormatQuote />)}
          {this.renderBlockButton('numbered-list',<FormatListNumbered />)}
          {this.renderBlockButton('bulleted-list',<FormatListBulleted />)}
        </Grid>
      )
  }


  renderMarkButton = (type, icon) => {
    // const isActive = this.hasMark(type)
    const onClick = event => this.onClickMark(event, type)

    return (
    // eslint-disable-next-line react/jsx-no-bind

      <Grid item lg={1}>
        <Button onClick={onClick}>
          {icon}
        </Button>
      </Grid>
    )
  }

  renderBlockButton = (type, icon) => {
    // const isActive = this.hasBlock(type)
    const onClick = event => this.onClickBlock(event, type)

    return (
    // eslint-disable-next-line react/jsx-no-bind
      <Grid item lg={1}>
        <Button onClick={onClick} onFocus={this.onFocus}>
          {icon}
        </Button>
      </Grid>
    )
  }

  renderEditor = () => {
    return (
      <Grid item lg={12}>
        <Editor
          placeholder="Cuerpo del documento"
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          plugins={this.plugins}
        />
      </Grid>
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
      default :
        return null;
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
      default :
        return null;
    }
  }
}

DocBody.propTypes={
  doc: PropTypes.object.isRequired,
}
export default withStyles(styles, { withTheme: true })(DocBody);
