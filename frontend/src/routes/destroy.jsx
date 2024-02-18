import { redirect } from "react-router-dom";
import { deleteContactDB } from "../contactsApi";

export async function action({ params }) {
  await deleteContactDB(params.contactId);
  return redirect("/");
}