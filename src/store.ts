import { writable } from 'svelte/store'

export const APP_STATUS = {
	INIT: 0,
	LOADING: 1,
	CHAT_MODE: 2,
	ERROR: -1
}

export const appStatus = writable(APP_STATUS.CHAT_MODE)
export const appStatusInfo = writable({
	id: '4e1aa216279daa63d1300da4647909f4',
	url: 'https://res.cloudinary.com/hothra/image/upload/v1708631988/pdf-chat-ia/zkgwbsz5gindoxjmevky.pdf',
	pages: 4
})

export const setAppStatusLoading = () => appStatus.set(APP_STATUS.LOADING)

export const setAppStatusError = () => appStatus.set(APP_STATUS.ERROR)

export const setAppStatusChatMode = ({
	id,
	url,
	pages
}: {
	id: string
	url: string
	pages: number
}) => {
	appStatus.set(APP_STATUS.CHAT_MODE)

	appStatusInfo.set({ id, url, pages })
}
