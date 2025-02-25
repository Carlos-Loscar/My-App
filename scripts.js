document.addEventListener("DOMContentLoaded", function () {
    const table = document.querySelector("table");
    const btnNovo = document.querySelectorAll(".buttons")[0];
    const btnGravar = document.querySelectorAll(".buttons")[1];
    const btnConsultar = document.querySelectorAll(".buttons")[2];

    // Função para adicionar uma nova linha na tabela
    function adicionarLinha() {
        const publicador = prompt("Digite o nome do publicador:");
        if (!publicador) return;

        const funcao = prompt("Digite a função do publicador:");
        if (!funcao) return;

        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `<td>${publicador}</td><td>${funcao}</td><td><button class="remover">🗑️</button></td>`;

        table.appendChild(novaLinha);
        adicionarEventosRemover();
    }

    // Função para salvar os dados da tabela no localStorage
    function gravarDados() {
        const dados = [];
        const linhas = table.querySelectorAll("tr");

        linhas.forEach((row, index) => {
            if (index === 0) return; // Pula o cabeçalho
            const colunas = row.querySelectorAll("td");
            if (colunas.length > 1) {
                dados.push({ publicador: colunas[0].textContent, funcao: colunas[1].textContent });
            }
        });

        localStorage.setItem("tabelaDesignacoes", JSON.stringify(dados));
        alert("Dados gravados com sucesso!");
    }

    // Função para carregar os dados salvos no localStorage
    function consultarDados() {
        const dados = JSON.parse(localStorage.getItem("tabelaDesignacoes")) || [];
        table.innerHTML = "<tr><th>Publicador</th><th>Função</th><th>Ação</th></tr>"; // Reseta a tabela

        dados.forEach(item => {
            const novaLinha = document.createElement("tr");
            novaLinha.innerHTML = `<td>${item.publicador}</td><td>${item.funcao}</td><td><button class="remover">🗑️</button></td>`;
            table.appendChild(novaLinha);
        });

        adicionarEventosRemover();
    }

    // Função para remover uma linha ao clicar no botão de deletar
    function adicionarEventosRemover() {
        document.querySelectorAll(".remover").forEach(btn => {
            btn.onclick = function () {
                this.parentNode.parentNode.remove();
            };
        });
    }

    // Eventos de clique
    btnNovo.addEventListener("click", adicionarLinha);
    btnGravar.addEventListener("click", gravarDados);
    btnConsultar.addEventListener("click", consultarDados);

    // Adiciona botões de remoção para as linhas existentes
    function adicionarBotaoRemover() {
        table.querySelectorAll("tr").forEach((row, index) => {
            if (index === 0) return; // Pula o cabeçalho
            if (!row.querySelector(".remover")) {
                const btnRemover = document.createElement("td");
                btnRemover.innerHTML = '<button class="remover">🗑️</button>';
                row.appendChild(btnRemover);
            }
        });

        adicionarEventosRemover();
    }

    adicionarBotaoRemover();
});
