import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const templateIds = {
    invite: 'd-79ba1fd147c2437d80d58c6f9cdd3066',
};

type DynamicTemplateDataObject = {
    userRegisterUrl?: string;
};

export const sendEmail = async (to: string, templateId: string, dynamicTemplateData?: DynamicTemplateDataObject) => {
    const msg = {
        from: process.env.FROM_EMAIL as string,
        to,
        templateId,
        dynamicTemplateData,
        mail_settings: {
            sandbox_mode: {
                enable: process.env.NODE_ENV === 'test',
            },
        },
    };
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);
    }
};
