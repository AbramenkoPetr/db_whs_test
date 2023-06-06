import { Whs } from '../../whs/whs.service';

export function renderWhsAll(whs: Whs[]): string {
  let whsListHtml = '';
  for (const whsItem of whs) {
    whsListHtml += renderWhsBlock(whsItem);
  }

  return `
    <h1>Список новостей</h1>
    
    <div class="row">
      ${whsListHtml}
    </div>
`;
}

function renderWhsBlock(whs: Whs): string {
  return `
  <div class="col-lg-4 mb-2">
    <div class="card" style="width: 100%;">
      ${
        whs.cover
          ? `<img src="${whs.cover}" style="height: 200px; object-fit: cover;" class="card-img-top" alt="...">`
          : ''
      }
      <div class="card-body">
        <h5 class="card-title">${whs.cod_whs}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${whs.cod_whs}</h6>
        <p class="card-text">${whs.name_whs}</p>
      </div>
    </div>
  </div>
  `;
}
