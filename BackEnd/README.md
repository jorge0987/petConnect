# crie um arquivo .env na raiz do backend e insira o DATABASE_URL e JWT_SECRET

DATABASE_URL="file:./dev.db"
JWT_SECRET="ProjectVV"

# Para executar o programa siga os passos abaixo

1 - npm i

2 - npx prisma db pull

3 - npx prisma generate

4 - npm run start:dev
