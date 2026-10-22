document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navegação SPA (Abas do Sidebar)
    const navItems = document.querySelectorAll('.nav-item[data-target]');
    const views = document.querySelectorAll('.view-section');

    function switchView(targetId) {
        // Atualiza botões do menu
        navItems.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-target="${targetId}"]`).classList.add('active');

        // Atualiza as seções visíveis
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
            const target = item.getAttribute('data-target');
            switchView(target);
        });
    });

    // 2. Redirecionamentos de botões vazios para a aba Horários
    const goToHorariosBtns = document.querySelectorAll('.btn-go-horarios');
    goToHorariosBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchView('view-horarios');
        });
    });

    // 3. Simulação de Reserva de Aulas
    let aulasReservadas = [];
    const btnReservarList = document.querySelectorAll('.btn-reservar');
    const agendaCount = document.getElementById('agenda-count');
    const statReservadas = document.getElementById('stat-reservadas');
    const agendaList = document.getElementById('agenda-list');
    const agendaEmpty = document.getElementById('agenda-empty');
    const proximasAulasContainer = document.getElementById('proximas-aulas-container');

    btnReservarList.forEach(btn => {
        btn.addEventListener('click', function() {
            const isReserved = this.classList.contains('btn-black');
            const aulaId = this.getAttribute('data-id');
            const aulaName = this.getAttribute('data-name');
            const aulaTime = this.getAttribute('data-time');

            if (!isReserved) {
                // Realizar reserva
                this.classList.remove('btn-primary');
                this.classList.add('btn-black');
                this.textContent = 'Reservada ✓';
                
                aulasReservadas.push({ id: aulaId, name: aulaName, time: aulaTime });
            } else {
                // Cancelar reserva
                this.classList.add('btn-primary');
                this.classList.remove('btn-black');
                this.textContent = 'Reservar';
                
                aulasReservadas = aulasReservadas.filter(aula => aula.id !== aulaId);
            }

            atualizarAgenda();
        });
    });

    function atualizarAgenda() {
        const count = aulasReservadas.length;
        
        // Atualiza contadores
        agendaCount.textContent = count;
        statReservadas.textContent = count;

        if (count === 0) {
            agendaEmpty.style.display = 'block';
            
            // Retorna empty states
            agendaList.innerHTML = '';
            agendaList.appendChild(agendaEmpty);
            
            proximasAulasContainer.innerHTML = `
                <p>Você ainda não reservou nenhuma aula.</p>
                <button class="btn btn-outline btn-go-horarios" onclick="document.querySelector('[data-target=\\'view-horarios\\']').click()">Ver horários disponíveis</button>
            `;
        } else {
            agendaEmpty.style.display = 'none';
            
            // Limpa as listas
            agendaList.innerHTML = '';
            let painelHtml = '<ul class="grade-list">';

            aulasReservadas.forEach(aula => {
                // Cria card para a tela "Minha Agenda"
                const card = document.createElement('div');
                card.className = 'class-card';
                card.style.marginBottom = '1rem';
                card.innerHTML = `
                    <div class="class-time">${aula.time}<span>Qua 09</span></div>
                    <div class="class-info">
                        <h4>${aula.name}</h4>
                        <p class="class-tags">STATUS: CONFIRMADA</p>
                    </div>
                `;
                agendaList.appendChild(card);

                // Adiciona item na tela "Início -> Próximas Aulas"
                painelHtml += `<li class="grade-item"><strong>${aula.time}</strong> ${aula.name}</li>`;
            });

            painelHtml += '</ul>';
            proximasAulasContainer.innerHTML = painelHtml;
        }
    }
});