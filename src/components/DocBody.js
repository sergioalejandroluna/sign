import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'slate-react'
import PasteLinkify from 'slate-paste-linkify'
import PluginEditTable from 'slate-deep-table'
import { isKeyHotkey } from 'is-hotkey'
import { Grid, Button, withStyles, Paper  } from 'material-ui';
import { FormatBold, FormatItalic, Code,FormatUnderlined,
  FormatQuote, FormatListNumbered, 
  FormatListBulleted,InsertLink, GridOn,
  } from 'material-ui-icons'
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
  },
  actions:{
  }
})

function wrapLink(change, href) {
  change.wrapInline({
    type: 'link',
    data: { href },
  })

  change.collapseToEnd()
}

function unwrapLink(change) {
  change.unwrapInline('link')
}
const tablePlugin = PluginEditTable();

class DocBody extends React.Component {

  constructor(props){
    super(props)
    let val= props.doc.body;
    if (!(val instanceof Value))
      val=Value.fromJSON(props.doc.body)
    this.state = {
      value: val,
      showToolbar:false
    }
    this.plugins = [
      PasteLinkify({
        type: 'link',
        hrefProperty: 'href',
        collapseTo: 'end'
      }), tablePlugin]

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
    this.setState({showToolbar:true})

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

  hasLinks = () => {
    const { value } = this.state
    return value.inlines.some(inline => inline.type === 'link')
  }

  onClickMark = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().toggleMark(type)
    this.onChange(change)
  }


  // TODO change the prompt for a proper material component
  onClickLink = event => {
    const { value } = this.state
    const hasLinks = this.hasLinks()
    const change = value.change()

    if (hasLinks) {
      change.call(unwrapLink)
    } else if (value.isExpanded) {
      const href = window.prompt('Enter the URL of the link:')
      change.call(wrapLink, href)
    } else {
      const href = window.prompt('Enter the URL of the link:')
      const text = window.prompt('Enter the text for the link:')
      change
        .insertText(text)
        .extend(0 - text.length)
        .call(wrapLink, href)
    }

    this.onChange(change)
  }

  onClickBlock = (event, type) => {
    event.preventDefault()

    if(type==='link'){
      this.onClickLink(event)
    }else{
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
    const { value } = this.state;
    const isInTable = tablePlugin.utils.isSelectionInTable(value);
    // const isInEditor=document.activeElement.dataset.slateEditor==='true'
    const isInEditor=true
    if (!isInEditor)
      return null
    return (
      <Paper classes={styles.actions} >
        {isInTable ? (<Grid container justify="center" direction='row'  >
          {this.renderTableButton('insert-row','insertar fila')}
          {this.renderTableButton('insert-column','Insertar columna')}
          {this.renderTableButton('remove-column','Borrar columna')}
          {this.renderTableButton('remove-row','Borrar fila')}
          {this.renderTableButton('remove-table','Borrar tabla')}
        </Grid>) : null}
        <Grid container justify="center" direction='row'  >
          {this.renderMarkButton('bold',<FormatBold />)}
          {this.renderMarkButton('italic',<FormatItalic />)}
          {this.renderMarkButton('underlined',<FormatUnderlined />)}
          {this.renderMarkButton('code',<Code />)}
          {this.renderBlockButton('link',<InsertLink />)}
          {this.renderBlockButton('block-quote',<FormatQuote />)}
          {this.renderTableButton('insert-table',<GridOn />)}
          {this.renderBlockButton('numbered-list',<FormatListNumbered />)}
          {this.renderBlockButton('bulleted-list',<FormatListBulleted />)}
        </Grid>
      </Paper>
    )
  }
  renderTableButton = (type, icon) => {
    const onClick = event => this.onClickTable(event, type)
    return this.renderButton(onClick,icon)
  }


  renderMarkButton = (type, icon) => {
    // const isActive = this.hasMark(type)
    const onClick = event => this.onClickMark(event, type)
    return this.renderButton(onClick,icon)
  }

  renderBlockButton = (type, icon) => {
    // const isActive = this.hasBlock(type)
    const onClick = event => this.onClickBlock(event, type)
    return this.renderButton(onClick,icon)
  }
  renderButton = (onClick, icon) => {
    return (
    // eslint-disable-next-line react/jsx-no-bind
      <Grid item lg={1}>
        <Button onMouseDown={onClick} >
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
    let textAlign;
    switch (node.type) {
      case 'link':
        return <a {...attributes} href={node.data.get('href')}>{children}</a>
      case 'block-quote':
        return <blockquote {...attributes}>"{children}"</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      case 'table':
        return (
          <table className="doc">
            <tbody {...attributes}>{children}</tbody>
          </table>
        );
      case 'table_row':
        return <tr {...attributes}>{children}</tr>;
      case 'table_cell':
        textAlign = node.get('data').get('textAlign');
        textAlign =
          ['left', 'right', 'center'].indexOf(textAlign) === -1
          ? 'left'
          : textAlign;
        return (
          <td style={{ textAlign }} {...attributes}>
            {children}
          </td>
        );
      case 'paragraph':
        return <p {...attributes}>{children}</p>;
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
  onClickTable = (event, type) => {
    event.preventDefault();
    const { value } = this.state
    let change = value.change()
    switch (type) {
      case 'insert-row': 
        change=tablePlugin.changes.insertRow(change)
        break
      case 'insert-column': 
        change=tablePlugin.changes.insertColumn(change)
        break
      case 'remove-column': 
        change=tablePlugin.changes.removeColumn(change)
        break
      case 'remove-row': 
        change=tablePlugin.changes.removeRow(change)
        break
      case 'insert-table': 
        change=tablePlugin.changes.insertTable(change);
        break
      case 'remove-table': 
        change=tablePlugin.changes.removeTable(change);
        break
      default :
        break
    }
    this.onChange(change)
  }

}

DocBody.propTypes={
  doc: PropTypes.object.isRequired,
}
export default withStyles(styles, { withTheme: true })(DocBody);
