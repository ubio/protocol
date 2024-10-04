in devcontainer [devd](https://github.com/cortesi/devd) is preinstalled, so workflow is following:

- `npm i`
- `vim src/schema/`
- `npm run build`
- `devd -p 8080 public`

reasons:

- to much configuration needed to run nginx unprivileged and for custom folder
- `npm dev` is not really working, does not rebuild public/ etc
