import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { History } from "history";

export interface ContactItemProps {
  contact: contactItem;
}

export interface ContactFormProps {
  contact?: contactItem;
  onClose: () => void;
  onSave?: (newContact: contactItem) => void;
}

export interface contactItem {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  email: string;
}

export interface FormularyProps {
  handleDelete: () => void;
  onSubmit: SubmitHandler<contactItem>;
  register: UseFormRegister<contactItem>;
  handleSubmit: UseFormHandleSubmit<contactItem>;
  errors: FieldErrors<contactItem>;
  countries: { name: string; code: string }[];
  history: History;
  id?: string;
}
