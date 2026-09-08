# GESTIÓN 360 — UI/UX DESIGN SYSTEM RULES

**Tipo:** Estándar objetivo de diseño de Gestión 360  
**Estado:** Aprobado como base para revisión e implementación progresiva  
**Versión:** 1.1  
**Ámbito:** Aplicación web Gestión 360, con especial atención al módulo Docente  
**Fuente de autoridad:** tokens y componentes existentes en `frontend/src`

## Estado de implementación

Este documento define el estándar objetivo de diseño de Gestión 360. No representa una afirmación de que el proyecto actual ya cumpla todas las reglas.

Algunas reglas están IMPLEMENTADAS, otras están PARCIALMENTE IMPLEMENTADAS y otras son OBJETIVO o PROPUESTAS para futuras implementaciones. La existencia de un token o componente no implica que todas las páginas actuales lo utilicen de forma uniforme.

Estados utilizados en este documento:

- **IMPLEMENTADO:** existe evidencia directa y consistente en el código actual.
- **PARCIALMENTE IMPLEMENTADO:** existe una base funcional, pero hay diferencias, excepciones o cobertura incompleta.
- **OBJETIVO:** regla que debe cumplirse en nuevas implementaciones y aplicarse progresivamente a las áreas modificadas.
- **PROPUESTO:** decisión de gobierno o evolución futura del sistema que todavía no está implementada como mecanismo técnico.

## Principio central

**misma identidad visual → misma familia de componentes → composición diferente según función.**

Gestión 360 debe conservar una identidad reconocible sin obligar a que todas las páginas, cards o composiciones sean idénticas. La consistencia se logra reutilizando principios, tokens y familias de componentes; la composición puede variar según el contenido y la función.

## Jerarquía de autoridad visual

**Estado: OBJETIVO**

Para resolver una necesidad visual, el orden recomendado es:

1. Reutilizar un componente UI existente.
2. Reutilizar un token existente en `frontend/src/styles/token.css`.
3. Extender el componente o token existente de forma reusable.
4. Crear una solución nueva únicamente cuando la necesidad sea real, repetible y no esté cubierta por lo anterior.

La documentación debe utilizar exactamente los nombres reales de los tokens. Los nombres de radios vigentes son `--border-radius-xs`, `--border-radius-sm`, `--border-radius-md`, `--border-radius-lg`, `--border-radius-xl` y `--border-radius-full`.

Las referencias principales son:

- Tokens: `frontend/src/styles/token.css`.
- Tipografía, contenedores y utilidades globales: `frontend/src/styles/global.css` y `frontend/src/styles/reset.css`.
- Controles: `Button`, `Input`, `Select` y `Textarea`.
- Superficies: `Card` y `Modal`.
- Navegación: `Navbar` y `NavbarModulo`.
- Patrones de referencia del módulo Docente: sus páginas y componentes actuales.

## 1. Colores permitidos y uso

**Estado: PARCIALMENTE IMPLEMENTADO; regla de uso: OBJETIVO**

Los colores deben consumirse mediante variables CSS semánticas existentes. Los valores actuales están definidos en `token.css`.

| Token existente | Uso objetivo |
| --- | --- |
| `--color-primary` | Marca principal, navbar, CTA principal, enlaces importantes, foco activo y encabezados de tabla. |
| `--color-primary-light` | Variantes activas, cabeceras destacadas y énfasis primario secundario. |
| `--color-primary-dark` | Fondos o textos primarios de mayor profundidad visual. |
| `--color-primary-tint` | Selecciones, resaltados y fondos primarios suaves. |
| `--color-accent` | Énfasis de marca, acciones destacadas y estados parciales cuando corresponda. |
| `--color-accent-dark` | Hover, bordes o énfasis oscuro del acento. |
| `--color-accent-tint` | Fondos suaves del acento. |
| `--color-success` / `--color-success-tint` | Confirmado, guardado, aprobado, presente o completado. |
| `--color-error` / `--color-error-tint` | Error, validación, eliminación o fallo. |
| `--color-warning` / `--color-warning-tint` | Precaución, advertencia y estado intermedio. |
| `--color-info` / `--color-info-tint` | Información, consulta y ayuda no crítica. |
| `--color-critical` / `--color-critical-tint` | Severidad alta y situaciones críticas. |
| `--color-document` / `--color-document-tint` | PDF, exportación y acciones documentales. |
| `--text-primary` | Texto principal. |
| `--text-secondary` | Texto secundario y labels. |
| `--text-muted` | Metadata, placeholder y ayuda. |
| `--text-on-primary` | Texto sobre superficies primarias. |
| `--text-on-accent` | Texto sobre superficies de acento. |
| `--bg-page` | Fondo principal de la página. |
| `--bg-card` | Superficies de cards. |
| `--bg-subtle` | Fondos secundarios y estados deshabilitados. |
| `--bg-overlay` | Overlay de modales y superficies superpuestas. |
| `--border-color` / `--border-color-grey` | Bordes estructurales y controles. |
| `--border-focus` | Indicador de foco. |

Reglas:

- El código nuevo **DEBE** utilizar el token semántico que corresponda a la intención.
- El color **NO DEBE** ser el único indicador de estado.
- Las variaciones deben resolverse primero con tintes existentes o `color-mix()` a partir de tokens existentes.
- `--color-module` solo debe utilizarse dentro del contexto de los módulos que ya lo definen.
- Los colores hardcodeados existentes deben tratarse como deuda de migración, no como nuevos precedentes.

## 2. Tipografía y jerarquía de títulos

**Estado: PARCIALMENTE IMPLEMENTADO; regla de uso: OBJETIVO**

- `--font-body` (`Inter`) debe utilizarse para cuerpo, formularios, tablas, navegación y texto operativo.
- `--font-heading` (`Lexend`) debe utilizarse para títulos y encabezados.
- `--font-display` (`Namaku`) puede utilizarse para marca, hero o piezas de alto impacto.
- `Namaku` no debe utilizarse en formularios, tablas, modales o listados densos.

Jerarquía recomendada usando tokens existentes:

| Nivel | Token recomendado | Uso |
| --- | --- | --- |
| `h1` | `--fs-3xl` o `--fs-4xl` | Título de página o hero. |
| `h2` | `--fs-2xl` | Sección principal. |
| `h3` | `--fs-xl` | Bloque o sección secundaria. |
| `h4` | `--fs-lg` | Card, panel o agrupación. |
| `h5` / `h6` | `--fs-base` o `--fs-sm` | Microjerarquía justificada. |
| Texto auxiliar | `--fs-sm` o `--fs-xs` | Metadata, ayuda, fechas y estados. |

La jerarquía anterior es recomendada. No se declara como aplicación uniforme actual porque las páginas existentes todavía mezclan tokens con valores locales.

## 3. Escala de espaciado

**Estado: IMPLEMENTADO como token; aplicación general: PARCIALMENTE IMPLEMENTADA; regla de uso: OBJETIVO**

La escala base de `token.css` es de 4 px:

`--space-1` 4 px, `--space-2` 8 px, `--space-3` 12 px, `--space-4` 16 px, `--space-5` 20 px, `--space-6` 24 px, `--space-8` 32 px, `--space-10` 40 px, `--space-12` 48 px y `--space-16` 64 px.

- `--space-2` y `--space-3`: separación interna pequeña.
- `--space-4` y `--space-6`: separación estándar de componentes y bloques.
- `--space-8` o superior: separación entre secciones.

Todo margen, padding o gap nuevo debe preferir esta escala. Los valores locales existentes no deben ampliarse y deben migrarse cuando se modifique el área correspondiente.

## 4. Border-radius

**Estado: IMPLEMENTADO como tokens; aplicación general: PARCIALMENTE IMPLEMENTADA; regla de uso: OBJETIVO**

| Token existente | Valor | Uso objetivo |
| --- | --- | --- |
| `--border-radius-xs` | 4 px | Checks, chips y elementos compactos. |
| `--border-radius-sm` | 8 px | Inputs, botones y superficies pequeñas. |
| `--border-radius-md` | 10 px | Cards, modales, paneles y contenedores principales. |
| `--border-radius-lg` | 16 px | Superficies grandes o de tratamiento amable. |
| `--border-radius-xl` | 18 px | Casos especiales ya existentes. |
| `--border-radius-full` | 9999 px | Pills, badges circulares y avatares. |

El código nuevo no debe crear radios intermedios. Los radios hardcodeados existentes no deben convertirse automáticamente en nuevos tokens sin una decisión del sistema.

## 5. Sombras

**Estado: IMPLEMENTADO como tokens; aplicación general: PARCIALMENTE IMPLEMENTADA; regla de uso: OBJETIVO**

Tokens disponibles:

- `--shadow-xs`: controles y superficies discretas.
- `--shadow-sm`: navegación, dropdowns y elementos flotantes ligeros.
- `--shadow-md`: cards y contenedores estándar.
- `--shadow-lg`: modales, paneles elevados y superficies de máxima prioridad.

Las nuevas superficies deben preferir estos tokens. El proyecto actual todavía contiene sombras locales en cards, navbar y páginas Docente; esas sombras no deben tomarse como nuevos precedentes sin revisión.

## 6. Alturas y tamaños de botones

**Estado: PARCIALMENTE IMPLEMENTADO; regla futura: OBJETIVO**

El componente `Button` implementa tamaños de icon-only de 32 px, 40 px y 48 px mediante `width` y `height`. Los tamaños normales `sm`, `md` y `lg` utilizan padding y no establecen una altura fija uniforme.

Regla objetivo:

- Compacto: aproximadamente 32 px para acciones densas justificadas.
- Estándar: aproximadamente 40 px para toolbars y acciones secundarias.
- Principal: aproximadamente 48 px para CTA y acciones de formulario.
- Área táctil: el control interactivo importante debe ofrecer al menos 44 x 44 px.

La altura efectiva de cada variante debe validarse antes de declararse un valor contractual del sistema.

## 7. Variantes de botones

**Estado: PARCIALMENTE IMPLEMENTADO; regla de uso: OBJETIVO**

Existen las variantes `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`, `critical`, `accent`, `document`, `outline-primary`, `outline-danger` y `outline-white`.

Uso objetivo:

- `primary`: acción principal, guardar, enviar o continuar.
- `secondary`: editar, consultar o ver detalle.
- `success`: confirmar o completar.
- `danger`: eliminar o acción irreversible.
- `warning`: advertir o salir sin guardar.
- `info`: consultar o cargar información.
- `light`: cancelar o cerrar.
- `dark`: volver o navegación secundaria de alto contraste.
- `critical`: severidad alta.
- `accent`: crear o acción destacada de marca.
- `document`: PDF, exportar o descargar.
- `outline-*`: acciones terciarias o uso sobre fondos complejos.

Las formas disponibles son `square`, `rounded` y `pill`, implementadas mediante `btn-shape-square`, `btn-shape-rounded` y `btn-shape-pill`.

Las variantes actuales contienen fallbacks y valores locales que deben considerarse deuda técnica. Si ninguna variante cubre una necesidad, debe evaluarse primero una extensión reusable de `Button`.

## 8. Inputs, selects y textareas

**Estado: PARCIALMENTE IMPLEMENTADO; regla de uso: OBJETIVO**

Los componentes de referencia son `Input`, `Select` y `Textarea`.

- La altura de `Input` y `Select` utiliza `--form-control-height`, actualmente 48 px.
- Los radios utilizan `--form-control-radius-rounded` y `--form-control-radius-square`.
- Los paddings horizontales utilizan `--form-control-padding-x-rounded` y `--form-control-padding-x-square`.
- El borde normal utiliza `--border-color-grey`.
- El foco utiliza `--border-focus` y `--focus-ring`.
- Los errores utilizan `--color-error`.
- El estado disabled utiliza `--bg-subtle` y `--opacity-disabled`.
- Los labels y mensajes deben conservar asociación semántica y espacio estable.

El `Textarea` actual permite resize `none`, `vertical`, `horizontal` y `both`. Por tanto, el estándar futuro debe recomendar `vertical` como opción preferida, pero no afirmar que es la única opción actualmente implementada.

## 9. Cards

**Estado: PARCIALMENTE IMPLEMENTADO; regla de familia: OBJETIVO**

Existen las familias `ModuleCard`, `ReportCard`, `ObserverCard`, `NewCard` y `ServiceCard`. No deben ser visualmente idénticas: cada una puede variar según su función, densidad, contenido e interacción.

Todas las cards nuevas deben pertenecer a una familia coherente y reutilizar, cuando corresponda:

- `--bg-card` o `--bg-subtle`.
- `--border-color` o `--border-color-grey`.
- Los tokens `--border-radius-*`.
- Los tokens `--shadow-*`.
- La escala `--space-*`.
- Estados de hover, selected, disabled y focus comprensibles.

Una card debe representar una unidad de información, selección o acción. No debe utilizarse solo para decorar o separar una página larga. La decisión de usar una card debe depender de la función, no de una obligación de convertir todo contenido en card.

## 10. Modales

**Estado: PARCIALMENTE IMPLEMENTADO; requisito futuro: OBJETIVO**

El componente `Modal` implementa actualmente:

- Overlay con `--bg-overlay` y `backdrop-filter`.
- Ancho máximo de 600 px.
- Alto máximo de 90 vh.
- `--border-radius-md`.
- `--shadow-lg`.
- Estructura de header, body y footer.
- Botón de cierre de 40 px.
- Rol `dialog`, `aria-modal`, `aria-labelledby`, cierre con Escape y foco inicial del diálogo.

El estándar objetivo exige además:

- Focus trap mientras el modal está abierto.
- Restauración del foco al control que abrió el modal.
- Cierre accesible y consistente con teclado.
- Prohibición de modales anidados salvo una excepción justificada.

No se declara que focus trap y restauración de foco estén completamente implementados en el proyecto actual.

## 11. Tablas

**Estado: PARCIALMENTE IMPLEMENTADO; regla futura: OBJETIVO**

La base global define tablas de ancho completo y `border-collapse`. Attendance y Assessment implementan contenedores con `overflow-x: auto`.

Reglas objetivo:

- Usar encabezados claros y cortos.
- Mantener comparación de columnas cuando sea funcionalmente importante.
- Usar tokens semánticos para estados y superficies.
- Utilizar acciones compactas sin perder foco visible ni área táctil.
- Preferir scroll horizontal en móvil antes que comprimir el contenido hasta hacerlo ilegible.
- No transformar automáticamente una tabla en cards si se pierde la relación entre filas y columnas.

`AssessmentTable` y algunos resúmenes de `AttendanceTable` todavía contienen valores hardcodeados. Esos valores no deben convertirse en referencia normativa.

## 12. Badges y estados

**Estado: PARCIALMENTE IMPLEMENTADO; sistema unificado: OBJETIVO**

El proyecto contiene badges y estados locales, como el badge de notificaciones de 18 px, badges de pasos y estados de asistencia.

Mapeo objetivo:

- Presente, aprobado, guardado o completado: `--color-success` y `--color-success-tint`.
- Ausente, error o fallido: `--color-error` y `--color-error-tint`.
- Retardo o atención primaria: `--color-primary` y `--color-primary-tint`.
- Parcial o énfasis: `--color-accent` y `--color-accent-tint`.
- Advertencia: `--color-warning` y `--color-warning-tint`.
- Información: `--color-info` y `--color-info-tint`.
- Severidad alta: `--color-critical` y `--color-critical-tint`.
- Documento: `--color-document` y `--color-document-tint`.

El color no debe ser el único indicador. Debe acompañarse de texto, icono, patrón o estructura. La existencia de estados locales no implica que exista actualmente un componente Badge global.

## 13. Iconos

**Estado: PARCIALMENTE IMPLEMENTADO; regla de referencia: OBJETIVO**

`Material Symbols Outlined` es la familia de referencia visible en navbar, navegación, cards y páginas Docente.

Tamaños recomendados:

- 18 a 20 px en inputs, selects y badges.
- 24 px en botones y acciones.
- 28 px en navbar y navegación superior.
- 44 px o más en cards, hero y estados ilustrativos.

Los iconos interactivos deben tener nombre accesible, foco visible y área táctil suficiente. No se establece que Material Symbols sea la única familia técnicamente utilizada o permitida, porque el componente `Button` también admite iconos mediante props.

## 14. Headers de páginas

**Estado: PARCIALMENTE IMPLEMENTADO; patrón futuro: OBJETIVO**

El patrón de referencia del dashboard Docente contiene `NavbarModulo`, título de página y fecha. `global.css` también ofrece `container`, `page-wrapper`, `eyebrow`, `section-title`, `section-subtitle` y `divider`.

El estándar objetivo recomienda que toda página tenga:

1. Título corto y descriptivo.
2. Subtítulo, fecha o contexto cuando aporte información.
3. Acciones relacionadas, agrupadas y previsibles.

No existe actualmente un componente único de header obligatorio para todas las páginas. Las nuevas páginas deben reutilizar los patrones globales cuando correspondan, sin afirmar que toda la aplicación ya los utiliza uniformemente.

## 15. Layout de las páginas del módulo Docente

**Estado: PARCIALMENTE IMPLEMENTADO; clasificación: PATRONES DE REFERENCIA**

Los layouts siguientes describen patrones existentes, no restricciones absolutas:

- **Dashboard:** `TeacherPage.css` utiliza un grid de seis columnas, tarjetas con spans diferentes, dos columnas bajo 1100 px y una columna bajo 700 px.
- **Vista operativa:** `ClassworkPage.css` utiliza un layout `2fr 1fr` para contenido principal y panel lateral.
- **Vista de reporte:** `ReportPage.css` utiliza un contenedor central y un grid con `minmax(600px, 1fr)`.
- **Navegación de módulo:** `NavbarModulo` funciona como contexto superior del módulo.

Estos patrones deben preferirse cuando resuelvan la necesidad. Puede crearse una composición diferente si el contenido, la densidad o el flujo lo requieren y la decisión mantiene la identidad visual del módulo.

## 16. Responsive

**Estado: PARCIALMENTE IMPLEMENTADO; recomendación futura: OBJETIVO**

Tokens de breakpoint existentes:

- `--bp-sm`: 640 px.
- `--bp-md`: 768 px.
- `--bp-lg`: 1024 px.
- `--bp-xl`: 1280 px.
- `--bp-2xl`: 1536 px.

Breakpoints observados actualmente en distintos componentes y páginas incluyen 480, 599, 600, 700, 768, 968, 1023, 1024 y 1100 px. Por tanto, los tokens anteriores no representan una unificación ya aplicada.

Regla objetivo para nuevas implementaciones:

- Preferir `--bp-sm`, `--bp-md`, `--bp-lg`, `--bp-xl` y `--bp-2xl`.
- Diseñar mobile-first cuando el flujo lo permita.
- Menos de 640 px: priorizar una columna, controles legibles y acciones apiladas cuando sea necesario.
- Entre 640 y 1023 px: reorganizar el contenido según espacio y función.
- Desde 1024 px: habilitar paneles laterales y composiciones más densas cuando correspondan.
- Mantener un área táctil objetivo de 44 x 44 px para controles importantes.

## 17. Accesibilidad WCAG 2.2

**Estado: PARCIALMENTE IMPLEMENTADO; cumplimiento: PENDIENTE DE VALIDACIÓN**

### Soporte actualmente existente

- `:focus-visible` global en `reset.css`.
- Soporte de `prefers-reduced-motion` en `reset.css`.
- Labels asociados y atributos `aria-invalid` y `aria-describedby` en los controles principales.
- Roles y atributos ARIA básicos en `Modal`.
- Etiquetas accesibles en varios botones de navbar y controles icon-only.

### Requisitos del estándar

- Todo flujo nuevo debe ser operable con teclado.
- Todo control debe tener foco visible y nombre accesible.
- Los formularios deben asociar labels, ayuda y errores.
- Los estados no deben depender únicamente del color.
- Los modales deben gestionar foco, Escape y retorno al origen.
- Las interfaces deben respetar `prefers-reduced-motion`.
- La información no debe depender únicamente de hover, color o animación.

### Pendientes de validación

- Contraste 4.5:1 para texto normal y 3:1 para texto grande o componentes relevantes.
- Verificación completa de teclado en todas las páginas Docente.
- Focus trap y restauración de foco en modales.
- Comportamiento con zoom y tamaños de pantalla extremos.
- Validación con lector de pantalla.

Este documento no declara que Gestión 360 cumpla actualmente de forma completa WCAG 2.2 AA.

## 18. Cuándo utilizar Cards y cuándo no

**Estado: PROPUESTO; regla futura: OBJETIVO**

Usar cards cuando:

- El contenido sea autocontenido, resumible o seleccionable.
- Exista una acción primaria clara.
- Se agrupen módulos, noticias, reportes o servicios con identidad propia.

No usar cards cuando:

- Solo separen visualmente una página larga sin necesidad funcional.
- El contenido sea una tabla densa, un formulario extenso o un flujo lineal.
- La superficie sea únicamente estructural.
- Un panel, una sección o una tabla existente resuelva mejor el caso.

Las cards deben pertenecer a una familia coherente, no ser visualmente idénticas. Cada variación debe justificarse por función, contenido o interacción.

## 19. Reglas sobre colores hardcodeados

**Estado: PROPUESTO; cumplimiento actual: NO CONFIRMADO**

Para código nuevo:

- No introducir colores hexadecimales, nombres de color o valores RGB cuando exista un token equivalente.
- Usar `token.css` como origen de valores semánticos repetibles.
- Usar `color-mix()` a partir de tokens existentes para variaciones.
- Si un color aparece en más de un componente con la misma intención semántica, evaluar una extensión del sistema.
- Documentar cualquier excepción por archivo, selector, motivo y alcance.

El proyecto actual contiene colores hardcodeados en distintos componentes y páginas. Esta regla define un objetivo de implementación futura y no describe el estado actual.

## 20. Prevención de inconsistencias en nuevas páginas

**Estado: PROPUESTO; aplicación actual: PARCIALMENTE IMPLEMENTADA**

Antes de implementar una pantalla, el responsable debe comprobar:

1. Qué componente existente cubre cada control.
2. Qué tokens reales cubren color, tipografía, espaciado, radio y sombra.
3. Qué patrón de referencia del módulo corresponde.
4. Qué estados de carga, vacío, error, éxito, disabled y foco necesita.
5. Cómo se comporta en móvil, tablet y escritorio.

Reglas objetivo:

- Reutilizar componentes antes de copiar estilos.
- Extender componentes antes de crear variantes locales.
- Usar tokens existentes antes de crear valores nuevos.
- No crear grids, headers o superficies paralelas sin necesidad documentada.
- No mezclar patrones de páginas distintas sin reconciliarlos con este estándar.
- No declarar una pantalla conforme únicamente porque funciona visualmente en escritorio.

## Proceso de excepciones y evolución

**Estado: PROPUESTO**

Una excepción debe aprobarse únicamente cuando exista una necesidad funcional, técnica o de accesibilidad que el sistema actual no cubra.

Debe registrar:

- Regla afectada.
- Motivo y alcance.
- Alternativas consideradas.
- Impacto en responsive y accesibilidad.
- Si debe convertirse posteriormente en un token, componente o patrón reusable.

## Checklist de aceptación para PRs

**Estado: PROPUESTO**

Una nueva página o componente debería revisarse contra estos puntos:

- Reutiliza componentes existentes o justifica su extensión.
- Utiliza nombres de tokens reales.
- Mantiene la jerarquía tipográfica.
- Tiene estados normales, focus, hover, disabled, error, vacío y carga cuando aplican.
- Es operable con teclado.
- No depende únicamente del color.
- Considera contraste y área táctil.
- Se verifica en móvil, tablet y escritorio.
- No introduce hardcodes visuales sin excepción documentada.
- Mantiene coherencia con el patrón de referencia del módulo.

## Regla final

Gestión 360 debe evolucionar como un sistema, no como una colección de pantallas aisladas. La consistencia no significa que todo deba verse igual: significa que las decisiones nuevas deben respetar la misma identidad visual, reutilizar la misma familia de componentes y permitir una composición diferente según la función.
