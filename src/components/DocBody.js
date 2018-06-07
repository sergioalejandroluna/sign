import React from "react";
import PropTypes from "prop-types";
import { Editor } from "slate-react";
import PasteLinkify from "slate-paste-linkify";
import PluginEditTable from "slate-deep-table";
import { isKeyHotkey } from "is-hotkey";
import { Grid, withStyles } from "@material-ui/core";
import { Value } from "slate";
import DocBodyToolBar from "./DocBodyToolBar";
import AttachThings from "./AttachThings";
const DEFAULT_NODE = "paragraph";
const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");
const isCodeHotkey = isKeyHotkey("mod+`");
const styles = theme => ({
  root: {
    border: "1px solid " + theme.palette.grey[400],
    marginTop: "20px",
    marginBottom: "20px",
    padding: 12
  },
  menu: {
    position: "fixed",
    bottom: "0px",
    marginRight: "auto",
    width: "422px",
    left: 0,
    right: 0,
    marginLeft: "auto"
  }
});

function wrapLink(change, href) {
  change.wrapInline({
    type: "link",
    data: { href }
  });
  change.collapseToEnd();
}

function unwrapLink(change) {
  change.unwrapInline("link");
}
const tablePlugin = PluginEditTable();

class DocBody extends React.Component {
  constructor(props) {
    super(props);
    let val = props.body;
    if (!(val instanceof Value)) val = Value.fromJSON(props.body);
    this.state = {
      value: val,
      showToolbar: false,
      openUpload: false
    };
    this.plugins = [
      PasteLinkify({
        type: "link",
        hrefProperty: "href",
        collapseTo: "end"
      }),
      tablePlugin
    ];
  }

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };

  //slatejs triggers a change event in the first render, we don't want that
  // sadly i wasn't  able to find an api to avoid that
  mods = 0;
  onChange = ({ value }) => {
    this.setState({ value });

    if (!this.props.disabled && this.mods > 0) this.props.onChange(value);
    this.mods++;
    const valid = value.document.text.length > 50;
    this.props.isValid(valid);
  };

  onKeyDown = (event, change) => {
    let mark;
    this.setState({ showToolbar: true });

    if (isBoldHotkey(event)) {
      mark = "bold";
    } else if (isItalicHotkey(event)) {
      mark = "italic";
    } else if (isUnderlinedHotkey(event)) {
      mark = "underlined";
    } else if (isCodeHotkey(event)) {
      mark = "code";
    } else {
      return;
    }

    event.preventDefault();
    change.toggleMark(mark);
    return true;
  };

  hasLinks = () => {
    const { value } = this.state;
    return value.inlines.some(inline => inline.type === "link");
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  };

  // TODO change the prompt for a proper material component
  onClickLink = event => {
    const { value } = this.state;
    const hasLinks = this.hasLinks();
    const change = value.change();

    if (hasLinks) {
      change.call(unwrapLink);
    } else if (value.isExpanded) {
      const href = window.prompt("Enter the URL of the link:");
      change.call(wrapLink, href);
    } else {
      const href = window.prompt("Enter the URL of the link:");
      const text = window.prompt("Enter the text for the link:");
      if (text !== "")
        change
          .insertText(text)
          .extend(0 - text.length)
          .call(wrapLink, href);
    }

    this.onChange(change);
  };

  onClickBlock = (event, type) => {
    event.preventDefault();

    if (type === "link") {
      this.onClickLink(event);
    } else {
      const { value } = this.state;
      const change = value.change();
      const { document } = value;
      // Handle everything but list buttons.
      if (type !== "bulleted-list" && type !== "numbered-list") {
        const isActive = this.hasBlock(type);
        const isList = this.hasBlock("list-item");

        if (isList) {
          change
            .setBlock(isActive ? DEFAULT_NODE : type)
            .unwrapBlock("bulleted-list")
            .unwrapBlock("numbered-list");
        } else {
          change.setBlock(isActive ? DEFAULT_NODE : type);
        }
      } else {
        // Handle the extra wrapping required for list buttons.
        const isList = this.hasBlock("list-item");
        const isType = value.blocks.some(block => {
          return !!document.getClosest(
            block.key,
            parent => parent.type === type
          );
        });

        if (isList && isType) {
          change
            .setBlock(DEFAULT_NODE)
            .unwrapBlock("bulleted-list")
            .unwrapBlock("numbered-list");
        } else if (isList) {
          change
            .unwrapBlock(
              type === "bulleted-list" ? "numbered-list" : "bulleted-list"
            )
            .wrapBlock(type);
        } else {
          change.setBlock("list-item").wrapBlock(type);
        }
      }
      this.onChange(change);
    }
  };

  toggleUpload = (e, t) => {
    this.setState(ps => {
      return { ...ps, openUpload: !ps.openUpload };
    });
  };

  render() {
    const { value, openUpload } = this.state;
    const isInTable = tablePlugin.utils.isSelectionInTable(value);
    const isInEditor = document.activeElement.dataset.slateEditor === "true";
    const { classes, disabled, onFileUpload, files } = this.props;
    return (
      <Grid item lg={12} className={classes.root}>
        <DocBodyToolBar
          onClickBlock={this.onClickBlock}
          onClickMark={this.onClickMark}
          onClickTable={this.onClickTable}
          isInTable={isInTable}
          isInEditor={isInEditor}
          onUpload={this.toggleUpload}
        />
        <Editor
          placeholder="Cuerpo del documento"
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          plugins={this.plugins}
          readOnly={disabled}
        />
        <AttachThings
          open={openUpload}
          onClose={this.toggleUpload}
          onChange={onFileUpload}
          files={files}
          onDelete={this.props.onDeleteFile}
          readOnly={disabled}
        />
      </Grid>
    );
  }

  renderNode = props => {
    const { attributes, children, node } = props;
    switch (node.type) {
      case "link":
        return (
          <a {...attributes} href={node.data.get("href")}>
            {children}
          </a>
        );
      case "block-quote":
        return <blockquote {...attributes}>"{children}"</blockquote>;
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "numbered-list":
        return <ol {...attributes}>{children}</ol>;
      case "table":
        return (
          <table className="doc">
            <tbody {...attributes}>{children}</tbody>
          </table>
        );
      case "table_row":
        return <tr {...attributes}>{children}</tr>;
      case "table_cell":
        return <td {...attributes}>{children}</td>;
      case "paragraph":
        return <p {...attributes}>{children}</p>;
      default:
        return null;
    }
  };

  renderMark = props => {
    const { children, mark } = props;
    switch (mark.type) {
      case "bold":
        return <strong>{children}</strong>;
      case "code":
        return <code>{children}</code>;
      case "italic":
        return <em>{children}</em>;
      case "underlined":
        return <u>{children}</u>;
      default:
        return null;
    }
  };

  onClickTable = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    let change = value.change();
    switch (type) {
      case "insert-row":
        change = tablePlugin.changes.insertRow(change);
        break;
      case "insert-column":
        change = tablePlugin.changes.insertColumn(change);
        break;
      case "remove-column":
        change = tablePlugin.changes.removeColumn(change);
        break;
      case "remove-row":
        change = tablePlugin.changes.removeRow(change);
        break;
      case "insert-table":
        change = tablePlugin.changes.insertTable(change);
        break;
      case "remove-table":
        change = tablePlugin.changes.removeTable(change);
        break;
      default:
        break;
    }
    this.onChange(change);
  };
}

DocBody.propTypes = {
  body: PropTypes.object.isRequired,
  files: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  isValid: PropTypes.func.isRequired,
  onFileUpload: PropTypes.func.isRequired,
  onDeleteFile: PropTypes.func.isRequired
};
export default withStyles(styles, { withTheme: true })(DocBody);
