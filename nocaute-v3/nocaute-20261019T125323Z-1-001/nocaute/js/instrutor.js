document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navegação SPA (Abas do Sidebar) - Igual ao do aluno
    const navItems = document.querySelectorAll('.nav-item[data-target]');
    const views = document.querySelectorAll('.view-section');

    function switchView(targetId) {
        navItems.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-target="${targetId}"]`).classList.add('active');

        views.forEach(view => {
            view.classList.remove('active');
            if(view.id === targetId) {
                view.classList.add('active');
            }
        });
        window.scrollTo(0, 0);
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            switchView(item.getAttribute('data-target'));
        });
    });

    // 2. Atalhos para a tela de Chamada (Presenças)
    const goToChamadaBtns = document.querySelectorAll('.btn-go-chamada');
    goToChamadaBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchView('view-presencas');
        });
    });

    // 3. Lógica Funcional de Realizar a Chamada
    const botoesChamada = document.querySelectorAll('.btn-chamada');
    
    botoesChamada.forEach(btn => {
        btn.addEventListener('click', function() {
            // Pega o grupo de botões do aluno atual (a linha da tabela)
            const parentRow = this.closest('tr');
            const btnsNaLinha = parentRow.querySelectorAll('.btn-chamada');
            
            // Remove a classe 'active' de todos os botões daquela linha
            btnsNaLinha.forEach(b => b.classList.remove('active'));
            
            // Ativa apenas o botão clicado
            this.classList.add('active');
        });
    });

    // Lógica para salvar a chamada
    const btnSalvarChamada = document.getElementById('btn-salvar-chamada');
    if(btnSalvarChamada) {
        btnSalvarChamada.addEventListener('click', () => {
            // Verifica se todos os alunos receberam um status
            const totalAlunos = document.querySelectorAll('#tabela-chamada tbody tr').length;
            const alunosAvaliados = document.querySelectorAll('#tabela-chamada tbody tr .btn-chamada.active').length;

            if(alunosAvaliados < totalAlunos) {
                alert("Atenção: Por favor, marque presença ou falta para todos os alunos antes de salvar.");
            } else {
                alert("Chamada salva com sucesso!");
                switchView('view-dashboard');
            }
        });
    }
});