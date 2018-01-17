### COMO AÑADIR MIEMBRO PASO A PASO

**Nunca crear ficheros con espacios, siempre hacerlo en minúsculas, no añadir acentos o apóstrofes.**

---

0. No arrancar el servidor aún.

---

1. Añadir datos del miembro:

Añadir los datos pertenecientes al miembro, que se encuentra en ```app/_data/members```. Se debería crear un fichero tipo ```<miembro>.yml```. Ejemplo ```vidal.yml```. Luego añadir el contenido según el miembro.

Cosas complicadas:

- image: es la foto que se va a mostrar de perfil para el miembro. Las fotos están alojadas en ```app/_assets/img/members```. La foto tiene que tener un tamaño de ```120x120``` pixeles. El nombre como cualquier fichero, nada de espacios, acentos, etc. Si quieres puedes utilizar el truco de ```command + shift + 4``` para coger cualquier image. Recuerda que sea cuadrada.
- instagram_id: Es necesario para poder conseguir las imágenes del usuario si queremos mostrarlas a través del banner. Para ello podemos utilizar la web https://smashballoon.com/instagram-feed/find-instagram-user-id/.
- born_location: es para añadir el punto geográfico donde nacio el miembro mochiling. Para esto puedes utilizar esta página: https://www.latlong.net/. Siempre se añade de esta manera```[latitud, longitud]```.
- banner: si queremos que aparezca instagram en la página del miembro, es decir como en el ejemplo. Sino, para no añadirlo, simplemente quitar todo. Recordar que sin ```instagram_id``` no va a funcionar el banner.


Ejemplo:

```
complete_name:      Vidal Máquina
short_desc:
  es:               Viajero por herencia
  en:               Heritage Traveler
image:              vidal.png
gender:             male
role:               expert
languages:          [es, pt, it, gb]
facebook:           vidal.whatever.234388
twitter:            mochilinges
instagram:          mochiling.es
instagram_id:       3286677168
born_location:      [40.412279, -3.88877]
visited_countries:  ["Spain", "France", "Italy", "India", "China", "Australia", "Cuba", "Argentina", "Brazil", "Belgium", "Mexico", "Costa Rica", "Korea, Republic of", "Bosnia and Herzegovina", "Germany", "United Kingdom", "Thailand", "Netherlands", "Panama", "Uruguay", "Paraguay", "Chile", "United States", "Cambodia", "Viet Nam", "Malta", "Portugal", "Greece", "Albania", "Serbia", "Croatia", "Switzerland", "Montenegro", "Zimbabwe", "Turkey", "Slovenia", "San Marino", "Philippines", "Namibia", "Burma", "Morocco", "Malaysia", "Macedonia", "Lao People's Democratic Republic", "Jordan", "Indonesia", "Czech Republic", "Canada", "Botswana", "Austria", "Bolivia", "Andorra", "Austria", "Israel", "Egypt"]
banner:             instagram


```

---

2. Crear la página del contenido del miembro.

Crear un fichero nuevo en la carpeta ```app/members```, de tipo
```<miembro>.html```.

Como ejemplo partimos de: ```vidal.html```

En ese fichero nuevo escribir lo que se necesita para las rutas, basicamente copiarlo de otro que ya haya y sustituir con el nombre del miembro. Ejemplo abajo:

```
---
layout:             member

namespace:          vidal
permalink:          /equipo/vidal/
permalink_en:       /team/vidal/
---

{% tf members/vidal.html %}


```

---

3. Crear contenido del miembro para español e inglés:

En la carpeta ```app/_i18n``` se encuentran los contenidos para ambos lenguajes. ```es``` para español y ```en``` para inglés.

Crear fichero de contenido en inglés en la carpeta ```app/_i18n/en/members``` de tipo ```<miembro>.html```.  Ejemplo: ```vidal.html```

```
<p class="Color Text Text--large">He found two passions while he started working at <a href="http://carto.com">CARTO</a>, maps and travel. So he couldn't say no to Mochiling adventure. His first real Mochiling experience will arrive when he travel around New Zealand in his honeymoon.</p>
```

*Siempre meter contenido entre las etiquetas ```p``` y con el class que aparece en el ejemplo.*

Crear fichero de contenido en español en la carpeta ```app/_i18n/es/members``` de tipo ```<miembro>.html```.  Ejemplo: ```vidal.html```

```
<p class="Color Text Text--large">Encontró dos pasiones mientras empezó a trabajar en <a href="http://carto.com">CARTO</a>, los mapas y viajar. Así que no pudo decir que no a la aventura Mochiling. A pesar de que su primera experiencia Mochiling tendrá lugar este año cuando viaje a Nueva Zelanda por su luna de miel.</p>

```

---

4. Llegado a este punto, arrancar el servidor y comprobar que aparece.


