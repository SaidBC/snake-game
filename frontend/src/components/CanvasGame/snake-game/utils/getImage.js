function getImage(url) {
  return new Promise((res, rej) => {
    const image = new Image();
    image.onload = () => res(image);
    image.onerror = () => rej("UNEXPECTED ERROR OCCURS");
    image.src = url;
  });
}

export default getImage;
