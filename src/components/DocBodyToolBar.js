import React from 'react'
import { AddRow,AddTable,AddColumn,
  RemoveColumn,RemoveRow,RemoveTable  } from '../img/'
import { Grid, IconButton, Paper,Snackbar } from 'material-ui';
import { FormatBold, FormatItalic, Code,FormatUnderlined,
  FormatQuote, FormatListNumbered, 
  FormatListBulleted,InsertLink,
} from 'material-ui-icons'
import Tooltip from 'material-ui/Tooltip';

const renderButton = (click, type, icon,help) => {
  const onClick = event => click(event, type)
  return (
    <Tooltip placement="top" title={help} enterDelay={ 100 } >
      <IconButton onMouseDown={onClick} >
        {icon}
      </IconButton>
    </Tooltip>
  )
}

class DocBodyToolBar extends React.Component {


  shouldComponentUpdate(nextProps, nextState) {
    return this.props.isInTable!==nextProps.isInTable || this.props.isInEditor!==nextProps.isInEditor
  }

  render(){
    const {isInTable,  onClickBlock, onClickMark, onClickTable, isInEditor} =this.props
    return (
      <Snackbar open={isInEditor} >
        <Paper>
          {isInTable ? (<Grid container direction='row'  >
            {renderButton(onClickTable,'insert-row',<AddRow />, 'Agregar fila')}
            {renderButton(onClickTable,'insert-column',<AddColumn />, 'Agregar columna')}
            {renderButton(onClickTable,'remove-column',<RemoveColumn />,'Borrar columna')}
            {renderButton(onClickTable,'remove-row',<RemoveRow />,'Borrar fila')}
            {renderButton(onClickTable,'remove-table',<RemoveTable />,'Borrar tabla')}
          </Grid>) : null}
          <Grid container  direction='row'  >
            {renderButton(onClickMark,'bold',<FormatBold />,'Negritas')}
            {renderButton(onClickMark,'italic',<FormatItalic />,'Itálica')}
            {renderButton(onClickMark,'underlined',<FormatUnderlined />,'Subrayado')}
            {renderButton(onClickMark,'code',<Code />,'Código')}
            {renderButton(onClickBlock,'link',<InsertLink />,'Link')}
            {renderButton(onClickBlock,'block-quote',<FormatQuote />,'Citar')}
            {renderButton(onClickTable,'insert-table',<AddTable />,'Agregar tabla')}
            {renderButton(onClickBlock,'numbered-list',<FormatListNumbered />,'Agregar lista')}
            {renderButton(onClickBlock,'bulleted-list',<FormatListBulleted />,'Agregar lista')}
          </Grid>
        </Paper>
      </Snackbar>
    )
  }
}
export default DocBodyToolBar;
