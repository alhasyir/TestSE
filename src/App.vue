<script setup lang="ts">
	import { RouterView } from "vue-router";
	import { useDialogStore } from "./stores/dialog";
	import { ActionDialog } from "./components/dialogs";

	const dialog = useDialogStore();

	const onClose = () => {
		dialog.open = false;
	};
</script>

<template>
	<RouterView />
	<ActionDialog
		:show-cancel-button="dialog.showCancelButton"
		:dismiss-on-action="dialog.dismissOnAction"
		:open="dialog.open"
		:title="dialog.title"
		:message="dialog.content"
		:confirm-text="dialog.confirmText"
		:cancel-text="dialog.cancelText"
		@on-close="onClose"
		:type="dialog.type"
	/>
</template>
