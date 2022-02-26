<script>
    import { onMount } from "svelte";
    
    export let shortname;

    onMount(() => {
        if(shortname) {
            const count = document.createElement('script');
            count.type = 'text/javascript';
            count.async = true;
            count.id = 'dsq-count-scr';
            count.src = `//${shortname}.disqus.com/count.js`;

            document.body.appendChild(count);
        } else console.error("In-sufficient Props for disqus-svelte Count.\n\n The 'shortname' property containing the Shortname for your disqus site is Required!");
    });
</script>