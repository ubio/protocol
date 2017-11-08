<template>
    <div class="app">
        <router-view>
        </router-view>
    </div>
</template>

<style>
:root {
    --ui-default: hsl(204, 10%, 90%);
    --ui-default--inverse: #222;
    --ui-primary: hsl(204, 72%, 48%);
    --ui-primary--inverse: #fff;
    --ui-muted: hsl(204, 15%, 50%);
    --ui-muted--inverse: #fff;
}

html, body {
    padding: 0;
    margin: 0;
    font: 14px/1.5 'Libre Franklin', sans-serif;
}

a {
    color: var(--ui-primary);
    text-decoration: none;
}

dt {
    font-weight: bold;
}
</style>
