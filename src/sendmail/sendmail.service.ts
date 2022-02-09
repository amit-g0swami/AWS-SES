/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as fs from "fs";
import * as Handlebars from "handlebars";
import { TemplateModel } from "./interface/Template.interface";

interface StringArray {
    [index: number]: string;
}

@Injectable()
export class SendmailService {
    mailSend(htmlTemplate: string, emaildata: TemplateModel, subject: string, emailrecipents: StringArray, cname: string, source: string): void {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: process.env.AWS_REGION,
        });
        const ses = new AWS.SES({ apiVersion: '2010-12-01' });
        const params = this.mailObject(htmlTemplate, emaildata, emailrecipents, subject, cname);
        const sendparams: any = {
            params,
            Source: source,
        };
        const sendEmail = ses.sendEmail(sendparams).promise();
        sendEmail
            .then((data) => {
                console.log('email submitted to SES', data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    mailObject(htmlTemplate: string, emaildata: TemplateModel, emailrecipents: StringArray, subject: string, cname: string): TemplateModel {
        const bodyhtml = this.mailTemplate(htmlTemplate, emaildata);
        const params: TemplateModel = {
            Destination: {
                ToAddresses: [emailrecipents],
            },
            ConfigurationSetName: cname,
            Message: {
                Body: {
                    Html: {
                        Data: bodyhtml,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        };
        return params;
    }

    mailTemplate(htmlTemplate: string, emaildata: TemplateModel, callback: (bodyHtml: string) => void): void {
        fs.readFile(`./templates/${htmlTemplate}.html`, function (err, htmlTemplate) {
            if (err) {
                return console.error(err)
            }
            const templateHtml = Handlebars.compile(htmlTemplate.toString());
            const bodyHtml = templateHtml({ ...emaildata });
            callback(bodyHtml);
        })
    }
}

