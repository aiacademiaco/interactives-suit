<template>
    <div class="default-layout">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'DefaultLayout',
    // components: {
    // }
}
</script>

<style scoped>
.default-layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>