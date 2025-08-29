import mongoose, { Document } from 'mongoose';
export interface IParticipanteReunion extends Document {
    idReunion: mongoose.Types.ObjectId;
    idPersona: mongoose.Types.ObjectId;
}
export declare const ParticipantesReunionesModel: mongoose.Model<IParticipanteReunion, {}, {}, {}, mongoose.Document<unknown, {}, IParticipanteReunion, {}> & IParticipanteReunion & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
