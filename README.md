# 50 días para ti ❤️

Sitio web adaptable a móviles, hecho con HTML, CSS y JavaScript sin frameworks. Esta carpeta está organizada para subir directamente su contenido a la raíz de un repositorio de GitHub.

## Contenido

- `index.html` — página principal y carta inicial.
- `style.css` — diseño y estilos adaptables.
- `script.js` — apertura de frascos, avance diario simulado y persistencia.
- `data/notes.js` — las 100 notitas originales.
- `data/songs.js` — las 50 canciones originales.
- `.nojekyll` — permite servir los archivos estáticos tal cual desde GitHub Pages.

## Progresión

La carta del PDF aparece en la pantalla inicial. Al tocar «¡Entonces, empecemos!», inicia el Día 1 con fecha simulada del 15 de octubre. Cada día tiene dos notitas y una canción; después de abrir ambos frascos, avanza al día siguiente. No espera 24 horas ni depende de la fecha real, y no hay selector para saltar días.

El avance se guarda en `localStorage` del navegador, así que cerrar o recargar la página no reinicia la experiencia. El Día 50 corresponde al 3 de diciembre y muestra el mensaje final al abrir los dos frascos.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube **todo el contenido de esta carpeta** a la raíz del repositorio; `index.html` debe quedar directamente en la raíz.
3. En el repositorio, abre **Settings → Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**; selecciona la rama principal y la carpeta **/ (root)**, y guarda.
5. Cuando GitHub Pages termine la publicación, abre el enlace que muestra en esa misma página.

También puedes abrir `index.html` localmente para revisar el sitio. Google Fonts necesita conexión a internet; hay fuentes de reserva si no está disponible.
