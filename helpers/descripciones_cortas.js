export const descripcionesCortas = {
        temperatura:
            [
                {"temperaturaBaja": "Temperatura interna está por debajo de lo esperado, verificar si hay aislamiento suficiente."},
                {"temperaturaAlta": "Temperatura interna superior al rango óptimo, existe riesgo de estrés térmico."},
                {"temperaturaOptima": "Temperatura dentro del rango ideal para la salud de la colonia."}
            ],
        humedad: [
                {"humedadBaja": "La humedad interna es menor a la necesaria para un desarrollo saludable de la cría. Esto puede afectar la incubación de huevos y el bienestar general."},
                {"humedadAlta": "Elevado nivel de humedad, puede causar aparición de hongos y enfermedades."},
                {"humedadOptima": "Humedad dentro del rango ideal para la salud de la colonia."}
        ],
        peso: [
                {"pesoBajo": "El peso actual es inferior al esperado. Esto podría indicar una baja productividad o una escasa reserva de miel."},
                {"pesoOptimo": "Su peso indica la posibilidad de extracción de miel."}
        ],
        sonido: [
            {"reinaPresente": "El sonido registrado sugiere la presencia activa de la abeja reina y una colmena estable."},
            {"reinaAusente": "Indicios de ausencia de la abeja reina, este estado puede generar inestabilidad en la colonia."}
        ]
}