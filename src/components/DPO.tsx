import React from "react";
import styled from "styled-components";
import { ProcessingActivitySource } from "../data/types/pa-source-of-truth";
import AddButton from "./AddButton";
import RemovableElement from "./RemovableElement";

const DPOWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 6px;
  color: black;
  background-color: #f5f5f5f5;

  .pa-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

const ProcessingActivity = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  border-radius: 4px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
`;

const FlexHalf = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.5;
`;

type DPOProps = {
  processingActivities: ProcessingActivitySource[];
  addITSystem: (itSystemName: string, paName: string) => void;
  addDataSubject: (dataSubjectName: string, paName: string) => void;
  addPersonalData: (
    personalDataName: string,
    dataSubjectName: string,
    paName: string
  ) => void;
  removeITSystem: (itSystemName: string, paName: string) => void;
  removeDataSubject: (dataSubjectName: string, paName: string) => void;
  removePersonalData: (
    personalDataName: string,
    dataSubjectName: string,
    paName: string
  ) => void;
};
const DPO: React.FC<DPOProps> = ({
  processingActivities,
  addITSystem,
  addDataSubject,
  addPersonalData,
  removeITSystem,
  removeDataSubject,
  removePersonalData,
}) => {
  return (
    <DPOWrapper>
      <h2>David the DPO cares about Processing Activities</h2>
      <div className={"pa-list"}>
        {processingActivities.map((processingActivity) => (
          <ProcessingActivity key={"dpo-pa-" + processingActivity.name}>
            <Row>
              <h3>{processingActivity.name}</h3>
              <AddButton
                onAddItem={(systemName) =>
                  addITSystem(systemName, processingActivity.name)
                }
                text="Add IT System"
              />
              <AddButton
                onAddItem={(dataSubjectName) =>
                  addDataSubject(dataSubjectName, processingActivity.name)
                }
                text="Add Data Subject"
              />
            </Row>
            <Row>
              {processingActivity.itSystems.length > 0 && (
                <FlexHalf>
                  <h4>IT systems</h4>
                  <ul>
                    {processingActivity.itSystems.map((itSystem) => (
                      <li key={"dpo-it-" + itSystem.name}>
                        <RemovableElement
                          name={itSystem.name}
                          onRemove={() =>
                            removeITSystem(
                              itSystem.name,
                              processingActivity.name
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </FlexHalf>
              )}
              <FlexHalf>
                <h4>Data Subjects</h4>
                <ul>
                  {processingActivity.dataSubjects.map((dataSubject) => (
                    <li key={dataSubject.name}>
                      <RemovableElement
                        name={dataSubject.name}
                        onRemove={() =>
                          removeDataSubject(
                            dataSubject.name,
                            processingActivity.name
                          )
                        }
                      />
                      <ul>
                        {dataSubject.personalData.map((personalData) => (
                          <li
                            className={"list-item"}
                            key={"dpo-pd-" + personalData.name}
                          >
                            <RemovableElement
                              name={personalData.name}
                              onRemove={() =>
                                removePersonalData(
                                  personalData.name,
                                  dataSubject.name,
                                  processingActivity.name
                                )
                              }
                            />
                          </li>
                        ))}
                        <AddButton
                          onAddItem={(personalDataName) =>
                            addPersonalData(
                              personalDataName,
                              dataSubject.name,
                              processingActivity.name
                            )
                          }
                          text="Add PD"
                        />
                      </ul>
                    </li>
                  ))}
                </ul>
              </FlexHalf>
            </Row>
          </ProcessingActivity>
        ))}
      </div>
    </DPOWrapper>
  );
};
export default DPO;
