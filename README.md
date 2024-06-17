# Ignite - pizzashop

Pizzashop é um projeto que nasceu com um proposito bem simples, mostrar o poder do tanstack query, e como sua manipulação de cache pode mudar completamente a experiencia do usuário na sua aplicação. 

Um dashboard destinado a lojistas, que querem gerir melhor seu negocio, com métricas de seus pedidos, filtragem do pedidos, e claro melhor controle sobre os pedidos.

## Funcionalidades

- **Cadastro de Lojas:** Crie o cadastro da sua loja no dashboard.
- **Login:** Acesse o dashboard, apenas com seu email cadastrado.
- **Edição:** Modifique nome e descrição de sua loja.
- **Pesquisa:** Pesquisar pedidos por nome do cliente, ID e status.
- **Visualização detalhada:** Ao clicar no botão de detalhes em qualquer pedido, será exibido detalhes sobre sua composição, como items do pedido, email do cliente etc.
- **Edição:** Modifique nome e descrição de sua loja.
- **Modificar status do pedido:** Atualize o status do pedido, conforme sua produção.

## Conta demonstração
Este projeto esta integrado a API feita em aulas da Rocketseat, para roda-lo localmente clone este repositório
[pizzashop-api](https://github.com/rocketseat-education/pizzashop-api)
```http
e-mail: diego.schell.f@gmail.com
```

## Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu sistema.

## Como Usar

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/rcnald/ignite-pizzashop-web.git
   # or
   gh repo clone rcnald/ignite-pizzashop-web
   ```
2. **Entrar no diretório**
    ```bash
    cd ignite-pizzashop-web
    ```
  
3. **Instalar suas dependências**
   
    ```
    npm install
    ```
4. **Crie e configure o arquivo de configuração**

    Crie um arquivo `.env.local` na raiz do projeto, com base no `.env.example`

    ```ts
    VITE_API_URL=api_url
    VITE_ENABLE_API_DELAY="false"
    ```
5. **Iniciar o projeto**
    ```
    npm run dev
    ```
    Logo após isso o projeto será iniciado na porta [http://localhost:5173](http://localhost:5173) se disponível.

## Principais tecnologias usadas
Tecnologias e bibliotecas utilizadas para a construção do projeto. 
- [react](https://react.dev/)
- [typescript](https://www.typescriptlang.org/)
- [axios](https://axios-http.com/docs/intro)
- [zod](https://zod.dev/)
- [react-hook-form](https://react-hook-form.com/)
- [tanstackquery](https://tanstack.com/query/latest/docs/framework/react/overview)
- [vite](https://vitejs.dev/guide/env-and-mode)