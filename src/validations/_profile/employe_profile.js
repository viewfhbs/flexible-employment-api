import { isEmpty } from "validator";
export default ({
  companeyname,
  phone,
  location,
  companeytype,
  aboutcompaney,
  companeysize,
  website
}) => {
  const errors = {};

  if (
    companeyname === undefined ||
    companeyname === null ||
    isEmpty(companeyname)
  )
    errors.companeyname = "Companey name is required";

  if (phone === undefined || phone === null || isEmpty(phone))
    errors.phone = "Phone number is required";

  if (location === undefined || location === null || isEmpty(location))
    errors.location = "Location is required";

  if (
    companeytype === undefined ||
    companeytype === null ||
    isEmpty(companeytype)
  )
    errors.companeytype = "Companey type is required";

  if (
    aboutcompaney === undefined ||
    aboutcompaney === null ||
    isEmpty(aboutcompaney)
  )
    errors.aboutcompaney = "Companey About is required";

  if (
    companeysize === undefined ||
    companeysize === null ||
    isEmpty(companeysize)
  )
    errors.companeysize = "Companey size is required";

  if (website === undefined || website === null || isEmpty(website))
    errors.website = "Companey website is required";

  if (Object.entries(errors).length === 0)
    return { validationStatus: true, errors: null };
  else return { validationStatus: false, errors };
};
