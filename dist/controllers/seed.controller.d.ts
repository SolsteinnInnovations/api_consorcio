export interface IPerfil extends Document {
    descripcion: string;
    nombre: string;
    habilitado?: boolean;
}
export declare const seedPerfiles: () => Promise<void>;
export declare const seedPermisos: () => Promise<void>;
export declare const seedPermisosPerfiles: () => Promise<void>;
export declare const seedLocalidades: () => Promise<void>;
export declare const seedEdificios: () => Promise<void>;
export declare const seedUsuarios: () => Promise<void>;
