import { saveMessageService } from './messages.service.js';


export const sendMessage = async (req, res, next) => {
    try {

        const userid = req.user.userid;
        const { chatid } = req.params;
        const { prompt } = req.body;

        const data = await saveMessageService(userid, chatid, prompt);
        
        return res.status(200).json({
            success: true,
            message: 'Response generated successfully.',
            data: data
        });

    } catch (error) {
        next(error);
    }
}