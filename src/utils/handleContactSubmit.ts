import { useHistory } from "react-router-dom";
import { contactItem } from "../types/contacts";
import { v4 as uuidv4 } from "uuid";

export const handleContactSubmit = (
  data: contactItem,
  id: string | undefined,
  addContact: (contact: contactItem) => void,
  editContact: (contact: contactItem) => void,
  history: ReturnType<typeof useHistory>
) => {
  if (id) {
    editContact(data);
  } else {
    addContact({ ...data, id: uuidv4() });
  }
  history.push("/");
};
