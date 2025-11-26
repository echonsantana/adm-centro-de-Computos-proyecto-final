// Funciones para la presentación
function startPresentation() {
    showModal(`
        <h2>🎤 ¡PRESENTACIÓN INICIADA!</h2>
        <p><strong>Guía de 10 minutos:</strong></p>
        <ul>
            <li>• Min 1-2: Introducción y problema</li>
            <li>• Min 3-4: Solución técnica (VLANs + IP)</li>
            <li>• Min 5-6: Seguridad y costos</li>
            <li>• Min 7-8: Comparativas y recomendación</li>
            <li>• Min 9-10: Conclusión y preguntas</li>
        </ul>
        <p style="margin-top: 15px; color: #27ae60; font-weight: bold;">¡Buena suerte con tu exposición!</p>
    `);
}

function showConfig() {
    showModal(`
        <h2>⚙️ Configuración Switch L3</h2>
        <div class="config-code">
            <pre>
vlan 10
 name ADMINISTRACION
!
vlan 20
 name VENTAS
!
vlan 30
 name FINANZAS
!
vlan 40
 name INVITADOS
!
vlan 50
 name SOPORTE
!
interface vlan10
 ip address 192.168.10.1 255.255.255.0
!
interface vlan20
 ip address 192.168.20.1 255.255.255.0
!
ip dhcp snooping
ip dhcp snooping vlan 10,20,30,40,50
!
interface range gigabitethernet0/1-24
 ip dhcp snooping trust
            </pre>
        </div>
    `);
}

function showDemo() {
    showModal(`
        <h2>🔍 Demo Técnica</h2>
        <p><strong>Comandos ejecutados en la demostración:</strong></p>
        <div class="demo-commands">
            <div class="command-item">
                <span class="command-badge">show vlan brief</span>
                <span>→ Lista todas las VLANs configuradas</span>
            </div>
            <div class="command-item">
                <span class="command-badge">show ip route</span>
                <span>→ Muestra tabla de enrutamiento</span>
            </div>
            <div class="command-item">
                <span class="command-badge">show interface status</span>
                <span>→ Estado de interfaces</span>
            </div>
            <div class="command-item">
                <span class="command-badge">show dhcp snooping</span>
                <span>→ Verifica seguridad DHCP</span>
            </div>
            <div class="command-item">
                <span class="command-badge">show port-security</span>
                <span>→ Estado de seguridad de puertos</span>
            </div>
        </div>
        <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px;">
            <strong>✅ Todos los comandos ejecutados exitosamente</strong>
        </div>
    `);
}

// Sistema de modales
function showModal(content) {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">×</button>
            ${content}
            <div class="modal-actions">
                <button class="btn modal-btn" onclick="closeModal()">Cerrar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Animación de entrada
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
}

function closeModal() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// Cerrar modal con ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Efectos interactivos
function initAnimations() {
    // Efecto hover en tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Efecto de escritura en consola
    const consoleCommands = document.querySelectorAll('.console .command');
    consoleCommands.forEach(cmdElement => {
        if (!cmdElement.hasAttribute('data-animated')) {
            const originalText = cmdElement.textContent;
            cmdElement.textContent = '';
            cmdElement.setAttribute('data-animated', 'true');
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < originalText.length) {
                    cmdElement.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 30);
        }
    });

    // Efecto en botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// script.js - AGREGAR ESTO AL FINAL

// Función para crear el fondo de redes
function createNetworkBackground() {
    const bg = document.getElementById('networkBackground');
    if (!bg) return;
    
    const nodes = [];
    const numNodes = 20;
    
    // Crear nodos
    for (let i = 0; i < numNodes; i++) {
        const node = document.createElement('div');
        node.classList.add('node');
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        node.style.left = `${x}vw`;
        node.style.top = `${y}vh`;
        node.style.animationDelay = `${Math.random() * 4}s`;
        node.style.opacity = 0.3 + Math.random() * 0.4;
        
        bg.appendChild(node);
        nodes.push({ x, y, element: node });
    }
    
    // Crear conexiones
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const distance = Math.sqrt(
                Math.pow(nodes[i].x - nodes[j].x, 2) + 
                Math.pow(nodes[i].y - nodes[j].y, 2)
            );
            
            if (distance < 25) {
                const connection = document.createElement('div');
                connection.classList.add('connection');
                
                const deltaX = nodes[j].x - nodes[i].x;
                const deltaY = nodes[j].y - nodes[i].y;
                
                const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
                
                connection.style.width = `${length}vw`;
                connection.style.left = `${nodes[i].x}vw`;
                connection.style.top = `${nodes[i].y}vh`;
                connection.style.transform = `rotate(${angle}deg)`;
                connection.style.opacity = 0.1 + Math.random() * 0.15;
                
                bg.appendChild(connection);
            }
        }
    }
    
    // Crear paquetes de datos animados
    for (let i = 0; i < 6; i++) {
        const packet = document.createElement('div');
        packet.classList.add('data-packet');
        
        packet.style.left = `${Math.random() * 100}vw`;
        packet.style.top = `${Math.random() * 100}vh`;
        packet.style.animationDelay = `${Math.random() * 8}s`;
        
        bg.appendChild(packet);
    }
}

// Inicializar el fondo cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    createNetworkBackground();
    // ... el resto de tu código de inicialización
});

// script.js - AGREGAR AL FINAL

// Función para crear el fondo de redes (IDÉNTICA al landing.html)
function createNetworkBackground() {
    const bg = document.getElementById('networkBackground');
    if (!bg) return;
    
    const nodes = [];
    const numNodes = 20;
    
    // Crear nodos
    for (let i = 0; i < numNodes; i++) {
        const node = document.createElement('div');
        node.classList.add('node');
        
        const x = Math.random() * 95;
        const y = Math.random() * 95;
        
        node.style.left = `${x}vw`;
        node.style.top = `${y}vh`;
        node.style.animationDelay = `${Math.random() * 4}s`;
        node.style.opacity = 0.4 + Math.random() * 0.6;
        
        bg.appendChild(node);
        nodes.push({ x, y, element: node });
    }
    
    // Crear conexiones
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const distance = Math.sqrt(
                Math.pow(nodes[i].x - nodes[j].x, 2) + 
                Math.pow(nodes[i].y - nodes[j].y, 2)
            );
            
            if (distance < 25) {
                const connection = document.createElement('div');
                connection.classList.add('connection');
                
                const deltaX = nodes[j].x - nodes[i].x;
                const deltaY = nodes[j].y - nodes[i].y;
                
                const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
                
                connection.style.width = `${length}vw`;
                connection.style.left = `${nodes[i].x}vw`;
                connection.style.top = `${nodes[i].y}vh`;
                connection.style.transform = `rotate(${angle}deg)`;
                connection.style.opacity = 0.1 + Math.random() * 0.2;
                
                bg.appendChild(connection);
            }
        }
    }
    
    // Crear paquetes de datos animados
    for (let i = 0; i < 6; i++) {
        const packet = document.createElement('div');
        packet.classList.add('data-packet');
        
        packet.style.left = `${10 + Math.random() * 80}vw`;
        packet.style.top = `${10 + Math.random() * 80}vh`;
        packet.style.animationDelay = `${Math.random() * 8}s`;
        
        bg.appendChild(packet);
    }
}

// Inicializar el fondo cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    createNetworkBackground();
    initAnimations(); // Tu función existente
});



// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initAnimations);