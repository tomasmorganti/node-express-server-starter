import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const templates = {
    invite: {
        id: 'd-79ba1fd147c2437d80d58c6f9cdd3066',
    },
};

const msg = {
    to: process.env.TO_EMAIL as string,
    from: process.env.FROM_EMAIL as string,
    templateId: templates.invite.id,
    dynamicTemplateData: {
        userRegisterUrl: 'www.google.com',
    },
    mail_settings: {
        sandbox_mode: {
            enable: process.env.NODE_ENV === 'test',
        },
    },
};

console.log(process.env.TO_EMAIL);

export const sendEmail = async () => {
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);
    }
};
