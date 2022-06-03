import { APIClient } from "./apiCore";
import * as url from "./urls";

const api = new APIClient();

const getContacts = (filters?: object) => {
  return api.get(url.GET_CONTACTS, filters);
};

const inviteContact = (data: object) => {
  return api.create(url.INVITE_CONTACT, data);
};

const getContactsOTT = (filters?: object) => {
  return api.get(`${url.GET_CONTACTS_OTT}/${JSON.parse(<string>localStorage.getItem('authUser')).user.id}`, filters);
};

export { getContacts, getContactsOTT, inviteContact };
