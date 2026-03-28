import { sleep } from "@/helpers/sleep";
import type { ChatMessage } from "@/interfaces/char-message.interface";
import type { YesNoResponse } from "@/interfaces/yes-no.interface";
import { ref } from "vue";


export const useChat = () => {
    const messages = ref<ChatMessage[]>([]);

    const getHisResponse = async() => {
        const resp = await fetch(' https://yes-no-wtf.vercel.app/api');
        const data = await resp.json() as YesNoResponse;

        return data;
    }

    const onMessage = async(text: string) => {
        if (text.length === 0) return;

        await sleep(1.5);

        messages.value.push({
            id: new Date().getTime(),
            itsMine: true,
            message: text,
        })

        if(!text.endsWith('?')) return;

        const { answer, image } = await getHisResponse();

        messages.value.push({
            id: new Date().getTime(),
            itsMine: false,
            message: answer,
            image: image,
        })
    }

    return {
        //Props
        messages,
        //Methods
        onMessage,
    }
}