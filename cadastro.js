// Função para cadastrar um novo cliente
        function cadastrarCliente(event) {
            event.preventDefault(); // Evita o envio do formulário

            // Obtém os valores do formulário
            var nome = document.getElementById('nome').value;
            var email = document.getElementById('email').value;
            var telefone = document.getElementById('telefone').value;

            // Cria um objeto JSON com os dados do cliente
            var novoCliente = {
                nome: nome,
                email: email,
                telefone: telefone
            };

            // Grava o objeto JSON no arquivo "clientes.json"
            gravarClienteNoArquivo(novoCliente);

            // Limpa o formulário após o cadastro
            document.getElementById('nome').value = '';
            document.getElementById('email').value = '';
            document.getElementById('telefone').value = '';

            // Chama a função para renderizar os clientes na página
            renderizarClientes();
        }

        // Função para gravar o cliente no arquivo clientes.json
        function gravarClienteNoArquivo(cliente) {
            var clientes = [];
            
            // Tenta ler o conteúdo do arquivo clientes.json (se existir)
            try {
                var clientesJson = localStorage.getItem('clientes');
                if (clientesJson) {
                    clientes = JSON.parse(clientesJson);
                }
            } catch (error) {
                console.error('Erro ao ler o arquivo clientes.json:', error);
            }

            // Adiciona o novo cliente ao array de clientes
            clientes.push(cliente);

            // Grava o array atualizado no arquivo clientes.json
            try {
                localStorage.setItem('clientes', JSON.stringify(clientes));
            } catch (error) {
                console.error('Erro ao gravar o arquivo clientes.json:', error);
            }
        }

        // Função para renderizar os clientes na página
        function renderizarClientes() {
            var clientesHtml = '';
            
            // Lê os clientes do arquivo clientes.json
            try {
                var clientesJson = localStorage.getItem('clientes');
                var clientes = clientesJson ? JSON.parse(clientesJson) : [];

                clientes.forEach(function(cliente) {
                    clientesHtml += `
                        <div class="response">
                            <strong>Nome:</strong> ${cliente.nome}<br>
                            <strong>Email:</strong> ${cliente.email}<br>
                            <strong>Telefone:</strong> ${cliente.telefone}<br><br>
                        </div>
                    `;
                });
            } catch (error) {
                console.error('Erro ao ler o arquivo clientes.json:', error);
            }

            // Insere o HTML dos clientes na div com o ID "clientes"
            document.getElementById('clientes').innerHTML = clientesHtml;
        }

        // Adiciona o evento de submit ao formulário
        document.getElementById('formCadastro').addEventListener('submit', cadastrarCliente);

        // Chama a função para renderizar os clientes ao carregar a página
        renderizarClientes();
		
		// Função para deletar todos os clientes do armazenamento local
function deletarClientes() {
    // Limpar o armazenamento local
    localStorage.removeItem('clientes');

    // Chamar a função para renderizar os clientes (agora vazia) na página
    renderizarClientes();
}