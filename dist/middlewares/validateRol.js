"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validRole = void 0;
const validRole = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (rolesPermitidos.includes(req.usuario?.idPerfil?.toString())) {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene permisos para realizar esta acción'
            });
        }
        next();
    };
};
exports.validRole = validRole;
//# sourceMappingURL=validateRol.js.map