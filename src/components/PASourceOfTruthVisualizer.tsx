import React from "react";
import styled from "styled-components";
import { ProcessingActivitySourceOfTruth } from "../data/types/pa-source-of-truth";
import AddButton from "./AddButton";

const PASourceOfTruthVisualizerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
  border-top: 1px solid white;
  flex: 1;
  overflow: hidden;
  .contents {
    max-height: 400px;
    overflow-y: auto;
  }
  .pa-contents {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-left: 12px;
  }
  p,
  h3,
  h4 {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
  }
  .processing-activity {
    border-radius: 4px;
    background-color: #ebebeb;
    color: black;
    padding: 6px;
  }
`;

type PASourceOfTruthVisualizerProps = {
  data: ProcessingActivitySourceOfTruth;
  addITSystem: (itSystemName: string, PAName: string) => void;
  addDataSubject: (dataSubjectName: string, PAName: string) => void;
  addPersonalData: (
    personalDataName: string,
    dataSubjectName: string,
    PAName: string
  ) => void;
};
const PASourceOfTruthVisualizer: React.FC<PASourceOfTruthVisualizerProps> = ({
  data,
  addITSystem,
  addDataSubject,
  addPersonalData,
}) => {
  return (
    <PASourceOfTruthVisualizerWrapper>
      <h2>Underlying Data Truth</h2>
      <div className={"contents"}>
        {data.processingActivities.map((processingActivity) => (
          <div>
            <h3 className={"processing-activity"}>{processingActivity.name}</h3>
            <div className={"pa-contents"}>
              <h4>
                IT Systems{" "}
                <AddButton
                  onAddItem={(itSystemName) =>
                    addITSystem(itSystemName, processingActivity.name)
                  }
                />
              </h4>
              <ul>
                {processingActivity.itSystems.map((itSystem) => (
                  <li>{itSystem.name}</li>
                ))}
              </ul>
              <h4>
                Data Subjects
                <AddButton
                  onAddItem={(dataSubjectName) =>
                    addDataSubject(dataSubjectName, processingActivity.name)
                  }
                />
              </h4>
              <ul>
                {processingActivity.dataSubjects.map((dataSubject) => (
                  <li>
                    <p>
                      {dataSubject.name}{" "}
                      <AddButton
                        onAddItem={(personalDataName) =>
                          addPersonalData(
                            personalDataName,
                            dataSubject.name,
                            processingActivity.name
                          )
                        }
                      />
                    </p>
                    <ul>
                      {dataSubject.personalData.map((personalData) => (
                        <li>{personalData.name}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </PASourceOfTruthVisualizerWrapper>
  );
};
export default PASourceOfTruthVisualizer;
