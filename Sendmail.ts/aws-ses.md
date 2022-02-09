/* eslint-disable prettier/prettier */
import * as AWS from 'aws-sdk';
import * as fs from "fs";
import * as Handlebars from "handlebars";

export function mailses(subjectdata, bodyHtml, emailrecipents) {

  fs.readFile(`../templates/login}.html`, function (err, emailHtmlTemplate) {
    const emailData = {
      subject: "hiiiiiii",
      heading: "thankyou for joining",
    };
    const subjectdata: String = `Hello user !!`;
    const templateHtml = Handlebars.compile(emailHtmlTemplate.toString());
    const bodyHtml: any = templateHtml(emailData);
    mailses(subjectdata, bodyHtml, emailrecipents);
  });

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
  });
  const ses = new AWS.SES({ apiVersion: '2010-12-01' });
  const params = {
    Destination: {
      ToAddresses: [`${emailrecipents}`],
    },
    ConfigurationSetName: process.env.AWS_CONFIGURATIONSETNAME,
    Message: {
      Body: {
        Html: {
          Data: bodyHtml,
        },
      },
      Subject: {
        Data: subjectdata,
      },
    },
    Source: process.env.AWS_MAIL,
  };

  const sendEmail = ses.sendEmail(params).promise();
  sendEmail
    .then((data) => {
      console.log('email submitted to SES', data);
    })
    .catch((error) => {
      console.log(error);
    });
}