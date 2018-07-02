import BaseStore from "./BaseStore";
import { delay } from "lodash";
import { initialBody } from "../stores/initialState";

class DocStore extends BaseStore {
  fetch(type = "inbox", per = 5, page = 1, q = "") {
    const params = {};
    switch (type) {
      case "inbox":
        params.inbox = 1;
        break;
      case "draft":
        params.draft = 1;
        break;
      case "sent":
        params.sent = 1;
        break;
      case "signed":
        params.signed = 1;
        break;
      case "all":
        params.q = q;
        break;
      default:
        break;
    }
    params.per = per;
    params.page = page;
    return this.axios.get("/docs", { params: params }).catch(this.error);
  }

  getReadedChannel(id, onMessage) {
    return this.cable().subscriptions.create(
      { channel: "DocReadedChannel", id: id },
      {
        received: onMessage
      }
    );
  }

  getInboxChannel(onMessage) {
    return this.cable().subscriptions.create(
      { channel: "InboxDocumentChannel", email: this.email() },
      {
        received: onMessage
      }
    );
  }

  uploadFile(doc_id, files, onProgress) {
    const data = new FormData();
    for (let x = 0; x < files.length; x++) {
      data.append("files[]", files[x]);
    }
    let once = true;
    return this.axios.put(`/docs/${doc_id}/add_file`, data, {
      onUploadProgress: e => {
        const percentCompleted = Math.round((e.loaded * 100) / e.total);
        //if the upload take less than a second ignore the thing
        if (once) {
          once = false;
          delay(() => {
            onProgress(percentCompleted);
          }, 1000);
        } else onProgress(percentCompleted);
      },
      //time out about 3 hours
      timeout: 10000000
    });
  }

  deleteFile(doc_id, f) {
    return this.axios.put(`/docs/${doc_id}/remove_file`, {
      name: f.split("/").pop()
    });
  }

  downloadAttacment(f) {
    this.axios.get(f, { responseType: "blob" }).then(r => {
      const url = window.URL.createObjectURL(
        new Blob([r.data], { type: r.data.type })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", f.split("/").pop());
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    });
  }

  getDoc(id) {
    if (id === undefined) return this.axios.get("/docs/new");
    return this.axios.get("/docs/" + id);
  }

  addDoc(doc) {
    return this.axios.post("/docs", doc).catch(this.error);
  }

  setDoc(doc) {
    return this.axios.put("/docs/" + doc.id, doc);
  }

  save(doc) {
    if (doc.id === undefined || doc.id === null) {
      const {
        from,
        to_id,
        address,
        created_by,
        date,
        body,
        user_group_id
      } = doc;
      return this.addDoc({
        from_id: from.id,
        to_id: to_id,
        user_group_id: user_group_id,
        address_id: address.id,
        created_by_id: created_by.id,
        date: date,
        body: body ? JSON.stringify(body) : body
      });
    } else {
      return this.setDoc(doc);
    }
  }

  send_or_sign(doc) {
    if (this.email() === doc.from.email)
      return this.axios.patch("/docs/" + doc.id + "/send");
    return this.axios.patch("/docs/" + doc.id + "/request_sign");
  }

  changeDocField(id, field, value) {
    let doc = this.getDoc(id);
    doc[field] = value;
    this.setDoc(doc);
  }

  delete(id) {
    return this.axios.delete("/docs/" + id);
  }
}
export default new DocStore();
