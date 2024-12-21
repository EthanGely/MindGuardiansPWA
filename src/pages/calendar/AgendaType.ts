export default interface Agenda {
    ID_AGENDA: number;
    AGN_TITLE: string;
    AGN_DATEDEBUT: number;
    AGN_DATEFIN: number;
    AGN_DATENOTIFICATION: number;
    AGN_REPETITION: string;
    AGN_DESCRIPTION: string;
    AGN_NOMBREREPETITION: number;
    AGN_VIBRATION: boolean;
    AGN_FLASH: boolean;
  }