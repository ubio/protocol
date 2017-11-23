<template>
    <div class="app">
        <router-view>
        </router-view>
    </div>
</template>

<style>
:root {
    --ui-default: #dee5e8;
    --ui-default--inverse: #555;
    --ui-primary: #628395;
    --ui-primary--inverse: #fff;
    --ui-secondary: #27b9cc;
    --ui-secondary--inverse: #fff;
    --ui-muted: #d6d6d0;
    --ui-muted--inverse: #fff;
    --ui-failure: ##ff5a5f;
    --ui-failure--inverse: #fff;

    --body__bg: #fff;
    --body__color: #747c84;
}

html, body {
    padding: 0;
    margin: 0;
    font: 14px/24px 'Libre Franklin', sans-serif;
    background: var(--body__bg);
    color: var(--body__color);
}

h1 {
    font-size: 34px;
    line-height: 40px;
    font-weight: 300;
    margin: 1em 0;
    color: var(--ui-default--inverse);
}

h2 {
    font-size: 24px;
    line-height: 28px;
    font-weight: normal;
    color: var(--ui-default--inverse);
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
