# @vscode/openssl-prebuilt

This is a public package containing static compilations of OpenSSL used in the VS Code CLI, for every platform that we publish on. It's available to install via npm as:

```
npm install --save @vscode/openssl-prebuilt
```

We use this to reduce the amount of compilation done at build time for VS Code, and we compile OpenSSL from signed sources ourselves to ensure supply chain security. This package may be pulled down automatically when building the VS Code CLI from sources, depending on your platform and configuration.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
