import { useEffect } from "react";
import { contactItem } from "@/types/contacts";
import { UseFormSetValue } from "react-hook-form";

export const useContactById = (
  id: string | undefined,
  contacts: contactItem[],
  setValue: UseFormSetValue<contactItem>
) => {
  useEffect(() => {
    if (id) {
      const contactToEdit = contacts.find((contact) => contact.id === id);
      if (contactToEdit) {
        setValue("id", contactToEdit.id);
        setValue("firstName", contactToEdit.firstName);
        setValue("lastName", contactToEdit.lastName);
        setValue("email", contactToEdit.email);
        setValue("country", contactToEdit.country);
      }
    }
  }, [id, contacts, setValue]);
};
