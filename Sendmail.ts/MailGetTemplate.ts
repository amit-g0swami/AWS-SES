import * as fs from "fs";
import * as Handlebars from "handlebars";

interface TemplateModel { }

export default class MailGetTemplate {
    mailTemplate(htmlTemplate: String, emaildata: TemplateModel) {
        fs.readFile(`./templates/${htmlTemplate}.html`, function (err, htmlTemplate) {
            if (err) {
                return console.error(err)
            }
            var templateHtml = Handlebars.compile(htmlTemplate.toString());
            this.bodyHtml = templateHtml({ ...emaildata });
            return this.bodyHtml;
        });
    }
}