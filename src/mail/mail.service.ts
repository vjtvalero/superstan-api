import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    constructor(private configService: ConfigService) { }

    async sendVerification(email: string, token: string): Promise<void> {
        try {
            const senderEmail = this.configService.get('senderEmail.address');
            const senderPassword = this.configService.get('senderEmail.password');
            const appName = this.configService.get('appName');
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: senderEmail,
                    pass: senderPassword,
                },
            });

            const confirmUrl = `${this.configService.get('frontendUrl')}/confirm-email?token=${token}`;

            const info = await transporter.sendMail({
                from: `"${appName}" <${senderEmail}>`, // sender address
                to: email,
                subject: "Confirm your email address",
                html: `<center style="width:100%;background-color:#F7F7F7">
                        <div
                            style="font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;font-family:'Helvetica Neue',sans-serif">
                            Please confirm your email address with <span class="il">${appName}</span>.
                        </div>
                        <div
                            style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;font-family:'Helvetica Neue',sans-serif">
                            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                        </div>
                        <div class="m_-864245763268610665email-container"
                            style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto">
                    
                            <div style="height:44px;color:#ffffff;font-size:1px;line-height:1px"></div>
                    
                            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                                style="background-color:#ffffff;margin-top:0!important;margin-bottom:0!important;margin-right:auto!important;margin-left:auto!important;border-radius:8px;border-spacing:0!important;border-collapse:collapse!important;table-layout:fixed!important">
                                <tbody>
                                    <tr>
                                        <td
                                            style="padding-top:5px;padding-bottom:5px;padding-right:20px;padding-left:20px;text-align:center;background-color:#FF2C5D;border-top-left-radius:8px;border-top-right-radius:8px">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                                                style="word-wrap:break-word;border-spacing:0!important;border-collapse:collapse!important;table-layout:fixed!important;margin-top:0!important;margin-bottom:0!important;margin-right:auto!important;margin-left:auto!important">
                                                <tbody>
                                                    <tr>
                                                        <td colspan="3"
                                                            style="padding-top:30px;padding-bottom:30px;padding-right:50px;padding-left:50px;font-size:14px;color:#555555">
                                                            <h1
                                                                style="margin-top:10px;margin-bottom:10px;margin-right:0;margin-left:0;font-size:20px;line-height:30px;color:#333333;font-weight:normal">
                                                                Hi there,</h1>
                                                            <p style="font-size:16px;line-height:24px">Thank you for signing up to <span
                                                                    class="il">${appName}</span>!</p>
                                                            <p style="font-size:16px;line-height:24px">In order to activate your account,
                                                                you need to confirm your email address first. Click the link below to get
                                                                started:</p>
                                                            <h1
                                                                style="margin-top:25px;margin-bottom:50px;margin-right:0;margin-left:0;font-size:20px;line-height:30px">
                                                                <a href="${confirmUrl}"
                                                                    style="color:#FF2C5D;text-decoration:none" target="_blank">
                                                                    Confirm your email address
                                                                </a>
                                                            </h1>
                                                            <p style="font-size:16px;line-height:24px;margin-bottom:30px">If you have any
                                                                questions, feel free to respond to this email.</p>
                                                            <p style="font-size:16px;line-height:24px">
                                                                Best,<br>
                                                                <span class="il">${appName}</span> team
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style="padding-top:30px;padding-bottom:30px;padding-right:50px;padding-left:50px;font-size:12px;line-height:18px;color:#1f7454;background-color:#FF2C5D;border-collapse:collapse;border-bottom-left-radius:8px;border-bottom-right-radius:8px;text-align:center">
                                            <span style="color:#ffffff">You're receiving this email because this email address was used to
                                                create an account with us. If you did not make a <span class="il">${appName}</span> account,
                                                feel free to ignore this message.</span><br>
                                            <br>
                                            <br>
                                            <span style="color:#ffffff;font-size:14px;line-height:21px"><span
                                                    class="il">${appName}</span><br>
                                                Bonifacio Global City, Taguig, Philippines</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="height:44px;color:#ffffff;font-size:1px;line-height:1px"></div>
                        </div>
                    </center>`,
            });
        } catch (error) {
            console.log(error);
        }
    }
}
