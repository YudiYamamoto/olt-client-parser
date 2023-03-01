# olt-client-parser

Biblioteca para acessar OLTs multimarcas e transformar em JSON

## Instalação

```bash
$ npm install @thiagozampieri/olt-client-parser
```

## Uso

### Configuração da API

```js
const OLTClientParser = require('@thiagozampieri/olt-client-parser')

const olt = new OLTClientParser({
  brand: 'Huawei',
  model: 'MA5608T',
  firmware: 1.9,
  options: {
    host: '127.0.0.1',
    port: 23,
    username: 'username', // default root
    password: 'password', // default guest
  }
});
```

### Para verificar nivel de permissão do user:

```js
(async () => {
  const data = await olt.displayPermissionByUser('user')
  console.log(data)
})();
```

### Mostra placas do chassi:

```js
(async () => {
  const data = await olt.displayBoard(0)
  console.log(data)  
})();
```
