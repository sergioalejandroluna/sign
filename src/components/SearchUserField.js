import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {
  MenuItem,
  InputAdornment,
  ListItemText,
  Avatar
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { debounce, find } from "lodash";
import UserStore from "../stores/UserStore";

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input
        },
        ...other
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const fullName = suggestion.name.full;
  const matches = match(fullName, query);
  const parts = parse(fullName, matches);

  return (
    //if there is no photo the assumtion  is a group, when is a user the server MUST return an url
    <MenuItem selected={isHighlighted} component="div">
      {suggestion.photo ? (
        <Avatar src={suggestion.photo} alt="photo" />
      ) : (
        <Avatar>GP</Avatar>
      )}
      <ListItemText
        primary={parts.map((part, i) => {
          return part.highlight ? (
            <span key={String(i)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(i)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
        secondary={suggestion.email}
      />
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(guy) {
  return guy.name.full;
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  adornment: {
    whiteSpace: "nowrap"
  }
});

class SearchUserField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.to.name.full,
      suggestions: []
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.to !== this.props.to)
      this.setState({ value: this.props.to.name.full });
  }

  handleSuggestionsFetchRequested = debounce(({ value }) => {
    UserStore.search(value, this.props.includeGroups).then(r => {
      this.setState({
        suggestions: r.data
      });
    });
  }, 500);

  onBlur = () => {
    let full = find(this.state.psugges, { name: { full: this.state.value } });
    if (full === undefined) {
      full = find(this.state.suggestions, { name: { full: this.state.value } });
      if (full === undefined) this.setState({ value: "" });
    }
  };

  handleSuggestionsClearRequested = () => {
    this.setState(prev => {
      prev.psugges = prev.suggestions;
      prev.suggestions = [];
      return prev;
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  changeId = (event, { suggestion }) => {
    this.setState({
      id: suggestion.id,
      title: suggestion.name.title
    });
    this.props.onChange(suggestion);
  };

  render() {
    const { classes, to } = this.props;
    to.email = to.email || "";

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={this.changeId}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          placeholder: "Buscar Usuario",
          value: this.state.value,
          onChange: this.handleChange,
          onBlur: this.onBlur,
          disabled: this.props.disabled,
          startAdornment: (
            <InputAdornment
              classes={{ root: classes.adornment }}
              position="start"
            >
              <b>{this.props.to.name.title}</b>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              classes={{ root: classes.adornment }}
              position="end"
            >
              {this.props.to.email}
            </InputAdornment>
          )
        }}
      />
    );
  }
}
SearchUserField.defaultProps = { includeGroups: false };

SearchUserField.propTypes = {
  to: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  includeGroups: PropTypes.bool.isRequired
};

export default withStyles(styles)(SearchUserField);
