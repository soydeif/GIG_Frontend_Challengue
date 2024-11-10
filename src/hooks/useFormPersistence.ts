import { contactItem } from "@/types/contacts";
import { useEffect } from "react";

export const useFormPersistence = (
  id: string | undefined,
  reset: Function,
  watch: Function,
  contacts: contactItem[]
) => {
  useEffect(() => {
    const sessionData = sessionStorage.getItem(`tempContact-${id}`);
    const contactToEdit = sessionData
      ? JSON.parse(sessionData)
      : contacts.find((contact) => contact.id === id);

    if (contactToEdit) reset(contactToEdit);
  }, [id, contacts, reset]);

  useEffect(() => {
    const subscription = watch((data: JSON) => {
      if (id) {
        sessionStorage.setItem(`tempContact-${id}`, JSON.stringify(data));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, id]);
};
