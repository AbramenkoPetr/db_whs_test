import { Injectable } from '@nestjs/common';
import { getRandomInt } from '../whs.service';
import { CreateGtsDto } from './dtos/create-gts-dto';

export type Gts = {
  id?: number;
  message: string;
  author: string;
};

export type GtsEdit = {
  id?: number;
  message?: string;
  author?: string;
};

@Injectable()
export class GtsService {
  private readonly gts = {
     '1': [
    { message: 'это коментарий1' ,
   id: 111},
    { message: 'это коментарий2' , 
    id: 222,
    author: 'Петр',
    avatar: '/whs-static/avatar.png' },
    { message: 'это коментарий3' , 
    id: 333 }
  ]}
  //** */
  // create1() {
  //   this.gts[1] = [];
  //   const msg = { message: 'Отличная новость',
  //   author: 'Аноним', avatar: ''};
  //   const newComment = {msg , id: 333 };
  //   this.gts[1].push(newComment);
  //   console.log('this.gts', this.gts);
  //   return newComment;
  // }
  //create1()
  //** */
  create(idWhs: number, comment: CreateGtsDto) {
    //console.log('create')
    if (!this.gts[idWhs]) {
      this.gts[idWhs] = [];
    }
    //console.log('create')
    const newComment = { ...comment, id: getRandomInt() };
    //console.log('create', this.gts[idWhs]);
    this.gts[idWhs].push(newComment);
    //console.log('create', this.gts[idWhs]);
    return newComment;
  }

  edit(idWhs: number, idComment: number, comment: GtsEdit) {
    const indexComment = this.gts[idWhs]?.findIndex(
      (c) => c.id === idComment,
    );

    if (!this.gts[idWhs] || indexComment === -1) {
      return false;
    }

    this.gts[idWhs][indexComment] = {
      ...this.gts[idWhs][indexComment],
      ...comment,
    };
    return this.gts[idWhs][indexComment];
  }

  find(idWhs: number): CreateGtsDto[] | null {
    return this.gts[idWhs] || null;
  }

  remove(idWhs: number, idComment: number): Comment[] | null {
    if (!this.gts[idWhs]) {
      return null;
    }

    const indexComment = this.gts[idWhs].findIndex(
      (c) => c.id === idComment,
    );
    if (indexComment === -1) {
      return null;
    }
    return this.gts[idWhs].splice(indexComment, 1);
  }
}
