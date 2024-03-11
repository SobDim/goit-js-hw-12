export function createMarkup(arr) {
  return arr
    .map(arr => {
      const {
        webformatURL,
        tags,
        largeImageURL,
        likes,
        views,
        comments,
        downloads,
      } = arr;
      return ` <li class="gallery-item" data-tilt> 
              <a class="gallery-link" href="${largeImageURL}">
              <img  
                class="gallery-image"
                src="${webformatURL}"
                alt="${tags}"
              />
            </a>
              <ul class="property-list">
    <li class="list-property-item"><strong>Likes</strong> <br> ${likes}</li>
    <li class="list-property-item"><strong>Views</strong> <br> ${views}</li>
    <li class="list-property-item"><strong>Comments</strong> <br> ${comments}</li>
    <li class="list-property-item"><strong>Downloads</strong> <br> ${downloads}</li>
  </ul>
          </li>`;
    })
    .join('');
}
