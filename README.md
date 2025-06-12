# 🪨✂️📄 game‑rps‑angular

Juego clásico de **Piedra, Papel o Tijera** creado con **Angular**, ideal para reforzar fundamentos del framework como componentes, servicios y manejo de eventos.

---

## 📋 Tabla de contenidos

* [Características](#-características)
* [Requisitos](#️-requisitos)
* [Instalación](#-instalación)
* [Uso](#-uso)
* [Flujo de juego](#-flujo-de-juego)
* [Arquitectura & estilo](#-arquitectura--estilo)
* [Mejoras posibles](#-mejoras-posibles)
* [Contribuciones](#-contribuciones)
* [Licencia](#-licencia)

---

## 🚀 Características

* Interfaz interactiva donde el usuario elige entre piedra, papel o tijera.
* La aplicación elige la opción de la IA de forma aleatoria.
* Resultado (victoria, derrota o empate) se muestra tras cada ronda.
* Sesión con puntaje acumulado para jugador y máquina.
* Juego responsive, adaptable a móviles y tablets.

---

## ⚙️ Requisitos

* Node.js (≥16 recomendado)
* Angular CLI (instalar con `npm i -g @angular/cli`)

---

## 📦 Instalación

```bash
git clone https://github.com/FrancoDavid/game-rps-angular.git
cd game-rps-angular
npm install
```

---

## 🚚 Uso

```bash
ng serve
```

Luego abre `http://localhost:4200` en tu navegador.

---

## 🎮 Flujo de juego

1. El jugador selecciona su opción: **Piedra**, **Papel** o **Tijera**.
2. La IA elige al azar su jugada.
3. Se determina el resultado según las reglas clásicas:

   * Piedra gana a tijera
   * Tijera gana a papel
   * Papel gana a piedra
4. Se actualizan los puntajes y se muestra el resultado.
5. El jugador puede reiniciar en cualquier momento.

---

## 🏗️ Arquitectura & estilo

* App generada con Angular CLI.
* Componentes clave:

  * `ChoiceButtonComponent` para cada opción
  * `ResultDisplayComponent` para mostrar el resultado
  * `ScoreboardComponent` para manejar el puntaje
* Servicio `GameService` que controla lógica de juego (IA, comparación de jugadas, puntajes).
* Estilos simples y organizados mediante CSS/SCSS siguiendo buenas prácticas, inspirado en ejemplos como este Challenge de Angular para juegos RPS ([github.com][1], [github.com][2]).

---

## 🔧 Mejoras posibles

* Añadir ciclos de juego (first to 3 wins).
* Animaciones para opciones al ser seleccionadas.
* Guardar puntaje en `localStorage`.
* Opción multijugador local o en red.
* Desplegar en GitHub Pages con CI/CD.
* Tests end‑to‑end con Protractor o Cypress.

---

## 🤝 Contribuciones

¡Todas las ideas son bienvenidas! Para contribuir:

1. Haz fork del repositorio.
2. Crea una rama: `feature/tu-mejora`.
3. Añade tu mejora con commits descriptivos.
4. Envía un Pull Request explicando el cambio.

---

## ⚖️ Licencia

Distribuido bajo **MIT**. Consulta `LICENSE` para más detalles.
