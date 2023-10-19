import { ITSystem, ProcessingActivity, WithDataSubjects } from "./types";

export interface ProcessingActivitySource
  extends ProcessingActivity,
    WithDataSubjects {
  itSystems: ITSystem[];
}

export interface ProcessingActivitySourceOfTruth {
  processingActivities: ProcessingActivitySource[];
}

interface PAWithDataSubjects extends ProcessingActivity, WithDataSubjects {}
export interface ITSystemWithDataByPA extends ITSystem {
  processingActivities: PAWithDataSubjects[];
}
