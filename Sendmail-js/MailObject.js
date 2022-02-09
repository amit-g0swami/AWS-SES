import MailGetTemplate from "./MailGetTemplate.js";

export default class MailObject {
    mailObject(bodyHtml, emailrecipents, subject, Source) {
        const params = {
            Destination: {
                ToAddresses: [`${emailrecipents}`],
            },
            ConfigurationSetName: process.env.AWS_CONFIGURATIONSETNAME,
            Message: {
                Body: {
                    Html: {
                        Data: `${bodyHtml}`,
                    },
                },
                Subject: {
                    Data: `${subject}`,
                },
            },
            Source: `${Source}`,
        };
    }
}
