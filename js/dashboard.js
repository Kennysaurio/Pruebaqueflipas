//======================================
// DASHBOARD - NOVATECH SOLUTIONS
//======================================

// Esperar a que cargue la página
document.addEventListener("DOMContentLoaded", function () {

    //======================================
    // GRÁFICO DE CAPACITACIONES
    //======================================

    const ctx = document.getElementById("graficoCapacitaciones");

    if (ctx) {

        new Chart(ctx, {

            type: "bar",

            data: {

                labels: [
                    "Ene",
                    "Feb",
                    "Mar",
                    "Abr",
                    "May",
                    "Jun"
                ],

                datasets: [{

                    label: "Capacitaciones",

                    data: [5, 8, 6, 10, 12, 9],

                    backgroundColor: [
                        "#0d6efd",
                        "#2196F3",
                        "#00b4ff",
                        "#42a5f5",
                        "#64b5f6",
                        "#90caf9"
                    ],

                    borderRadius: 8

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        display: false

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true

                    }

                }

            }

        });

    }

});
//======================================
// BOTÓN DE NOTIFICACIONES
//======================================

const notification = document.querySelector(".notification");

if (notification) {

    notification.addEventListener("click", function () {

        alert("No tienes nuevas notificaciones.");

    });

}

//======================================
// CONFIRMAR CERRAR SESIÓN
//======================================

const logout = document.querySelector(".logout a");

if (logout) {

    logout.addEventListener("click", function (e) {

        const salir = confirm("¿Desea cerrar la sesión?");

        if (!salir) {

            e.preventDefault();

        }

    });

}

//======================================
// EFECTO EN TARJETAS
//======================================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0) scale(1)";

    });

});

//======================================
// EFECTO EN BOTONES RÁPIDOS
//======================================

const botones = document.querySelectorAll(".quick-buttons button");

botones.forEach(boton => {

    boton.addEventListener("click", function () {

        alert("Esta opción estará disponible en el siguiente módulo.");

    });

});

//======================================
// MENÚ ACTIVO
//======================================

const menuItems = document.querySelectorAll(".menu li");

menuItems.forEach(item => {

    item.addEventListener("click", function () {

        menuItems.forEach(i => i.classList.remove("active"));

        this.classList.add("active");

    });

});

//======================================
// ANIMACIÓN DE ENTRADA
//======================================

window.addEventListener("load", () => {

    document.querySelector(".main-content").style.opacity = "1";

});
