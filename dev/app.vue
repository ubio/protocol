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
    --ui-failure: hsl(0, 100%, 64%);
    --ui-failure--inverse: #fff;
}

html, body {
    padding: 0;
    margin: 0;
    font: 14px/1.5 'Libre Franklin', sans-serif;
}

h1 {
    margin: 1em 0;
}

h2 {
    margin: 2em 0;
}

a {
    color: var(--ui-primary);
    text-decoration: none;
}

code {
    padding: 0 2px;
    background: var(--ui-default);
    font: 14px/1.5 monospace;
}
</style>
