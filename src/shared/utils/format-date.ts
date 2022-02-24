const formatDate = (data: Date): string => {
  const dd = data.getDate();
  const mm = data.getMonth() + 1;
  const yyyy = data.getFullYear();
  let formatedDate: string;
  if (dd < 10) {
    formatedDate = "0" + dd;
  } else {
    formatedDate = "" + dd;
  }
  if (mm < 10) {
    formatedDate += "/0" + mm;
  } else {
    formatedDate += "/" + mm;
  }
  return formatedDate + "/" + yyyy;
};

export default formatDate;
