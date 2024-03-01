<script>
    import { Alert } from 'flowbite-svelte';
    import {APP_STATUS, appStatus} from '@/store'
	import StepUpload from './steps/StepUpload.svelte'
	import StepLoading from './steps/StepLoading.svelte'
	import StepChat from './steps/StepChat.svelte'
</script>

{#if $appStatus === APP_STATUS.INIT}
<StepUpload />
{:else if $appStatus === APP_STATUS.LOADING}
<StepLoading />
{:else if $appStatus === APP_STATUS.ERROR}
<Alert>
    <span class="font-medium">Algo malo ha pasado!</span>
    Hay un error en la aplicación
</Alert>
{:else if $appStatus === APP_STATUS.CHAT_MODE}
<StepChat />
{:else}
<Alert>
    <span class="font-medium">Acción no reconocida</span>
    Este estado de la aplicación no esta reconocido
</Alert>
{/if}