0. No arrancar el servidor aún.

---

1. Añadir datos de la experiencia:

Añadir los datos pertenecientes a la experiencia, que se encuentra en ```app/_data/experiences```. Se debería crear un fichero tipo ```<pais-experiencia>-<miembro>.yml```.


Cosas complicadas:

- video: coger la ruta del embed de youtube. Ir al video > click share > click embed > coger ruta sin comillas
- image: copiar la ruta de la imagen de instagram e ir a https://www.igeturl.com/, pegar la ruta en el campo de texto y pinchar en Get. Luego te generará una ruta, pinchas ahí, y luego copias la URL de arriba que será la final.


Ejemplo:

```
title:
  en: Cambodia & Viet Nam
  es: Camboya & Vietnam
subtitle:
  en: 
  es: 
short_desc:
  en: The stones soul
  es: El alma de las piedras
date_start: 2012-11-07T00:00:00Z
date_end: 2015-04-01T00:00:00Z
countries: ["Cambodia", "Viet Nam"]
video: https://www.youtube.com/embed/0M_Q4PVdY5w
image: https://scontent-mad1-1.cdninstagram.com/t51.2885-15/e35/13712517_1738665453055121_153553268_n.jpg
instagram_tag: 'mochilingvc'
author: victor

```

---

2. Crear la página del contenido de la experiencia.

Crear un fichero nuevo en la carpeta app/experiences
```<pais-experiencia>-<miembro>.html```

Como ejemplo partimos de: ```india-vidal.html```

2. En ese fichero nuevo escribir lo que se necesita para las rutas, basicamente copiarlo de otro que ya haya y sustituir con el nombre de la experiencia y el miembro. Ejemplo abajo:

```
---
layout:           experience

namespace:        india-vidal
permalink:        /experiencias/vidal/india/
permalink_en:     /experiences/vidal/india/
---

{% tf experiences/india-vidal.html %}

```

---

3. Crear contenido en español e inglés:

En la carpeta ```app/_i18n``` se encuentran los contenidos para ambos lenguajes. ```es``` para español y ```en``` para inglés.

Crear fichero de contenido en inglés en la carpeta ```app/_i18n/en/experiences``` de tipo ```<pais-experiencia>-<miembro>.html```.  Ejemplo:

```
Alaska is different from every other destination in the world. Every day offers an unforgettable memory: Snowboarding until the Pacific shore, drive through the icy roads, glaciers and mountains, unique Native cultures, in a absolutely incomparable frame.
```

Crear fichero de contenido en español en la carpeta ```app/_i18n/es/experiences``` de tipo ```<pais-experiencia>-<miembro>.html```.  Ejemplo:

```
Alaska es distinta de cualquier otro destino del mundo. Cada día brinda un recuerdo imborrable: Hacer snowboard, literalmente hasta el Pacífico, conducir por las heladas carreteras, glaciares y montañas, culturas nativas únicas en un marco absolutamente incomparable.
```

---

4. Llegado a este punto, arrancar el servidor y comprobar que aparece.


