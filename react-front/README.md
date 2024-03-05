
# Entrega React

### Estructura del proyecto del frontend.
- public/
- src/
  - pages/
  - components/
  - styles/
  - utils/
  - index.tsx
  - Router.tsx

## Paginas y componentes

Paginas:
- Home
- Login
- Registration

Componentes:
- Navbar
- Layout

## Gestión de las utas

Existen tres rutas 
- /
- /registration
- /login

<strong>"/" --> Home pagina</strong>
Muestra la información de respuesta del back dependiendo del rol que tengas, si no estas registrado te mostrara la información publica del back

<strong>"/registration" --> Registration pagina</strong>
Un formulario que registra el usuario

<strong>"/login" --> Login pagina</strong>
Un formulario que loguea un usuario existente

<strong>*Para mas información puedes ir a /src/Router.tsx*</strong>

## Gestión del estado

El estado lo manejo principalmente en el "pages/Home.tsx" con la información devuelta por el back y la autheticación del token de jwt. Al ser actualizados estos se actualiza la informacion mostrada en el Home.

El token es guardado en el local storage pero tengo una variable useState isLoggedin y en conjunto con el dispacher de esta misma, los paso al navbar para que pueda ser actualizado la información del Home