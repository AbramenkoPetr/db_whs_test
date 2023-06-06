import { Whs } from '../../whs/whs.service';
import { Gts } from '../../whs/gts/gts.service';
import { CreateGtsDto } from '../../whs/gts/dtos/create-gts-dto';

export function renderWhsDetail(
  whs: Whs,
  gts: CreateGtsDto[],
): string {
  return `
    <div class="container">
      <img src="http://localhost:3000/${whs.cover}" alt="">
      <h1>${whs.cod_whs}</h1>
      <div>${whs.name_whs}</div>
      <div class="text-muted">Автор: ${whs.cod_whs}</div>
      
      ${gts ? renderWhsComments(gts) : 'Нет комментариев'}
    </div>
`;
}

function renderWhsComments(comments: CreateGtsDto[]): string {
  let html = '';
  for (const comment of comments) {
    html += `
    <div class="row">
      <div class="col-lg-1">
        ${
          comment?.avatar
            ? `<img src="http://localhost:3000/${comment.avatar}" style="background: #ccc; width: 75px; height: 75px; object-fit: cover;"/>`
            : '<div style="background: #ccc; width: 75px; height: 75px; overflow: hidden;" class="rounded-lg"></div>'
        }
        
      </div>
      <div class="col-lg-8">
        <div>${comment.cod_okato}</div>
        <div>${comment.message}</div>
      </div>
    </div>
    `;
  }
  return html;
}
