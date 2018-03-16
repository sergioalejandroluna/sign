import React from 'react'

const renderTableButton = (type, icon) => {
  const onClick = event => this.onClickTable(event, type)
  return this.renderButton(onClick,icon)
}


const renderMarkButton = (type, icon) => {
  // const isActive = this.hasMark(type)
  const onClick = event => this.onClickMark(event, type)
  return this.renderButton(onClick,icon)
}

const renderBlockButton = (type, icon) => {
  // const isActive = this.hasBlock(type)
  const onClick = event => this.onClickBlock(event, type)
  return this.renderButton(onClick,icon)
}
const renderButton = (onClick, icon) => {
  return (
    <IconButton onMouseDown={onClick} >
      {icon}
    </IconButton>
  )
}

const DocBodyToolBar=({isInTable})=>{
  const isInEditor=document.activeElement.dataset.slateEditor==='true'
  return (
    <Snackbar open={isInEditor} >
      <Paper>
        {isInTable ? (<Grid container direction='row'  >
          {renderTableButton('insert-row',<AddRow />)}
          {renderTableButton('insert-column',<AddColumn />)}
          {renderTableButton('remove-column',<RemoveTable />)}
          {renderTableButton('remove-row',<RemoveTable />)}
          {renderTableButton('remove-table',<RemoveTable />)}
        </Grid>) : null}
        <Grid container  direction='row'  >
          {renderMarkButton('bold',<FormatBold />)}
          {renderMarkButton('italic',<FormatItalic />)}
          {renderMarkButton('underlined',<FormatUnderlined />)}
          {renderMarkButton('code',<Code />)}
          {renderBlockButton('link',<InsertLink />)}
          {renderBlockButton('block-quote',<FormatQuote />)}
          {renderTableButton('insert-table',<AddTable />)}
          {renderBlockButton('numbered-list',<FormatListNumbered />)}
          {renderBlockButton('bulleted-list',<FormatListBulleted />)}
        </Grid>
      </Paper>
    </Snackbar>
  )
}
