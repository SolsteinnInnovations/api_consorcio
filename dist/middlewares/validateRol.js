"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validProfile = void 0;
const validProfile = (...perfilesPermitidos) => {
    return (req, res, next) => {
        if (perfilesPermitidos.includes(req.usuario?.idPerfil?.toString())) {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene permisos para realizar esta acción'
            });
        }
        next();
    };
};
exports.validProfile = validProfile;
//# sourceMappingURL=validateRol.js.map