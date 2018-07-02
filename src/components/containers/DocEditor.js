import React from "react";
import PropTypes from "prop-types";
import withSnack from "../withSnack";
import DocBody from "../DocBody";
import DocHeader from "../DocHeader";
import DocFooter from "../DocFooter";
import DocActionButtons from "../DocActionButtons";
import DocStore from "../../stores/DocStore";
import { debounce } from "lodash";

class DocEditor extends React.Component {
  state = {
    doc: {},
    isLoaded: false,
    valid: false
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    DocStore.getDoc(id).then(
      r => {
        this.setState({ doc: r.data, isLoaded: true });
        this.addWSCheckReaded(r.data);
      },
      e => {
        switch (e.response.status) {
          case 403:
            this.props.snack("Acceso denegado");
            break;
          case 404:
            this.props.snack("No encontrado");
            break;
          default:
            this.props.snack("Error");
        }
      }
    );
  }

  componentWillUnmount() {
    this.save.cancel();
    if (this.subs !== undefined) {
      this.subs.unsubscribe();
    }
  }

  addWSCheckReaded = doc => {
    if (!doc.readed && doc.sent && this.subs === undefined)
      this.subs = DocStore.getReadedChannel(doc.id, data => {
        this.setState(prevState => {
          return { ...prevState, doc: { ...prevState.doc, readed: data } };
        });
      });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.isLoaded) return true;
    const ns = nextState;
    const ts = this.state;
    return (
      ns.valid !== ts.valid ||
      ns.doc.sent !== ts.doc.sent ||
      ns.doc.to !== ts.doc.to ||
      ns.doc.signed !== ts.doc.signed ||
      ns.doc.from.id !== ts.doc.from.id ||
      ns.doc.files.length !== ts.doc.files.length
    );
  }

  render() {
    if (!this.state.isLoaded) return null;
    const { doc, valid } = this.state;
    // you can only send when the current user and the documents from, are the same
    const canSend = doc.from.email === DocStore.email();
    // disabled when the docs was sent or teh current already requested a sign
    const disabled = doc.sent || (doc.signed && !canSend);
    // you shall not send empty body documents
    const disableSend = !valid || disabled || !doc.to.id;
    // if the docs is to the current users, dont show send button
    const hideSend = doc.to.email === DocStore.email() && doc.sent;

    return (
      <React.Fragment>
        <DocHeader
          onDateChange={this.onDateChange}
          date={doc.date}
          folio={doc.folio}
          to={doc.to}
          onToChange={this.onToChange}
          disabled={disabled}
          readed={!hideSend && doc.readed === true}
        />
        <DocBody
          body={doc.body}
          files={doc.files}
          onChange={this.onBodyChange}
          disabled={disabled}
          onFileUpload={this.onFileUpload}
          onDeleteFile={this.onDeleteFile}
          isValid={this.isBodyValid}
        />
        <DocFooter
          address={doc.address}
          from={doc.from}
          created_by={doc.created_by}
          onSwitchFrom={this.onSwitchFrom}
          disabled={disabled}
          showSign={doc.sent}
        />
        <DocActionButtons
          onSend={this.onSend}
          disabled={disableSend}
          canSend={canSend}
          hideSend={hideSend}
          goBack={this.props.history.goBack}
        />
      </React.Fragment>
    );
  }

  isBodyValid = v => {
    this.setState({ valid: v });
  };

  onDeleteFile = f => {
    const doc_id = this.state.doc.id;
    DocStore.deleteFile(doc_id, f).then(r => {
      this.setState(ps => {
        return { ...ps, doc: { ...ps.doc, files: r.data } };
      });
    });
  };

  onFileUpload = (e, onProgress) => {
    const files = e.target.files;
    const doc_id = this.state.doc.id;
    DocStore.uploadFile(doc_id, files, onProgress).then(r => {
      this.setState(ps => {
        return { ...ps, doc: { ...ps.doc, files: r.data } };
      });
    });
  };

  onToChange = to => {
    if (to.group) this.updateDoc({ user_group_id: to.id, to_id: null, to: to });
    else this.updateDoc({ to_id: to.id, user_group_id: null, to: to });
  };

  onBodyChange = value => {
    this.updateDoc({ body: value });
  };

  onDateChange = value => {
    this.updateDoc({ date: value });
  };

  onSwitchFrom = user => {
    this.updateDoc({ from_id: user.id, address_id: user.address.id });
  };

  updateDoc = shallow => {
    this.setState(prevState => {
      const ns = { ...prevState, doc: { ...prevState.doc, ...shallow } };
      if (shallow.id) this.save(shallow);
      else this.save(ns.doc);
      return ns;
    });
  };

  save = debounce(new_data => {
    DocStore.save(new_data).then(r => {
      this.setState(prevState => {
        return { ...prevState, doc: { ...prevState.doc, ...r.data } };
      });
    });
  }, 500);

  onSend = () => {
    const doc = this.state.doc;
    DocStore.send_or_sign(doc).then(r => {
      this.setState(prevState => {
        this.props.snack("Folio enviado con éxito");
        return { ...prevState, doc: r.data };
      });
    });
  };
}
DocEditor.propTypes = {
  match: PropTypes.object.isRequired
};
export default withSnack(DocEditor);
