import * as AWS from 'aws-sdk';

export default class MailSend {
    mailSend(params: any, source: String) {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: process.env.AWS_REGION,
        });
        const ses = new AWS.SES({ apiVersion: '2010-12-01' });
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
}