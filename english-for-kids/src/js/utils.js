/* eslint-disable no-param-reassign */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createSmile(source) {
  const smile = new Image();
  smile.classList.add('material-icons', 'smile');
  smile.src = `assets/images/${source}`;
  return smile;
}

function cachePictures(array) {
  if (!cachePictures.set) cachePictures.set = new Set();
  array.forEach((image) => {
    const img = new Image();
    img.src = `assets/images/${image}`;
    cachePictures.set.add(img);
    img.addEventListener('load', () => {
      cachePictures.set.delete(img);
    });
  });
}

export { shuffle, createSmile, cachePictures };
