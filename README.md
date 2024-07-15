## Description

The repository NestJS with Vault (HashiCorp).

## Installation

### Install source
```bash
$ pnpm install
```

### Docker for Vault of Hashicorp

```bash
$ docker-compose -f docker/docker-compose.vault.yml up -d
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Configs Vault

### Login into Vault
Method: Token
Token: Read "Root Token" in logs of container



## Stay in touch

- Author - [Khai Nguyen]

## Refer Docs
- [Docs](https://codersociety.com/blog/articles/hashicorp-vault-node)