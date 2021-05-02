<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		async onLoad() {
			const res = await uniCloud.callFunction({
				name: 'login'
			})
			console.log(res)
		}
	}
</script>

<style>

</style>
