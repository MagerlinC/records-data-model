import {
  DataSubjectName,
  ITSystemName,
  PAName,
  PersonalDataName,
} from "./data-names";
import { ProcessingActivitySourceOfTruth } from "./types/pa-source-of-truth";
import { ITSystem } from "./types/types";

export const ITSystems: ITSystem[] = [
  {
    name: ITSystemName.TEAMS,
  },
  {
    name: ITSystemName.BAMBOO,
  },
  {
    name: ITSystemName.ADOBE,
  },
  {
    name: ITSystemName.COMPLYCLOUD,
  },
];

export const ProcessingActivities: ProcessingActivitySourceOfTruth = {
  processingActivities: [
    {
      name: PAName.HR,
      itSystems: [ITSystems[2], ITSystems[1]],
      dataSubjects: [
        {
          name: DataSubjectName.EMPLOYEE,
          personalData: [{ name: PersonalDataName.CPR }],
        },
      ],
    },
    {
      name: PAName.ADMIN,
      itSystems: [ITSystems[0], ITSystems[1]],
      dataSubjects: [
        {
          name: DataSubjectName.CHILDREN,
          personalData: [
            { name: PersonalDataName.ADDRESS },
            { name: PersonalDataName.CPR },
          ],
        },
      ],
    },
    {
      name: PAName.FINANCE,
      itSystems: [],
      dataSubjects: [
        {
          name: DataSubjectName.EMPLOYEE,
          personalData: [{ name: PersonalDataName.CREDIT_CARD }],
        },
      ],
    },
  ],
};

export const exampleData = {
  itSystems: ITSystems,
  processingActivities: ProcessingActivities.processingActivities,
};
