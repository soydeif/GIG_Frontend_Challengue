import { useEffect, useState } from "react";
import { contactItem } from "@/types/contacts";
import { useStorage } from "@hooks/useStorage";
import toast from "react-hot-toast";

const WELCOME_MESSAGE = `
🖐 Hello and thanks for taking the time to review my code. Happy coding! 🤓`;

export const useContacts = () => {
  const [contacts, setContacts] = useStorage<contactItem[]>(
    "contacts",
    [],
    "local"
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const contactsInLocalStorage = localStorage.getItem("contacts");

    if (!contactsInLocalStorage) {
      const fetchContacts = async () => {
        try {
          const response = await fetch("/exampleContacts.json");
          if (!response.ok) throw new Error("Failed to load contacts.");
          const data: contactItem[] = await response.json();
          setContacts(data);
          toast(WELCOME_MESSAGE, { duration: 6000 });
        } catch (err) {
          console.error("Error fetching contacts:", err);
          toast.error("Failed to fetch contacts.");
        } finally {
          setLoading(false);
        }
      };
      fetchContacts();
    } else {
      setLoading(false);
    }
  }, [setContacts]);

  const addContact = (newContact: contactItem): boolean => {
    try {
      setContacts([...contacts, newContact]);
      toast.success("Contact added successfully!");
      return true;
    } catch (error) {
      console.error("Error adding contact:", error);
      setError("Failed to add contact.");
      toast.error("Failed to add contact.");
      return false;
    }
  };

  const removeContact = (id: string): boolean => {
    try {
      setContacts(contacts.filter((contact) => contact.id !== id));
      sessionStorage.removeItem(`tempContact-${id}`);
      toast.success("Contact removed successfully!");
      return true;
    } catch (error) {
      console.error("Error removing contact:", error);
      setError("Failed to remove contact.");
      toast.error("Failed to remove contact.");
      return false;
    }
  };

  const editContact = (updatedContact: contactItem): boolean => {
    try {
      sessionStorage.setItem(
        `tempContact-${updatedContact.id}`,
        JSON.stringify(updatedContact)
      );
      return true;
    } catch (error) {
      console.error("Error saving to session:", error);
      setError("Failed to save contact.");
      return false;
    }
  };

  const saveContact = (contact: contactItem): boolean => {
    try {
      const updatedContacts = contacts.map((c) =>
        c.id === contact.id ? contact : c
      );
      setContacts(updatedContacts);
      sessionStorage.removeItem(`tempContact-${contact.id}`);
      toast.success("Contact updated successfully!");
      return true;
    } catch (error) {
      console.error("Error saving contact:", error);
      setError("Failed to save contact.");
      toast.error("Failed to save contact.");
      return false;
    }
  };

  return {
    contacts,
    loading,
    error,
    addContact,
    removeContact,
    editContact,
    saveContact,
  };
};
