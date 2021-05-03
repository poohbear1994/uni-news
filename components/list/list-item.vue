<template>
	<list-scroll class="list-scroll">
		<list-card v-for="item in list" :item="item" :key="item._id"/>
	</list-scroll>
</template>

<script>
	export default {
		name: 'listItem',
		props:{
			list: Array,
			default() {
				return []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-scroll {
		height: 100%;
	}
</style>
