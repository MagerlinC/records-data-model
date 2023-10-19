export interface PersonalData {
  name: string;
}

export interface DataSubject {
  name: string;
  personalData: PersonalData[];
}

export interface ITSystem {
  name: string;
}

export interface ProcessingActivity {
  name: string;
}

export interface WithDataSubjects {
  dataSubjects: DataSubject[];
}
