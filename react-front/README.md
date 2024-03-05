
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

## Gestión de las utas

Existen tres rutas 
- /
- /registration
- /login

<strong>"/"</strong>
Muestra la información de respuesta del back dependiendo del rol que tengas, si no estas registrado te mostrara la información publica del back

<strong>"/registration"</strong>
Un formulario que registra el usuario

<strong>"/login"</strong>
Un formulario que loguea un usuario existente

<strong>*Para mas información puedes ir a /src/Router.tsx*</strong>

## Gestión del estado

El estado lo manejo principalmente en el Home con la información devuelta por el back.