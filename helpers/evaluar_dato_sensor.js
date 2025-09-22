import { descripcionesCortas } from "./descripciones_cortas.js";

export default function evaluar_dato_sensor(sensor = {}) {
    let evaluacion = "";
    const {temperatura, humedad, peso, sonido} = descripcionesCortas
    if (sensor.nombre === "temperatura") {
        if (sensor.valor >= 33 && sensor.valor < 35) {
            evaluacion = temperatura[2]["temperaturaOptima"];
        } else if (sensor.valor < 33) {
            evaluacion = temperatura[0]["temperaturaBaja"];
        } else if (sensor.valor > 35) {
            evaluacion = temperatura[1]["temperaturaAlta"];
        } else {
            evaluacion = "error";
        }
    } else if (sensor.nombre === "humedad") {
        if (sensor.valor >= 40 && sensor.valor < 70) {
            evaluacion = humedad[2]["humedadOptima"];
        } else if (sensor.valor < 40) {
            evaluacion = humedad[0]["humedadBaja"];
        } else if (sensor.valor > 70) {
            evaluacion = humedad[1]["humedadAlta"]
        } else {
            evaluacion = "error"
        }
    } else if (sensor.nombre === "peso") {
        if (sensor.valor <= 0.3) {
            evaluacion = peso[0]["pesoBajo"];
        } else if (sensor.valor > 0.3){
            evaluacion = peso[1]["pesoOptimo"];
        } else {
            evaluacion = "error"
        }
    } else if (sensor.nombre === "sonido") {
        if (sensor.estado = "Reina Presente") {
            evaluacion = sonido[0]["reinaPresente"];
        } else {
            evaluacion = sonido[1]["reinaAusente"];
        }
    } else {
        evaluacion = "No se ha proporcionado un sensor para evaluar."
    }
    return evaluacion;
}