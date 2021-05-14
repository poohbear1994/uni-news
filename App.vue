<script>
	import {
		MyModel
	} from '@/models/my.js'
	const myModel = new MyModel()
	export default {
		onLaunch: async function() {
			const user_id = '608e47a79abec80001c2ce32'
			const res = await myModel.getUser(user_id)
			if(res.code === 200){
				uni.setStorageSync('user_id',user_id)
				this.$store.dispatch('set_userinfo',res.data)
			}
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("/components/gaoyia-parse/parse.css");
</style>
