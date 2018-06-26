import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import { Hidden } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import withStyles from '@material-ui/core/styles/withStyles'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    height: 40,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.secondary.main + '8c',
  },
  iconButton: {
    opacity: 1,
    height: 40,
    width: 40,
    transform: 'scale(1, 1)',
    transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
  },
  iconButtonHidden: {
    transform: 'scale(0, 0)',
    '& > $icon': {
      opacity: 0
    }
  },
  iconButtonDisabled: {
    opacity: 0.38
  },
  searchIconButton: {
    marginRight: -40
  },
  icon: {
    opacity: 1,
    transition: 'opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
  },
  input: {
    width: '100%',
    color: theme.palette.primary.contrastText
  },
  searchContainer: {
    margin: 'auto 16px',
    width: '100%',

  }
})

/**
 * Material design search bar
 * @see [Search patterns](https://material.io/guidelines/patterns/search.html)
 */
class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      focus: true,
      value: this.props.value,
      active: false

    }
  }

  handleFocus = (e) => {
    this.setState({focus: true})
    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  handleBlur = (e) => {
    this.setState({focus: false})
    if (this.state.value.trim().length === 0) {
      this.setState({value: ''})
    }
    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  handleInput = (e) => {
    this.setState({value: e.target.value})
    if (this.props.onChange) {
    }
  }

  handleCancel = () => {
    this.setState({active: false, value: ''})
    this.props.onChange && this.props.onChange('')
  }

  handleKeyUp = (e) => {
    if (e.charCode === 13 || e.key === 'Enter') {

      this.props.history.push(`/busqueda?q=${this.state.value}`)
    }
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e)
    }
  }

  render () {
    const {value} = this.state
    const {
      classes,
      closeIcon,
      disabled,
      onRequestSearch, // eslint-disable-line
      searchIcon,
      style,
    } = this.props

    if (!this.props.isAuth)
      return null

    return (

      <div>
        <Hidden xsDown>
          <Paper
            className={classes.root}
            style={style}
          >
            <div className={classes.searchContainer}>
              <Input
                onBlur={this.handleBlur}
                value={value}
                onChange={this.handleInput}
                onKeyUp={this.handleKeyUp}
                onFocus={this.handleFocus}
                fullWidth
                className={classes.input}
                disableUnderline
                disabled={disabled}
              />
            </div>

            <IconButton
              classes={{
                root: classNames(classes.iconButton, classes.searchIconButton, {
                  [classes.iconButtonHidden]: value !== ''
                }),
                disabled: classes.iconButtonDisabled
              }}
              disabled={disabled}
            >
              {React.cloneElement(searchIcon, {
                classes: {root: classes.icon}
              })}
            </IconButton>
            <IconButton
              onClick={this.handleCancel}
              classes={{
                root: classNames(classes.iconButton, {
                  [classes.iconButtonHidden]: value === ''
                }),
                disabled: classes.iconButtonDisabled
              }}
              disabled={disabled}
            >
              {React.cloneElement(closeIcon, {
                classes: {root: classes.icon}
              })}
            </IconButton>
          </Paper>
        </Hidden>
      </div>
    )
  }
}

SearchBar.defaultProps = {
  closeIcon: <ClearIcon style={{color: '#fff'}}/>,
  disabled: false,
  placeholder: 'Buscar',
  searchIcon: <SearchIcon style={{color: '#fff'}}/>,
  style: null,
  value: ''
}

SearchBar.propTypes = {
  /** Override or extend the styles applied to the component. */
  classes: PropTypes.object.isRequired,
  /** Override the close icon. */
  closeIcon: PropTypes.node,
  /** Disables text field. */
  disabled: PropTypes.bool,
  /** Sets placeholder for the embedded text field. */
  placeholder: PropTypes.string,
  /** Fired when the text value changes. */
  onChange: PropTypes.func,
  /** Fired when the search icon is clicked. */
  onRequestSearch: PropTypes.func.isRequired,
  /** Override the search icon. */
  searchIcon: PropTypes.node,
  /** Override the inline-styles of the root element. */
  style: PropTypes.object,
  /** The value of the text field. */
  value: PropTypes.string
}

export default withStyles(styles)(withRouter(SearchBar))