import { contactItem } from "@/types/contacts";
import { useEffect } from "react";

export const useFormPersistence = (
  id: string | undefined,
  reset: Function,
  watch: Function,
  contacts: contactItem[]
) => {
  const storageKey = id ? `tempContact-${id}` : `tempContact-new`;

  useEffect(() => {
    const sessionData = sessionStorage.getItem(storageKey);
    const contactToEdit = sessionData
      ? JSON.parse(sessionData)
      : contacts.find((contact) => contact.id === id);

    if (contactToEdit) reset(contactToEdit);
  }, [id, contacts, reset, storageKey]);

  useEffect(() => {
    const subscription = watch((data: JSON) => {
      sessionStorage.setItem(storageKey, JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [watch, storageKey]);
};
