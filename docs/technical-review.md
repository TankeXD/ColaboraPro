# Revisión técnica y deuda

- **Alcance:** API mínima con módulos de proyecto/tarea y pruebas de lógica.
- **Revisión estática:** validar nombres, funciones pequeñas, validación de entradas, estados permitidos y respuestas de error.
- **Deuda conocida:** almacenamiento en memoria; ausencia de autenticación/autorización; sin persistencia SQL; sin integración frontend; sin validación robusta de formato de fecha; sin pruebas HTTP integrales.
- **Siguiente paso sugerido:** persistencia, seguridad, validación de fechas y tests de rutas.
- **Depuración documentada:** la comparación de fechas de vencimiento se normaliza a fecha UTC (inicio de día) para evitar errores por componente horario al evaluar vencimiento y ventana de 2 días. Test de regresión incluido.
