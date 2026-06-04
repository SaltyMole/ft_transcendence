const getDrawingFile = async (gameID, playerName, setImageUrl) => {
  const response = await fetch(`/gameroute/getdrawingfile?id=${gameID}&name=${playerName}`);
  const data = await response.json();

  if (!data.success) {
    console.error('Error:', data.error);
    return;
  }

  const imgSrc = `data:${data.mimeType};base64,${data.image}`;
  setImageUrl(imgSrc);
};

export default getDrawingFile;