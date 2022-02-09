import * as fs from "fs";
import Handlebars from "handlebars";

export default class MailGetTemplate {
    mailTemplate(htmlTemplate, emaildata) {
        fs.readFile(`./templates/${htmlTemplate}.html`, function (err, htmlTemplate) {
            if (err) {
                return console.error(err)
            }
            var templateHtml = Handlebars.compile(htmlTemplate.toString());
            var bodyHtml = templateHtml({ ...emaildata });
            console.log(bodyHtml);
        });
    }
}