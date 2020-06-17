const formatDate = dateToFormat => {
  const date = new Date(dateToFormat);
  const formattedDate = date.toLocaleDateString();
  const formattedHour = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { hour: formattedHour, date: formattedDate };
};

export default formatDate;
