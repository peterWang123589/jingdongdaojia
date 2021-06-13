<template>
<div class="wrapper">
<StaticPart/>
<Nearby />
</div>
<Docker :currentIndex='0' />
</template>
<script>

import StaticPart from './StaticPart.vue'
import Nearby from './Nearby.vue'
import Docker from '../../components/Docker.vue'
export default {
  name: 'Home',
  components: { StaticPart, Nearby, Docker }
}
</script>
<style lang="scss" scoped>

.wrapper{
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: .5rem;
  // background: green;
  padding: 0 .18rem .1rem .18rem;

}

</style>
