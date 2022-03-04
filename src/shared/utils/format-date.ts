const formatDate = (data: Date): string => {
  const tranformedData = new Date(data);
  const dd = tranformedData.getDate();
  const mm = tranformedData.getMonth() + 1;
  const yyyy = tranformedData.getFullYear();
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
