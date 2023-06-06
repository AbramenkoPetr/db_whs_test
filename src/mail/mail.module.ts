import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
console.log('mailmodule dirname ', __dirname);
@Module({
  imports: [
    MailerModule.forRoot({
      transport:
        'smtps://abram1312:f9hubezikcWWLzaRX89h@smtp.mail.ru',
      defaults: {
        from: '"NestJS робот" <abram1312@mail.ru>',
      },
      template: {
        dir: join(__dirname, '../../..', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  exports: [MailService],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
