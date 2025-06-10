/**
 * JavaScript principal para o site da Igreja Adventista do Sétimo Dia Portuguesa de Everett
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const header = document.getElementById('main-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Função para adicionar classe ao header quando a página é rolada
    function checkScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Toggle do menu mobile
    function toggleMenu() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }

    // Fecha o menu ao clicar em um link (mobile)
    function closeMenuOnClick() {
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
        
        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Rolagem suave para links âncora
    function smoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    
                    window.scrollTo({
                        top: targetPosition - headerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }



    // Versículo do dia
    function loadVersiculoDoDia() {
        const versiculos = [
            {
                texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
                referencia: "João 3:16"
            },
            {
                texto: "Posso todas as coisas naquele que me fortalece.",
                referencia: "Filipenses 4:13"
            },
            {
                texto: "O Senhor é o meu pastor; nada me faltará.",
                referencia: "Salmos 23:1"
            },
            {
                texto: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.",
                referencia: "Salmos 37:5"
            },
            {
                texto: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
                referencia: "Romanos 8:28"
            },
            {
                texto: "Não temais, porque eu sou convosco; não vos assombreis, porque eu sou o vosso Deus; eu vos fortaleço, e vos ajudo, e vos sustento com a destra da minha justiça.",
                referencia: "Isaías 41:10"
            },
            {
                texto: "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento.",
                referencia: "Provérbios 3:5"
            }
        ];

        // Seleciona um versículo baseado no dia do ano
        const agora = new Date();
        const inicioAno = new Date(agora.getFullYear(), 0, 1);
        const diasDoAno = Math.floor((agora - inicioAno) / (24 * 60 * 60 * 1000));
        const indiceVersiculo = diasDoAno % versiculos.length;
        
        const versiculoSelecionado = versiculos[indiceVersiculo];
        
        const textoElement = document.getElementById('versiculo-texto');
        const referenciaElement = document.getElementById('versiculo-referencia');
        
        if (textoElement && referenciaElement) {
            textoElement.textContent = versiculoSelecionado.texto;
            referenciaElement.textContent = versiculoSelecionado.referencia;
        }
    }

    // Animação ao scroll para os elementos
    function animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });

        const animatedElements = document.querySelectorAll('.horario-card, .contato-item, .recurso-card');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Event listeners
    window.addEventListener('scroll', checkScroll);
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Inicialização das funções
    checkScroll();
    closeMenuOnClick();
    smoothScroll();
    loadVersiculoDoDia();
    
    // Iniciar animações apenas se o navegador suportar IntersectionObserver
    if ('IntersectionObserver' in window) {
        animateOnScroll();
    }
}); 