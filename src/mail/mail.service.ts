import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Whs } from '../whs/whs.service';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  async sendTest() {
    console.log('Отправляется письмо установки');
    const dirTemplates = join(__dirname, '../../..', '/src/mail/templates/new-whs');
    return await this.mailerService
      .sendMail({
        to: 'abram1312@yandex.ru',
        subject: '🤩 Наше первое письмо!',
        template: './test',
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }


  async sendEdit(email: string, message) {
    console.log('Отправляется письмо редактирования');
    const dirTemplates = join(__dirname, '../../..', '/src/mail/templates/edit-whs');
    //console.log(message);
    const msg = { message: `${message}` }
    return await this.mailerService
      .sendMail({
        to: email,
        subject: 'Редактирование новости',
        //
        //template: './test1',
        template: dirTemplates,
        context: msg,
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }


  async sendNewWhsForAdmins(emails: string[], whs: Whs) {
    console.log('Отправляются письма о новой новости администрации ресурса');
    const dirTemplates = join(__dirname, '../../..', '/src/mail/templates/new-whs');
    console.log('__dirname ', __dirname);
    //console.log('dirname1 ', dirname1);
    for (const email of emails) {
      await this.mailerService
        .sendMail({
          to: email,
          subject: `Создана новая новость: ${whs.cod_whs}`,
          template: dirTemplates,
          context: whs,
        })
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }
}
