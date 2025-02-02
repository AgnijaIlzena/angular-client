export interface Investment {
  id: number;
  slug: string;
  titreoperation: string;
  entreprise: string;
  ville: string;
  annee: Date | string;
  mandataire: string;
  ppi: string;
  lycee: string;
  notification: Date | string;
  codeuai: string;
  longitude: number;
  etatAvancement: string;
  montantVotes: number;
  cao: Date | string;
  latitude: number;
  maitrise: string;
  modeDevolution: string;
  aneeIndividualisation: Date | string;
  enveloppePrev: number;
}
