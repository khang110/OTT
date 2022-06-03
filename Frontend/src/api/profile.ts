import { APIClient } from "./apiCore";
import * as url from "./urls";

const api = new APIClient();

const getProfileDetails = () => {
  return api.get(url.GET_PROFILE_DETAILS+'/'+JSON.parse(<string>localStorage.getItem('authUser')).user.id);
};

const getSettings = () => {
  return api.get(url.GET_USER_SETTINGS + '/'+JSON.parse(<string>localStorage.getItem('authUser')).user.id);
};
const updateSettings = (field: string, value: any) => {
  return api.update(url.UPDATE_ETTINGS, {
    field: field,
    value: value,
  });
};

export { getProfileDetails, getSettings, updateSettings };
