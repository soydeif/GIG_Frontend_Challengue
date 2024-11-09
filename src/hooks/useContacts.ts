import { useEffect, useState } from "react";
import { contactItem } from "@/types/contacts";
import { useLocalStorage } from "@hooks/useLocalStorage";
import toast from "react-hot-toast";
const WELCOME_MESSAGE = `
🖐 Hello and thanks for taking the time to review my code.
I hope you enjoy exploring it as much as I enjoyed building it! 
Please don’t hesitate to reach out if you have any questions or feedback. Happy coding! 🤓
`;

export const useContacts = () => {
  const [contacts, setContacts] = useLocalStorage<contactItem[]>(
    "contacts",
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(false);
    } catch (error) {
      console.error("Error loading contacts:", error);
      setError("Failed to load contacts.");
    }
  }, [contacts]);

  useEffect(() => {
    const contactsInLocalStorage = localStorage.getItem("contacts");

    if (!contactsInLocalStorage) {
      const fetchContacts = async () => {
        try {
          const response = await fetch("/exampleContacts.json");
          if (!response.ok)
            throw new Error("Failed to load contacts from JSON file.");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const updatedContacts = contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      );
      setContacts([...updatedContacts]);
      toast.success("Contact updated successfully!");
      return true;
    } catch (error) {
      console.error("Error editing contact:", error);
      setError("Failed to edit contact.");
      toast.error("Failed to edit contact.");
      return false;
    }
  };

  return { contacts, loading, error, addContact, removeContact, editContact };
};
