<script>
    import { Label, Input, Spinner } from 'flowbite-svelte';
    import {appStatusInfo, setAppStatusError} from '@/store'

    const {id, url, pages} = $appStatusInfo

    let loading = false
    let answer = ''

    const numOfImagesToShow = Math.min(pages, 4)
    const images = Array.from({length: numOfImagesToShow}, (_, i) => {
        const page = i + 1
        return url.replace('/upload/', `/upload/w_400,h_540,c_fill,pg_${page}/`).replace('.pdf', '.jpg')
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        loading = true 

        const question = event.target.question.value

        const searchParams = new URLSearchParams()
        searchParams.append('id',id)
        searchParams.append('question',question)

       try {
        const res = await fetch(`/api/ask?${searchParams.toString()}`, {
            headers: {
                'content-type': 'application/json'
            },
            // body: JSON.stringify({
            //     id,
            //     question
            // })
        })

        if(!res.ok){
            loading = false
            console.log('Error asking question');
            return
        }

        // const {answer: apiAnswer} = await res.json()
        const response = await res.json()
        console.log("🚀 ~ handleSubmit ~ response:", response)

        answer = apiAnswer
       } catch (error) {
        console.log(error)
        setAppStatusError()
       }finally{
        loading = false
       }
    }
</script>

<div class="grid grid-cols-4 gap-2">
    {#each images as image}
        <img src={image} alt="PDF page" class="rounded w-[200px] h-auto aspect-[200/270]">
    {/each}
</div>


<form class="mt-10" on:submit={handleSubmit}>
    <Label for="question" class="block mb-2">Deja aquí tu pregunta</Label>
    <Input id="question" placeholder="De que trata este documento?" />
</form>

{#if loading}
    <div class="mt-10 flex justify-center items-center flex-col gap-y-2">
        <Spinner />
        <p class="opacity-70">Esperando Respuesta...</p>
    </div>
{/if}

{#if answer}
    <div class="mt-8">
        <p class="opacity-70">Respuesta:</p>
        <p>{answer}</p>
    </div>
{/if}