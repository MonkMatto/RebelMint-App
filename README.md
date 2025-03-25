# RebelMint App

> This project is an example project for hosting the [RebelMint React Component](https://github.com/MonkMatto/RebelMint) as well as additional tools for contract/token creation and management.

## Notes for Developers

When running this app locally, it's important that Tailwind runs its `watch` command from its root and not the cli. To keep this simple, we've included the correct watch command in the build and dev commands.

To get started:

```bash
npm install
```

```bash
npm run dev
```

(this runs `vite` and `npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch`)
