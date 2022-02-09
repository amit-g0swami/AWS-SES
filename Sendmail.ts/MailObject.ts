export default class MailObject {
    mailObject(bodyHtml: String, emailrecipents: String, subject: String, cname: String) {
        const params = {
            Destination: {
                ToAddresses: [emailrecipents],
            },
            ConfigurationSetName: cname,
            Message: {
                Body: {
                    Html: {
                        Data: bodyHtml,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        };
        return params;
    }
}
