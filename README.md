# Customer Success Balancing

Este é um projeto que implementa a funcionalidade de balanceamento de clientes para a equipe de Customer Success (CS). Ele consiste em distribuir os clientes entre os membros da equipe de CS com base em suas pontuações, garantindo que cada membro tenha uma carga de trabalho equilibrada.

## Funcionalidades

O projeto possui as seguintes funcionalidades:

- <b>handleErrors(errors)</b>: Esta função valida os dados de entrada e verifica se há argumentos faltantes ou inválidos. Ela lança erros caso ocorram problemas.

- <b>getAvailableCustomerSuccess(allCustomerSuccess)</b>:
  Esta função filtra,ordena por score e mapeia os gerentes de sucesso disponíveis com base na lista de exclusão, gerando um novo array de gerentes de sucesso com suas respectivas propriedades e adicionando a propriedade customers para salvar os seus clientes.

- <b>assignCustomersToCustomerSuccess(customers, availableCustomerSuccess)</b>:
  Esta função atribui os clientes aos gerentes de sucesso disponíveis com base em suas pontuações, seguindo a ordem de classificação. Os clientes são adicionados às propriedades customers dos gerentes de sucesso correspondentes.

- <b>findHighestCustomerSuccessId(availableCustomerSuccess)</b>:
  Esta função encontra o ID do gerente de sucesso com o maior número de clientes atribuídos. Em caso de empate, é retornado 0.

## Testes

Para rodar os testes do projeto, siga os passos abaixo:

Instale as dependências necessárias executando `npm install` ou `yarn`.

E o rode o comando `npm test` ou `yarn test`
