<script>
	export let showModal; // boolean

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
    function fadeSlide(node, options) {
		const slideTrans = slide(node, options)
		return {
			duration: options.duration,
			css: t => `
				${slideTrans.css(t)}
				opacity: ${t};
			`
		};
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
	</div>
</dialog>

<style>
	dialog {
		max-width: 24em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		transform: translateY(-100%);
		opacity: 0;
		transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out;
        
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
  transform: translateY(0);
  opacity: 1;
  animation: fadeSlide(1000ms); /* Added closing parenthesis here */
}

	dialog[open]::backdrop {
		animation: fade 1s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
