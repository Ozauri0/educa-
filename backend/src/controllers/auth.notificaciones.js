import { connect } from "../database/db.js";

export const insNotificacion = async (usuario, accion, mensaje) => {
    try {
        const db = await connect();
        const [result] = await db.query("INSERT INTO notificaciones (usuario, accion, mensaje) VALUES (?,?,?)", [usuario, accion, mensaje]);
        console.log("Notificación insertada correctamente");
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}