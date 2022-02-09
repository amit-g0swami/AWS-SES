import * as AWS from 'aws-sdk';

export default class MailSend {
    mailSend({ ...params }, Source = "hiii") {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: process.env.AWS_REGION,
        });
        const ses = new AWS.SES({ apiVersion: '2010-12-01' });
        const sendparams = {
            ...params,
            Source: Source,
        };
        const sendEmail = ses.sendEmail(sendparams).promise();
    }
}
l